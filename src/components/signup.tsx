import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Error from "./error";
import { BeatLoader } from "react-spinners";
import type { IAuthForm, ISignUpForm } from "@/types";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login, signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longUrl = searchParams.get("createNew");
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<ISignUpForm>({
    email: "",
    password: "",
    name: "",
    profilepic: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignup = async () => {
    setErrors({});

    try {
      const schema: yup.ObjectSchema<IAuthForm> = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Please input correct email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profilepic: yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await submitSignup(formData);
    } catch (error: any) {
      const newErrors: any = {};

      error?.inner?.forEach((err: any) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const { data, loading, error, execute: submitSignup } = useFetch(signup);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`);
      fetchUser();
    }
  }, [error, loading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
          />
          {errors?.name && <Error message={errors?.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          {errors?.email && <Error message={errors?.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
          {errors?.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profilepic"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          {errors?.profilepic && <Error message={errors.profilepic} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-5">
        {error && <Error message={error?.message} />}
        <Button onClick={handleSignup} disabled={loading} className="w-[120px]">
          {loading ? <BeatLoader size={6} /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;
