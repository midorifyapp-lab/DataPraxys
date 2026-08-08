import { apiConfig, getApiBaseUrl } from "./config";
import { ApiError, handleApiError } from "./errors";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = RequestInit & {
  body?: BodyInit | unknown;
};

const buildUrl = (path: string) => {
  const base = getApiBaseUrl();
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return base ? `${base}/${normalized}` : normalized;
};

const resolveHeaders = (init: RequestInit | undefined, hasBody: boolean) => {
  const headers = new Headers(init?.headers ?? {});

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = typeof window !== "undefined" ? window.localStorage.getItem("auth.token") : null;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};

async function request<T>(
  method: HttpMethod,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, ...init } = options;
  const hasBody = body !== undefined && body !== null;
  const response = await fetch(buildUrl(path), {
    method,
    ...init,
    headers: resolveHeaders(init, hasBody),
    body:
      hasBody && !(body instanceof FormData)
        ? JSON.stringify(body)
        : body instanceof FormData
          ? body
          : undefined,
  });

  if (!response.ok) {
    const payload = await response.text();
    let parsed: unknown = payload;
    try {
      parsed = payload ? JSON.parse(payload) : undefined;
    } catch {
      parsed = payload;
    }

    await handleApiError(response, parsed);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return undefined as T;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => request<T>("GET", path, init),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>("POST", path, {
      ...(init ?? {}),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>("PUT", path, {
      ...(init ?? {}),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>("PATCH", path, {
      ...(init ?? {}),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string, init?: RequestInit) => request<T>("DELETE", path, init),
};

export { apiConfig };
