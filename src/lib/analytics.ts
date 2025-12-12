export type AnalyticsParams = Record<string, any>;

// Lightweight analytics helper — calls gtag or dataLayer if present, otherwise falls back to console.debug
export function trackEvent(name: string, params?: AnalyticsParams) {
    try {
        // Google Analytics (gtag)
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', name, params || {});
            return;
        }

        // dataLayer (Google Tag Manager)
        if (Array.isArray((window as any).dataLayer)) {
            (window as any).dataLayer.push({ event: name, ...(params || {}) });
            return;
        }

        // Fallback: console.debug for local development
        // eslint-disable-next-line no-console
        console.debug('[analytics] event:', name, params || {});
    } catch (err) {
        // swallow errors to avoid breaking UX
        // eslint-disable-next-line no-console
        console.warn('[analytics] failed to track event', name, err);
    }
}

export default trackEvent;
