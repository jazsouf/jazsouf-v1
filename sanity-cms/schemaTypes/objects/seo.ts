import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  description: "For search engines",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.max(60).warning(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160).warning(),
    }),
    defineField({
      name: "image",
      description: "Used for social sharing previews",
      type: "image",
    }),
    defineField({
      name: "noIndex",
      description: "Prevent search engines from indexing this page",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
