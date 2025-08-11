import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function ViewportHandler({
  desktop,
  mobile,
}: {
  desktop: ReactNode | any;
  mobile: ReactNode | any;
}) {
  const viewport = (await headers()).get("viewport");
  if (viewport === "desktop") return desktop;
  return mobile;
}
