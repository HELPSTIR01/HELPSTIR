// src/app/about/page.tsx
import React from "react";
import ViewportHandler from "@/components/ViewportHandler";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default async function AboutUs() {
  return <ViewportHandler desktop={<Desktop />} mobile={<Mobile />} />;
};
