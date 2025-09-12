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
