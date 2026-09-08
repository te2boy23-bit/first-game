export function checkIsInAppBrowser() {
  if (typeof window === "undefined") {
    return {
      isInApp: false,
      isLine: false,
      isInstagram: false,
      isTwitter: false,
      isIOS: false,
      isAndroid: false,
      ua: "",
    };
  }

  const ua =
    navigator.userAgent || navigator.vendor || (window as any).opera || "";
  const isLine = /Line\//i.test(ua);
  const isInstagram = /Instagram/i.test(ua);
  const isTwitter = /Twitter|Tweetbot/i.test(ua);
  const isFB = /FBAN|FBAV/i.test(ua);
  const isTikTok = /musical_ly|ByteDance|TikTok/i.test(ua);
  const isInApp =
    isLine ||
    isInstagram ||
    isTwitter ||
    isFB ||
    isTikTok ||
    /MicroMessenger|webview/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  return {
    isInApp,
    isLine,
    isInstagram,
    isTwitter,
    isIOS,
    isAndroid,
    ua,
  };
}

export function getBaseSiteUrl(): string {
  // ブラウザ環境の場合は、常に現在アクセスしているURLをベースにする（OAuthの不整合を防ぐため）
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // サーバーサイド環境のフォールバック
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  
  return "";
}
