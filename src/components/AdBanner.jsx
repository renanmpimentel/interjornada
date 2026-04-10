import { useEffect } from "react";
import { isMonetizationEnabled } from "../config/featureFlags";

const ADSENSE_SRC = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

function ensureAdSenseScript(client) {
  if (!client) {
    return;
  }

  const existing = document.querySelector(`script[data-adsense-client="${client}"]`);
  if (existing) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `${ADSENSE_SRC}?client=${client}`;
  script.crossOrigin = "anonymous";
  script.dataset.adsenseClient = client;
  document.head.appendChild(script);
}

export default function AdBanner() {
  const monetizationEnabled = isMonetizationEnabled();
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT;
  const adSlot = import.meta.env.VITE_ADSENSE_SLOT;
  const adTest = import.meta.env.VITE_ADSENSE_ADTEST === "on";
  const enabled = monetizationEnabled && Boolean(adClient && adSlot);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    ensureAdSenseScript(adClient);
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // no-op
    }
  }, [enabled, adClient]);

  if (!monetizationEnabled) {
    return null;
  }

  if (!enabled) {
    return (
      <section className="ad-panel" aria-label="Espaco de anuncio">
        <p className="ad-kicker">Monetizacao</p>
        <div className="ad-placeholder">
          <strong>Espaco para anuncio</strong>
          <span>Configure VITE_ADSENSE_CLIENT e VITE_ADSENSE_SLOT no .env para ativar.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="ad-panel" aria-label="Anuncio">
      <p className="ad-kicker">Publicidade</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={adTest ? "on" : undefined}
      ></ins>
    </section>
  );
}
