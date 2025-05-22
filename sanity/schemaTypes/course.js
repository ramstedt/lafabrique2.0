export const course = {
  name: 'course',
  title: 'Kurs',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Namn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug || !slug.current) {
            return 'Slug krävs';
          }

          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2023-01-01' });
          const existingCourse = await client.fetch(
            `*[_type == "course" && slug.current == $slug && !(_id in [$id, "drafts." + $id])][0]`,
            { slug: slug.current, id: document._id.replace(/^drafts\./, '') }
          );

          return existingCourse ? 'Sluggen måste vara unik' : true;
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
      type: 'array',
      of: [{ type: 'datetime' }],
      description: 'Du kan välja flera datum',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'hour',
      title: 'Antal timmar',
      type: 'number',
      description: 'Hur lång är ett kurstillfälle? Endast siffror',
    },
    {
      name: 'seats',
      title: 'Antal platser (total)',
      type: 'number',
      description: 'Endast siffror',
    },
    {
      name: 'freeSeats',
      title: 'Antalet lediga platser',
      type: 'number',
      description: 'Endast siffror',
    },
    {
      name: 'price',
      title: 'Pris',
      type: 'number',
      description: 'Endast siffror',
    },
    { name: 'instructor', title: 'Instruktör', type: 'string' },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Keramik', value: 'Keramik' },
          { title: 'Akvarell', value: 'Akvarell' },
          { title: 'Oljemåleri', value: 'Oljemåleri' },
          { title: 'Teckning', value: 'Teckning' },
          { title: 'Textil', value: 'Textil' },
          { title: 'Workshop', value: 'Workshop' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sendTo',
      title: 'Intresseanmälan skickas till',
      type: 'string',
      options: {
        list: [
          { title: 'Karin', value: 'karin' },
          { title: 'Cecilia', value: 'cecilia' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
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
    //   title: 'Visa denna kursen på startsidan?',
    //   type: 'boolean',
    //   description:
    //     'Om detta är aktiverat kommer kursen att synas på startsidan. Den tas automatiskt bort om datumet har passerat.',
    // },
  ],

  preview: {
    select: {
      title: 'name',
      eventDateTime: 'eventDateTime',
      category: 'category',
      image: 'image',
    },
    prepare({ title, eventDateTime, category, image }) {
      if (!eventDateTime || eventDateTime.length === 0) {
        return {
          title: `${title} (${category || 'Ingen kategori'})`,
          subtitle: 'Ingen tid angiven',
          media: image,
        };
      }

      const sortedDates = eventDateTime
        .map((date) => new Date(date))
        .sort((a, b) => a - b);

      const earliestDate = sortedDates[0];

      const formattedDate = earliestDate.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      return {
        title: `${title}`,
        subtitle: `${category}, ${eventDateTime.length === 1 ? 'Tid' : 'Startdatum'}: ${formattedDate}`,
        media: image,
      };
    },
  },
};
