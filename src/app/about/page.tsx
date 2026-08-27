import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — Ishue",
};

export default function AboutPage() {
  return <AboutContent />;
}
