function asBoolean(value) {
  return String(value).toLowerCase() === "true";
}

export function isMonetizationEnabled() {
  return asBoolean(import.meta.env.VITE_ENABLE_MONETIZATION);
}

export function isAnalyticsEnabled() {
  return asBoolean(import.meta.env.VITE_ENABLE_ANALYTICS);
}
