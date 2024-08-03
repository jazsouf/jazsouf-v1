export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "project":
      return slug ? `/projects/${slug}` : undefined;
    case "art":
      return slug ? `/art/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
