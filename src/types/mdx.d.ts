// Each docs page exports its title and description beside the content. Kept import-free so
// this stays an ambient declaration that merges with @types/mdx rather than replacing it.
declare module "*.mdx" {
  export const meta: import("@/content/docs/nav").PageMeta;
}
