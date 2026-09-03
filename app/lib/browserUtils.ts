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
  // 1. 本番・Vercelの環境変数が設定されている場合は最優先（localhostをスマホに送らない）
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  // 2. ブラウザが localhost 以外の本番URLやLAN環境で開かれている場合
  if (
    typeof window !== "undefined" &&
    window.location.origin &&
    !window.location.hostname.includes("localhost") &&
    !window.location.hostname.includes("127.0.0.1")
  ) {
    return window.location.origin;
  }
  // 3. ローカル開発環境のフォールバック
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}
