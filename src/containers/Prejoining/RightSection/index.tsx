import ViewportHandler from "@/components/ViewportHandler";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default function RightSection({
  mode = "",
}: {
  mode: string | undefined;
}) {
  if (mode === "mobile") {
    return <Mobile />;
  }
  return <Desktop />;
}
