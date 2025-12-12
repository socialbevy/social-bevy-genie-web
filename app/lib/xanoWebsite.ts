// app/lib/xanoWebsite.ts
const BASE_URL = process.env.NEXT_PUBLIC_XANO_WEBSITE_BASE_URL;
const API_KEY = process.env.XANO_API_KEY;

if (!BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_XANO_WEBSITE_BASE_URL env variable");
}
if (!API_KEY) {
  throw new Error("Missing XANO_API_KEY env variable");
}

export async function postToXano(path: string, payload: unknown) {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 🔐 If your Xano project uses a different auth scheme,
      // adjust this header (e.g. "x-api-key": API_KEY).
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Xano error:", res.status, data);
    throw new Error(
      (data as any)?.message || `Xano error: ${res.status} ${res.statusText}`
    );
  }

  return data;
}
