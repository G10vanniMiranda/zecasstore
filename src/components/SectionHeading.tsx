import type { ReactNode } from "react";

type Props = { id: string; index: string; eyebrow: string; title: ReactNode; text?: string; dark?: boolean };

export function SectionHeading({ id, index, eyebrow, title, text, dark }: Props) {
  return (
    <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
      <div className="lg:col-span-7">
        <p className={`eyebrow ${dark ? "text-mist" : "text-stone"}`}>
          <span className={dark ? "text-sand" : "text-ink"}>{index}</span> — {eyebrow}
        </p>
        <h2 id={id} className="font-display mt-5 text-[clamp(2.75rem,10vw,6.5rem)] uppercase">
          {title}
        </h2>
      </div>
      {text && (
        <p className={`max-w-md text-base leading-relaxed lg:col-span-4 lg:col-start-9 lg:pb-2 ${dark ? "text-mist" : "text-stone"}`}>{text}</p>
      )}
    </div>
  );
}

/** Destaque em serifa itálica dentro dos títulos condensados. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal tracking-normal normal-case [font-variation-settings:normal]">{children}</em>;
}
