// lib/xanoClient.ts

const XANO_BASE_URL = process.env.XANO_BASE_URL;
const XANO_API_KEY = process.env.XANO_API_KEY;

if (!XANO_BASE_URL) {
  throw new Error("XANO_BASE_URL is not set in environment variables");
}
if (!XANO_API_KEY) {
  throw new Error("XANO_API_KEY is not set in environment variables");
}

type XanoError = {
  ok: false;
  status: number;
  message: string;
};

type XanoSuccess<T> = {
  ok: true;
  status: number;
  data: T;
};

export type XanoResult<T> = XanoError | XanoSuccess<T>;

export async function postToXano<TInput, TResponse>(
  path: string,
  body: TInput
): Promise<XanoResult<TResponse>> {
  try {
    const res = await fetch(`${XANO_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": XANO_API_KEY!,
      },
      body: JSON.stringify(body),
    });

    let json: any = null;
    try {
      json = await res.json();
    } catch {
      json = null;
    }

    if (!res.ok) {
      const msg =
        (json && (json.message || json.error)) ||
        `Xano error (status ${res.status})`;
      return { ok: false, status: res.status, message: msg };
    }

    return { ok: true, status: res.status, data: json as TResponse };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      message: err?.message || "Network error while calling Xano",
    };
  }
}
