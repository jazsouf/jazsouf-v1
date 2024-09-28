export function resolveHref(documentType?: string, slug?: string | null): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "project":
      return slug ? `/projects/${slug}` : undefined;
    case "art":
      return slug ? `/art/${slug}` : undefined;
    case "post":
      return slug ? `/wlog/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
