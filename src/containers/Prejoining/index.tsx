import ViewportHandler from "@/components/ViewportHandler";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default async function Prejoining() {
  return <ViewportHandler desktop={<Desktop />} mobile={<Mobile />} />;
}
