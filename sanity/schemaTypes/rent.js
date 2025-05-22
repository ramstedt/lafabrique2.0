export const rent = {
  name: 'rent',
  title: 'Hyra',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      hidden: true,
    },
    {
      name: 'description',
      title: 'Brödtext',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    },
    {
      name: 'rentCards',
      title: 'Hyresobjekt',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'Uthyres',
          title: 'Info Card',
          fields: [
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (Rule) => Rule.required().min(2).max(50),
            },
            {
              name: 'description',
              title: 'Kort beskrivning',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().min(10).max(300),
            },
            {
              name: 'price',
              title: 'Pris',
              type: 'string',
              description:
                'Exempelvis 2500 kr / vecka eller 2500 kr / månad osv',
            },
            {
              name: 'image',
              title: 'Bild',
              type: 'image',
              description:
                'Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description:
                'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
