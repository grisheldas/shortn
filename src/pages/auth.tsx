import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import React from "react";

function AuthPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col gap-16 items-center">
      {searchParams.get("createNew") ? (
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
        <></>
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
