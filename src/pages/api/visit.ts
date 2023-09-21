import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  try {
    let cookie = cookies.get("astro")?.value;

    await fetch(import.meta.env.KV_REST_API_URL + "/sadd/visitors/" + cookie, {
      headers: {
        Authorization: "Bearer " + import.meta.env.KV_REST_API_TOKEN,
      },
    });

    const res = await fetch(
      import.meta.env.KV_REST_API_URL + "/scard/visitors",
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.KV_REST_API_TOKEN,
        },
      }
    );
    const { result: count } = await res.json();

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
