import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { UrlState } from "@/context";

function AuthPage() {
  const [searchParams] = useSearchParams();
  const longUrl = searchParams.get("createNew");

  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="flex flex-col gap-16 items-center">
      {longUrl ? (
        <div className="text-center mt-10 sm:mt-16">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold">
            Oops!
          </h2>
          <h1 className="mt-5 text-xl sm:text-2xl lg:text-4xl font-bold">
            You're not logged in yet. <br />
            Sign up first, then let's shrink that long link together!
          </h1>
        </div>
      ) : (
        <div className="text-center mt-10 sm:mt-16">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold">
            Login / Signup
          </h2>
          <h1 className="mt-5 text-xl sm:text-2xl lg:text-4xl font-bold">
            Dont worry, your data is safe with us!
          </h1>
        </div>
      )}

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
