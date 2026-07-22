// Default timeout (ms) applied to all outbound HTTP requests. Configurable via the
// REQUEST_TIMEOUT_MS environment variable. Prevents a hung Sitecore endpoint from
// blocking a tool call indefinitely.
export const DEFAULT_REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS) || 30000;

/**
 * A thin wrapper around fetch that aborts the request after `timeoutMs`.
 * Callers may still pass their own `signal`, which takes precedence.
 */
export async function fetchWithTimeout(
    input: string | URL,
    init: RequestInit = {},
    timeoutMs: number = DEFAULT_REQUEST_TIMEOUT_MS
): Promise<Response> {
    return fetch(input, {
        ...init,
        signal: init.signal ?? AbortSignal.timeout(timeoutMs),
    });
}

export function generateUUID(): string {
    // Do not use crypto.randomUUID() directly in tests, as it can cause issues with snapshot testing.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}