import React from "react";

interface IError {
  message: string;
}

function Error(props: IError) {
  const { message } = props;

  return <span className="text-sm text-red-400">{message}</span>;
}

export default Error;
