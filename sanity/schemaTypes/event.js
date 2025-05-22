export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug || !slug.current) {
            return 'Slug krävs';
          }

          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2023-01-01' });
          const existingEvent = await client.fetch(
            `*[_type == "event" && slug.current == $slug && !(_id in [$id, "drafts." + $id])][0]`,
            { slug: slug.current, id: document._id.replace(/^drafts\./, '') }
          );

          return existingEvent ? 'Sluggen måste vara unik' : true;
        }),
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      description:
        'Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
      validation: (Rule) => Rule.required(),
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativ Text',
          description:
            'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'eventDateTime',
      title: 'Tid och datum',
      type: 'datetime',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'seats',
      title: 'Antal platser',
      type: 'number',
      description: 'Endast siffror. Kan lämnas tomt',
    },
    {
      name: 'freeSeats',
      title: 'Antalet lediga platser',
      type: 'number',
      description: 'Endast siffror. Kan lämnas tomt',
    },
    {
      name: 'price',
      title: 'Pris',
      type: 'number',
      description: 'Endast siffror. Kan lämnas tomt',
    },
    { name: 'organiser', title: 'Arrangör', type: 'string' },
    {
      name: 'sendTo',
      title: 'Anmälan skickas till:',
      description:
        'Fyll ett email. Om ingen anmälan behövs kan du lämna fältet tomt.',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivning',
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
    // {
    //   name: 'showOnLanding',
    //   title: 'Visa eventet på startsidan?',
    //   type: 'boolean',
    //   description:
    //     'Om detta är aktiverat kommer eventet att synas på startsidan. Den tas automatiskt bort om datumet har passerat.',
    // },
  ],
  preview: {
    select: { title: 'title', image: 'image' },
    prepare({ title, image }) {
      return { title: `${title}`, media: image };
    },
  },
};
