import { DocumentIcon, ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "art",
  title: "Art",
  type: "document",
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your art.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      description:
        "Used both for the <meta> description tag for SEO, and project subheader.",
      title: "Overview",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Strong",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "This image will be used as the image for the art.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
