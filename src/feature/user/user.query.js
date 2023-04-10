export const signupQuery = `
  insert into bu_users (userId, username, password, date)
    values (?, ?, ?, ?)
`;

export const userQuery = `
  select * from bu_users where username = ?
`;

export const updatePassword = `
  update bu_users set
    password = ?
  where username = ?
`;
