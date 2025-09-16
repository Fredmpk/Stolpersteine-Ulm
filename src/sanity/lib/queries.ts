import { defineQuery } from "next-sanity";

export const BIOGRAPHY_QUERY = defineQuery(`*[_type == "biographies"]{
  _id,
  title,
  adress,
  latitude,
  longitude,
  image_stone,
  sources,
  body,
  authors,
}`);

export const HERO_QUERY = defineQuery(`*[_type == "hero"][0]{  
    _id,
    quote,
    quoteAuthor,
    nextStone{
      title,
      link
    },
    nextMeeting{
      title,
      link
    } 
}`);
