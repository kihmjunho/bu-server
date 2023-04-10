export const categoryQuery = `
  select categoryId, name from bu_category
    where related = 2 or related = 4
`;
