import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = searchParams.get("next") ?? "/dashboard";

  // Vercel / 本番環境・スマホ実機での正確なオリジン判定
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const host = forwardedHost || request.headers.get("host");

  let origin = url.origin;
  if (host && !host.includes("localhost")) {
    origin = `${forwardedProto}://${host}`;
  } else if (process.env.NEXT_PUBLIC_SITE_URL) {
    origin = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  } else if (process.env.VERCEL_URL) {
    origin = `https://${process.env.VERCEL_URL}`;
  } else if (host) {
    origin = `${forwardedProto}://${host}`;
  }

  // Google OAuth で「戻る」や「キャンセル」を押してエラーが返ってきた場合
  if (error) {
    console.warn(
      "OAuth Cancelled / Error on Vercel/Mobile:",
      error,
      errorDescription,
    );
    return NextResponse.redirect(`${origin}/`);
  }

  if (code) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      await supabase.auth.exchangeCodeForSession(code);
    } catch (e) {
      console.warn("Exchange code for session failed:", e);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
