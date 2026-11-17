"use client";

import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "target" | "rel"> & {
  href: string;
  /** Origem do clique, enviada ao dataLayer (sem PII). */
  origin: string;
  channel: string;
};

// Evento pronto para GTM/GA4: só é enviado se um dataLayer existir na página.
function track(params: Record<string, string>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({ event: "cta_click", ...params });
}

export function OutboundLink({ origin, channel, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track({ cta_origin: origin, channel });
        onClick?.(e);
      }}
    >
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
