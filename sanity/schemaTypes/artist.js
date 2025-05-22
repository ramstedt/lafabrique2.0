export const artist = {
  name: 'artist',
  title: 'Kreatör',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Förnamn',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(25),
    },
    {
      name: 'surname',
      title: 'Efternamn',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(25),
    },
    {
      name: 'isTutor',
      title: 'Håller den här personen kurser?',
      type: 'string',
      options: {
        list: [
          { title: 'Ja', value: 'yes' },
          { title: 'Nej', value: 'no' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'textBlock',
      title: 'Text',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'array',
          description: 'max 400 tecken',
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
          validation: (Rule) =>
            Rule.custom((blocks) => {
              if (!blocks || blocks.length === 0) return 'Text is required';

              const text = blocks
                .map((block) =>
                  block.children
                    ? block.children.map((child) => child.text || '').join('')
                    : ''
                )
                .join('');

              return text.length <= 400
                ? true
                : `Text is too long (${text.length}/400 characters).`;
            }),
        },
        {
          name: 'backgroundColor',
          title: 'Bakgrundsfärg',
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
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      description: 'Lägg till en länk',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
      description: 'Lägg till en länk',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    },
    {
      name: 'tiktok',
      title: 'TokTok',
      type: 'string',
      description: 'Lägg till en länk',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Lägg till en emailadress',
      validation: (Rule) =>
        Rule.email().error('Please enter a valid email address'),
    },
    {
      name: 'website',
      title: 'Hemsida',
      type: 'string',
      description: 'Lägg till en länk',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
          allowRelative: false,
        }),
    },
    {
      name: 'portrait',
      title: 'Porträtt',
      type: 'image',
      description:
        'Ladda upp ett porträtt av dig själv. Bilden bör vara horisontell. Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'galleryImage1',
      title: 'Portfolio-bild 1',
      type: 'image',
      description:
        'Ladda upp en bild av ditt verk. Bilden bör vara horisontell. Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'galleryImage2',
      title: 'Portfolio-bild 2',
      type: 'image',
      description:
        'Ladda upp en bild av ditt verk. Bilden bör vara horisontell. Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
};
