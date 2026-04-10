import { isAnalyticsEnabled } from "../config/featureFlags";

const GA_SRC = "https://www.googletagmanager.com/gtag/js";

function ensureGaScript(measurementId) {
  const existing = document.querySelector(`script[data-ga-id="${measurementId}"]`);
  if (existing) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `${GA_SRC}?id=${measurementId}`;
  script.dataset.gaId = measurementId;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (!isAnalyticsEnabled()) {
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    return;
  }

  ensureGaScript(measurementId);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}
