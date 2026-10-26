import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: { unoptimized: true },
};
export default config;
