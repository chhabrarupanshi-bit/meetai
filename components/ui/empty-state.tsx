import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: Props) => {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center py-12">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute -inset-6 rounded-full bg-emerald-500/15 blur-3xl" />
        <Image
          src={image}
          alt="Empty"
          width={340}
          height={277}
          className="relative h-auto w-[340px] drop-shadow-[0_14px_35px_rgba(16,185,129,0.22)]"
        />
      </div>

      <div className="flex max-w-md flex-col gap-y-2.5 text-center">
        <h6 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h6>
        <p className="text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
};