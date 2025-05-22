import { PiHouseLineFill } from 'react-icons/pi';
import { RiLayoutBottom2Fill } from 'react-icons/ri';
import { MdPalette } from 'react-icons/md';
import { MdOutlineSell } from 'react-icons/md';
import { PiChairLight, PiChampagneBold } from 'react-icons/pi';

export const structure = (S) =>
  S.list()
    .title('Innehåll')
    .items([
      S.listItem()
        .title('Hem')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('751f1205-787a-456c-b7aa-611a5ab0fb8b')
        )
        .icon(PiHouseLineFill),
      S.listItem()
        .title('Kreatörer')
        .child(S.documentTypeList('artist').title('Artists'))
        .icon(MdPalette),
      S.listItem()
        .title('Kurser & Workshops')
        .child(S.documentTypeList('course').title('Kurser & Workshops'))
        .icon(PiChairLight),
      S.listItem()
        .title('Events')
        .child(S.documentTypeList('event').title('Events'))
        .icon(PiChampagneBold),
      S.listItem()
        .title('Hyra för skapande')
        .child(S.document().schemaType('rent').documentId('rent'))
        .icon(MdOutlineSell),
      S.listItem()
        .title('Hyra för event')
        .child(S.document().schemaType('meetings').documentId('meetings'))
        .icon(MdOutlineSell),
      S.listItem()
        .title('Footer')
        .child(S.document().schemaType('footer').documentId('footer'))
        .icon(RiLayoutBottom2Fill),
    ]);
