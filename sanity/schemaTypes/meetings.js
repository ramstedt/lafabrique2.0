export const meetings = {
  name: 'meetings',
  title: 'Möten',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    },
    {
      name: 'textBlocks',
      title: 'Paragrafer',
      name: 'text',
      title: 'Paragraph Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'meetingBlock',
      title: 'Mötes-kort',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'meetingBlock',
          title: 'Möteskort',
          fields: [
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (Rule) => Rule.required().min(2).max(80),
            },
            {
              name: 'description',
              title: 'Kort beskrivning',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().min(10).max(200),
            },
            {
              name: 'image',
              title: 'Bild',
              type: 'image',
              description:
                'Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
              options: { hotspot: true },
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
