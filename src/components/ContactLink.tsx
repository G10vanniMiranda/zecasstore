import type { ComponentProps } from "react";

import { OutboundLink } from "@/components/OutboundLink";
import { contactChannel, contactHref, type ContactOrigin } from "@/lib/contact";

type Props = Omit<ComponentProps<typeof OutboundLink>, "href" | "origin" | "channel"> & {
  origin: ContactOrigin;
  detail?: string;
};

export function ContactLink({ origin, detail, ...props }: Props) {
  return <OutboundLink href={contactHref(origin, detail)} origin={origin} channel={contactChannel} {...props} />;
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`size-4 ${className}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
