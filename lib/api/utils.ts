/**
 * Converts an object into a URL query string by:
 * - Removing keys with undefined values
 * - Converting all remaining values to strings
 *
 * Example:
 *   { page: 1, active: true } -> "page=1&active=true"
 */
export function toSearchParams(obj: Record<string, any>): string {
  if (!obj) return "";
  return new URLSearchParams(
    Object.entries(obj)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  ).toString();
}

/**
 * ApiRequestOptions
 * Extends the native RequestInit with optional features for API calls.
 */
export interface ApiRequestOptions extends RequestInit {
  parseJson?: boolean; // Whether to parse the response as JSON (default: true)
  authToken?: string; // Optional Bearer token for authentication
}

/**
 * apiRequest<T>
 * Generic API request helper for Next.js + NextAuth + React Query.
 *
 * Features:
 * - Adds Authorization header automatically if token is provided
 * - Handles JSON parsing conditionally
 * - Throws meaningful error messages from API responses
 * - Supports React Query's cancellation via AbortSignal
 *
 * @param url - The endpoint URL
 * @param options - Additional request options
 * @returns Parsed JSON response or undefined if parseJson = false
 */
export async function apiRequest<T>(
  url: string,
  { parseJson = true, authToken, ...options }: ApiRequestOptions = {}
): Promise<T> {
  // Attach AbortSignal for React Query cancellation
  const controller = new AbortController();
  const signal = options.signal || controller.signal;

  // Prepare headers (merge defaults and user-specified)
  const headers = new Headers(options.headers);
  if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  try {
    // Perform the request
    const response = await fetch(url, { ...options, headers, signal });

    // Handle non-OK responses
    if (!response.ok) {
      let message = `HTTP ${response.status} ${response.statusText}`;

      // Try to extract a meaningful error message from JSON body
      try {
        const data = await response.json();
        if (data?.message) message = data.message;
        else if (typeof data === "string") message = data;
      } catch {
        // Ignore JSON parse errors and keep default message
      }
      throw new Error(message);
    }

    // Return raw response or parsed JSON based on parseJson flag
    if (!parseJson) return undefined as unknown as T;
    return (await response.json()) as T;
  } catch (error) {
    // Ignore AbortError from fetch
    if (error instanceof DOMException && error.name === "AbortError") {
      return Promise.reject(); // React Query treats this as a silent cancel
    }
    throw error; // Rethrow other errors
  }
}
