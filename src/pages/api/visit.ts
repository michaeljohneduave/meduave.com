import { createClient } from "@vercel/kv";
import type { APIRoute, AstroCookies } from "astro";
import { randomStr } from "../../utils/random";

const kv = createClient({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

export const POST: APIRoute = async ({ cookies }) => {
  try {
    let cookie = cookies.get("astro")?.value;
    let count;
    if (!cookie) {
      cookie = randomStr(200);
      cookies.set("astro", cookie, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365 * 10,
      });
    }
    await kv.sadd("visitors", cookie);
    count = await kv.scard("visitors");

    return new Response(
      JSON.stringify({
        count,
      }),
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);

    return new Response(
      JSON.stringify({
        count: 0,
      }),
      {
        status: 200,
      }
    );
  }
};
