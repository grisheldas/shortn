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
import type { IAuthForm } from "@/types";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longUrl = searchParams.get("createNew");
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<IAuthForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handeLogin = async () => {
    setErrors({});

    try {
      const schema: yup.ObjectSchema<IAuthForm> = yup.object().shape({
        email: yup
          .string()
          .email("Please input correct email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await submitLogin(formData);
    } catch (error: any) {
      const newErrors: any = {};

      error?.inner?.forEach((err: any) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const { data, loading, error, execute: submitLogin } = useFetch(login);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Login</CardTitle>
        <CardDescription>to your account if you have one</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Input email"
            onChange={handleChange}
          />
          {errors?.email && <Error message={errors?.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Input password"
            onChange={handleChange}
          />
          {errors?.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-5">
        {error && <Error message={error?.message} />}
        <Button onClick={handeLogin} disabled={loading} className="w-[90px]">
          {loading ? <BeatLoader size={6} /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
