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

export const BACKGROUNDS_QUERY =
  defineQuery(`*[_type == "backgrounds" && defined(slug.current)] | order(_createdAt asc){
    _id,
    title,
    "slug": slug.current,
    text
  }`);

export const SINGLE_BACKGROUND_QUERY =
  defineQuery(`*[_type == "backgrounds" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  text,
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

export const DONATIONS_QUERY = defineQuery(`*[_type == "donations"][0]{
    _id,
    title,
    text,
  }`);

export const CLEAN_GODPARENTS_QUERY =
  defineQuery(`*[_type == "cleangodparents"][0]{
    _id,
    title,
    description,
    listcleaners, 
  }`);
