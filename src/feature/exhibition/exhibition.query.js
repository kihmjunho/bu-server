export const getExhibitionListQuery = `
  select
    exhibitionId, title, solo,
    year, location, city, thumbnail
  from
    bu_exhibitions
`;

export const createExhibitionQuery = `
  insert into bu_exhibitions
    (exhibitionId, title, anotherTitle, metaText, description,
      solo, year, start, end, location, city,
      prefaceTitle, prefaceAuthor, prefaceDescription,
      etc, fileList, thumbnail)
  values
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const getExhibitionDetailQuery = `
  select * from bu_exhibitions where exhibitionId = ?
`;

export const updateExhibitionQuery = `
  update bu_exhibitions set
    title = ?,
    anotherTitle = ?,
    metaText = ?,
    description = ?,
    solo = ?,
    year = ?,
    start = ?,
    end = ?,
    location = ?,
    city = ?,
    prefaceTitle = ?,
    prefaceAuthor = ?,
    prefaceDescription = ?,
    etc = ?
  where exhibitionId = ?
`;

export const deleteExhibitionQuery = `
  delete from bu_exhibitions where exhibitionId = ?
`;
