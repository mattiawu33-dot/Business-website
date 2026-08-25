export default function ComingSoonCard({ label = "Coming soon" }: { label?: string }) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex aspect-[2/3] w-full items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 text-center">
        <span className="px-4 text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      </div>
      <div className="mt-3 h-4" />
    </div>
  );
}
