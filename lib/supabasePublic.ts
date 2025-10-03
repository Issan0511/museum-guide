export function getPublicUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  // // ロゴ画像はローカルを使用
  // if (path.includes('museum_logo.png')) {
  //   return "/images/museum_logo.png";
  // }
  
  if (!baseUrl || baseUrl === "undefined" || baseUrl === "null") {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    if (path.startsWith("/")) {
      return path;
    }
    return "/placeholder.svg";
  }
  console.log(`${baseUrl}/storage/v1/object/public/${path}`);
  return `${baseUrl}/storage/v1/object/public/${path}`;
}
