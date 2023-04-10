const tableName = table => {
  const name = table === 'post' ? 'post' : 'exhibition';
  return name;
};

export const getImagesQuery = table => {
  const name = tableName(table);

  return `
    select fileList, thumbnail from bu_${name}s
      where ${table}Id = ?
  `;
};

export const imagesUpdateQuery = table => {
  const name = tableName(table);

  return `
    update bu_${name}s set
      fileList = ?, thumbnail = ?
    where ${table}Id = ?
  `;
};

export const thumbnailUpdateQuery = table => {
  const name = tableName(table);
  return `
    update bu_${name}s set thumbnail = ?
      where ${table}Id = ?
  `;
};
