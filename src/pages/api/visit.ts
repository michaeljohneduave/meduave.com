import { createClient } from "@vercel/kv";
import type { APIRoute } from "astro";

const kv = createClient({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

export const POST: APIRoute = async ({ cookies }) => {
  const cookie = cookies.get("astro");

  if (cookie) {
    await kv.sadd("visitors", cookie);
  }

  const count = await kv.scard("visitors");

  return new Response(
    JSON.stringify({
      count,
    }),
    {
      status: 200,
    }
  );
};
