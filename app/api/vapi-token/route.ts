import { NextResponse } from "next/server";

export async function GET() {
  try {
    const webToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || process.env.NEXT_PUBLIC_VAPI_API_KEY;
    if (webToken) {
      return NextResponse.json({ token: webToken });
    }

    if (process.env.VAPI_API_KEY) {
      const tokenResponse = await fetch("https://api.vapi.ai/v1/token/web", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (tokenResponse.ok) {
        const data = await tokenResponse.json();
        return NextResponse.json(data);
      }
    }

    return NextResponse.json({ error: "No Vapi token configured" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}