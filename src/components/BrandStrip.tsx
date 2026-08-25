import Image from "next/image";

export default function BrandStrip() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 sm:px-6 md:flex-row lg:px-8">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 md:w-1/2">
        <Image
          src="/images/brand-strip.svg"
          alt="Fabric and craftsmanship detail"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-1/2">
        <p className="text-xl leading-relaxed text-neutral-800 sm:text-2xl">
          Made from fabrics chosen to last, cut in shapes that don&apos;t chase seasons — clothing built to be worn,
          not just bought.
        </p>
      </div>
    </section>
  );
}
