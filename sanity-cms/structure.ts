import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Space")
    .items([
      S.documentTypeListItem("settings").title("Settings"),
      S.divider(),
      S.documentTypeListItem("home").title("Home"),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.divider(),
      S.documentTypeListItem("art").title("Arts"),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      S.documentTypeListItem("post").title("Posts"),
    ]);
