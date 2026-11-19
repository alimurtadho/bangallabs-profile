"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsProps = {
  measurementId?: string;
};

export function Analytics({ measurementId }: AnalyticsProps) {
  useEffect(() => {
    if (!measurementId) return;

    function trackClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>("[data-analytics]");
      const eventName = element?.dataset.analytics;

      if (!eventName || !window.gtag) return;

      window.gtag("event", eventName, {
        link_text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 100),
        link_url: element instanceof HTMLAnchorElement ? element.href : undefined
      });
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [measurementId]);

  if (!measurementId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
