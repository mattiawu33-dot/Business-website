import type { Metadata } from "next";
import StoresContent from "@/components/StoresContent";

export const metadata: Metadata = {
  title: "Store Locations — Ishue",
};

export default function StoresPage() {
  return <StoresContent />;
}
