export function getPublicUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
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
