export const getBody = body => {
  return Object.keys(body).map(key => {
    return body[key];
  });
};
