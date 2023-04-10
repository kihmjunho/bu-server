export const createPostQuery = `
  insert into bu_posts
    (postId, title, metaText, description, size, materials, year, price, collector,
      category_id, user_id, fileList, thumbnail, date)
  values
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const getPostQuery = `
  select * from bu_posts as p
    left join bu_category as c
    on c.categoryId = p.category_id
    where postId = ?
`;

export const updateViewQuery = `
  update bu_posts set views = ifnull(views, 0) + 1
    where postId = ?
`;

export const updatePostQuery = `
  update bu_posts set
    title = ?,
    category_id = ?,
    metaText = ?,
    description = ?,
    size = ?,
    materials = ?,
    year = ?,
    price = ?,
    collector = ?
    where postId = ?
`;

export const deletePostQuery = `
  delete from bu_posts where postId = ?
`;

export const getCommentsQuery = `
  select * from bu_comments as c
    left join bu_users as u
    on u.userId = c.user_id
    where c.post_id = ?
`;

export const deleteCommentsQuery = `
  delete from bu_comments where post_id = ?
`;

export const writeCommentQuery = `
  insert into bu_comments
    (commentId, comment, user_id, post_id, date)
  values
    (?, ?, ?, ?, ?)
`;

export const updateCommentQuery = `
  update bu_comments set comment = ?
    where commentId = ?
`;

export const deleteCommentQuery = `
  delete from bu_comments where commentId = ?
`;
