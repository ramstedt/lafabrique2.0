export const landingPage = {
  name: 'landingPage',
  title: 'Förstasidan',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(25),
    },
    {
      name: 'gallery',
      title: 'Hero karusell',
      type: 'array',
      options: { layout: 'grid' },
      of: [
        {
          type: 'object',
          name: 'galleryObject',
          fields: [
            {
              validation: (Rule) => Rule.required(),
              name: 'image',
              type: 'image',
              title: 'Bild',
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
            { name: 'smallText', title: 'Text 1', type: 'string' },
            {
              name: 'largeText',
              title: 'Text 2',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'buttonText', title: 'Text knapp', type: 'string' },
            { name: 'url', title: 'Länk knapp', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'infoCards',
      title: 'Info-kort',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'infoCard',
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
    {
      name: 'textBlocks',
      title: 'Paragrafer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Soft Sage Green',
                    value: 'rgba(163, 177, 138, 0.5)',
                  },
                  { title: 'Terracotta Red', value: 'rgba(184, 80, 66, 0.5)' },
                  {
                    title: 'Warm Mustard Yellow',
                    value: 'rgba(225, 169, 85, 0.5)',
                  },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'text', subtitle: 'backgroundColor' },
            prepare({ title, subtitle }) {
              return {
                title: title?.[0]?.children?.[0]?.text || 'No text',
                subtitle: `Background: ${subtitle}`,
              };
            },
          },
        },
      ],
    },
  ],
};
