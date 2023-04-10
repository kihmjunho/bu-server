export const signupQuery = data => {
  return `
    insert into users (userId, username, password)
      values ('${data.userId}', '${data.username}', '${data.hashedPassword}')
  `;
};

export const loginQuery = username => {
  return `select * from users where username = '${username}'`;
};
