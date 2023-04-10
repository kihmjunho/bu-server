export const getGuestQuery = `
  select
    guestId, message, g.date, userId, username, response
  from bu_guest as g
    left join bu_users as u on u.userId = g.user_id
  order by g.date desc
`;

export const createGuestQuery = `
  insert into bu_guest
    (guestId, message, user_id, date)
  value (?, ?, ?, ?)
`;

export const updateMessageQuery = `
  update bu_guest set 
    message = ?
  where guestId = ?
`;
