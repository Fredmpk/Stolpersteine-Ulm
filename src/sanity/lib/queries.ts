import { defineQuery } from "next-sanity";

export const BIOGRAPHY_LIST_QUERY =
  defineQuery(`*[_type == "biographies" && defined(slug.current)] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    adress,
    images_stones,
    stone_texts[]{ text, _key }, 
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
  images_stones,
  stone_texts[]{ text, _key }, 
  sources,
  body,
  authors,
}`);

export const BIOGRAPHY_MAP_QUERY =
  defineQuery(`*[_type == "biographies" && defined(slug.current)]{
  _id,
  title,
  "slug": slug.current,
  geopoint,
  biotext_short,
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
      "flyerUrl": flyer.asset->url
    }
    `);

// Events for a given year

// Single event by ID
export const EVENT_BY_ID_QUERY = defineQuery(`
  *[_type == "dates" && _id == $id][0]{
    _id, title, date, location, description, "flyerUrl": flyer.asset->url    
  }
  `);

// Unique list of years with events

export const EVENT_YEARS_QUERY = defineQuery(`
  array::unique(
    *[
      _type == "dates" &&
      defined(date) &&
      !(_id in path("drafts.**"))
    ]{
      "year": dateTime(date)
    } 
  ) 
`);

export const FUTURE_EVENTS_QUERY = defineQuery(`
      *[_type == "dates" && dateTime(date) > dateTime(now())] 
      | order(date asc){
        _id,
        title,
        date,
        location,
        description,
        "flyerUrl": flyer.asset->url,
      }
      `);

export const NEWS_QUERY = defineQuery(`
        *[_type == "news"]
          | order(date desc)
          [$start...$end] {
            _id,
            title,
            date,
            body,
            "flyerUrl": flyer.asset->url
          }
      `);

export const NEWS_COUNT_QUERY = `count(*[_type == "news"])`;

export const PROCESS_QUERY = defineQuery(`*[_type == "process"][0]{
      _id,
      description,
      images[]{
        _key,
        asset,
        caption
      },
      media[]{
  title,
  url,
  "pdfUrl": pdf.asset->url
}
    }`);
