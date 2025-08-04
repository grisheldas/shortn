import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const ref = useRef<any>(null);

  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const {
    data,
    loading,
    error,
    execute: submitCreateUrl,
  } = useFetch(createUrl);

  const handleSubmit = async () => {
    setErrors([]);

    try {
      await schema.validate(formData, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await submitCreateUrl({ ...formData, user_id: user.id }, blob);
    } catch (error: any) {
      const newErrors: any = {};

      error?.inner?.forEach((err: any) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  return (
    <Dialog
      defaultOpen={longLink ? true : false}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button> Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-mid">
        <DialogHeader className="mb-3">
          <DialogTitle className="font-bold text-xl">
            Create New Link
          </DialogTitle>
        </DialogHeader>

        {formData?.longUrl && (
          <QRCode
            value={formData?.longUrl}
            size={250}
            ref={ref}
            // logoImage="/logo.png"
          />
        )}

        <div className="flex flex-col gap-2">
          <Input
            name="title"
            type="text"
            placeholder="Enter link's title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors?.title && <Error message={errors?.title} />}

          <Input
            name="longUrl"
            type="text"
            placeholder="Enter your loooong URL"
            value={formData.longUrl}
            onChange={handleChange}
          />
          {errors?.longUrl && <Error message={errors?.longUrl} />}

          <div className="flex items-center gap-2 items-center">
            <Card className="px-2 py-[5px] rounded-md">shortn.in</Card> /
            <Input
              name="customUrl"
              type="text"
              placeholder="Enter custom link (optional)"
              value={formData.customUrl}
              onChange={handleChange}
            />
          </div>
          {errors?.customUrl && <Error message={errors?.customUrl} />}
        </div>

        {error && <Error message={error?.message} />}
        <DialogFooter className="sm:justify-end">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            // className="w-[120px]"
          >
            {loading ? <BeatLoader size={6} /> : "Shortn!"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;
