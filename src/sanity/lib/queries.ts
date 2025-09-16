import { defineQuery } from "next-sanity";

export const BIOGRAPHY_LIST_QUERY =
  defineQuery(`*[_type == "biographies" && defined(slug.current)] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    adress,
    latitude,
    longitude,
    image_stone,
    sources,
    body,
    authors,
  }`);
export const SINGLE_BIOGRAPHY_QUERY =
  defineQuery(`*[_type == "biographies" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
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

export const GOALS_QUERY = defineQuery(`*[_type == "goals"][0]{
    _id,
    textGoal
  }`);
