import React from "react";
import ViewportHandler from "@/components/ViewportHandler";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
const Signup = () => {
  return <ViewportHandler desktop={<Desktop />} mobile={<Mobile />} />;
};

export default Signup;
