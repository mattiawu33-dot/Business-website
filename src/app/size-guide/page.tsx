import type { Metadata } from "next";
import SizeGuideContent from "@/components/SizeGuideContent";

export const metadata: Metadata = {
  title: "Size Guide — Ishue",
};

export default function SizeGuidePage() {
  return <SizeGuideContent />;
}
