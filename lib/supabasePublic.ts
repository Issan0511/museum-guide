export function getPublicUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  // ロゴ画像はローカルを使用
  if (path.includes('museum-logo.png')) {
    return "/images/museum-logo.png";
  }
  
  if (!baseUrl || baseUrl === "undefined" || baseUrl === "null") {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    if (path.startsWith("/")) {
      return path;
    }
    return "/placeholder.svg";
  }
  return `${baseUrl}/storage/v1/object/public/${path}`;
}
