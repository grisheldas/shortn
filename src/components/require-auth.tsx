import { UrlState } from "@/context";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader, PuffLoader } from "react-spinners";

function RequireAuth({ children }: any) {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width="100%" color="#777B84" />;

  if (isAuthenticated) return <Fragment>{children}</Fragment>;
}

export default RequireAuth;
