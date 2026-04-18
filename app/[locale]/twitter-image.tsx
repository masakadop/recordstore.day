export const dynamic = "force-static"
export { contentType, size } from "./opengraph-image"
export { default } from "./opengraph-image"

export function generateStaticParams() {
  return ["en", "ja", "es", "de", "fr", "it", "nl", "zh-TW"].map((locale) => ({ locale }))
}
