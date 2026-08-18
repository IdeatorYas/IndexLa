import { createOgImage, OG_ALT, OG_SIZE } from "@/lib/create-og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return createOgImage();
}
