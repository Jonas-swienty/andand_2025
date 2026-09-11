import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: the studio structure only ever links to one document of this type.
  fields: [
    defineField({
      name: "aboutText",
      title: "About text",
      description: "Shown in the About overlay on the homepage.",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "officeLabel",
      title: "Office name",
      description: "e.g. \"&&\"",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Contact phone",
      type: "string",
    }),
    defineField({
      name: "addresses",
      title: "Office addresses",
      type: "array",
      of: [
        {
          type: "object",
          name: "address",
          fields: [
            { name: "city", title: "City", type: "string" },
            { name: "line", title: "Address line", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "leftMedia",
      title: "Homepage — left column media",
      description: "Images/videos cycled on the left half of the homepage split-screen.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        {
          type: "file",
          title: "Video",
          options: { accept: "video/*" },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "rightMedia",
      title: "Homepage — right column media",
      description: "Images/videos cycled on the right half of the homepage split-screen.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        {
          type: "file",
          title: "Video",
          options: { accept: "video/*" },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
