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

export const ALL_EVENTS_QUERY = defineQuery(`
  *[_type == "dates"] | order(date asc){
    _id,
    title,
    date,
    location,
    description,
    "flyer": flyer.asset->url
  }
  `);

// Events for a given year
export const EVENTS_BY_YEAR_QUERY = defineQuery(`
    *[_type == "dates" 
      && dateTime(date) >= dateTime(concat($year, "-01-01T00:00:00Z")) 
      && dateTime(date) < dateTime(concat(string($year + 1), "-01-01T00:00:00Z"))
    ]|order(date asc){
      _id, title, date, location, description, "flyer": flyer.asset->url
    }
    `);

// Single event by ID
export const EVENT_BY_ID_QUERY = defineQuery(`
    *[_type == "dates" && _id == $id][0]{
      _id, title, date, location, description, "flyer": flyer.asset->url
    }
    `);

// Unique list of years with events

export const EVENT_YEARS_QUERY = defineQuery(`
  array::unique(
    *[_type == "dates" && defined(date)]{
      "year": dateTime(date).year
    }.year
  ) | order(@ desc)
`);

export const FUTURE_EVENTS_QUERY = defineQuery(`
        *[_type == "dates" && dateTime(date) > dateTime(now())] 
        | order(date asc){
          _id,
          title,
          date,
          location,
          description,
           "flyer": flyer.asset->url,
        }
        `);
