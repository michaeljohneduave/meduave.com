import { createClient } from "@vercel/kv";
import type { APIRoute, AstroCookies } from "astro";
import { randomStr } from "../../utils/random";

const kv = createClient({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

export const POST: APIRoute = async ({ cookies }) => {
  let cookie = cookies.get("astro")?.value;
  let count = await kv.scard("visitors");

  if (!cookie) {
    cookie = randomStr(200);

    cookies.set("astro", cookies, {
      httpOnly: true,
    });

    count += 1;
  }

  kv.sadd("visitors", cookie);

  return new Response(
    JSON.stringify({
      count,
    }),
    {
      status: 200,
    }
  );
};
