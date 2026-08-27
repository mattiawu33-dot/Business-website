"use client";

import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";

export default function AboutContent() {
  const { t } = useLocale();

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:flex-row lg:px-8">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 md:w-1/2">
        <Image
          src="/images/about.svg"
          alt="Inside the Ishue studio"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-medium text-neutral-900">{t("about.h1")}</h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">{t("about.p1")}</p>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">{t("about.p2")}</p>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">{t("about.p3")}</p>
      </div>
    </div>
  );
}
