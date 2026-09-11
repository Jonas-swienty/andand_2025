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
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
