import type { NextConfig } from "next";

type RemotePattern = NonNullable<NextConfig["images"]>["remotePatterns"][number];

const remotePatterns: RemotePattern[] = [];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (supabaseUrl) {
  try {
    const parsed = new URL(supabaseUrl);
    const protocol = parsed.protocol.replace(":", "");

    if (protocol === "http" || protocol === "https") {
      remotePatterns.push({
        protocol,
        hostname: parsed.hostname,
        pathname: "/storage/v1/object/public/**"
      });
    }
  } catch (error) {
    console.warn(
      "Invalid NEXT_PUBLIC_SUPABASE_URL, skipping image remote pattern:",
      error
    );
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: remotePatterns.length
    ? {
        remotePatterns
      }
    : undefined
};

export default nextConfig;
