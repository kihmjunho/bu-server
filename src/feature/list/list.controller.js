import { conn } from '../../config/conn';

export const getList = async (req, res) => {
  const { cid, related, idx } = req.params;

  const sql = `
      select * from bu_posts as p
        left join bu_category as c
        on c.categoryId = p.category_id
        order by p.date desc
    `;
  const [result] = await conn.query(sql);

  if (cid === 'artwork') {
    let artworkList = [];

    result.forEach(item => {
      if (item.size) {
        artworkList.push(item);
      }
    });
    if (related === 'all') {
      let list = [];
      for (let i = 0; i < artworkList.length; i += 6) {
        list.push(artworkList.slice(i, i + 6));
      }
      const data = { cnt: artworkList.length, list: list[idx] };
      return res.status(201).json(data);
    }

    let eachList = [];

    result.forEach(item => {
      if (item.name === related) {
        eachList.push(item);
      }
    });

    let list = [];
    for (let i = 0; i < eachList.length; i += 6) {
      list.push(eachList.slice(i, i + 6));
    }
    const data = { cnt: eachList.length, list: list[idx] };

    return res.status(201).json(data);
  }

  let boardList = [];

  result.forEach(item => {
    if (!item.size) {
      boardList.push(item);
    }
  });
  if (related === 'all') {
    let list = [];
    for (let i = 0; i < boardList.length; i += 6) {
      list.push(boardList.slice(i, i + 6));
    }
    const data = { cnt: boardList.length, list: list[idx] };
    return res.status(201).json(data);
  }

  let eachList = [];

  result.forEach(item => {
    if (item.name === related) {
      eachList.push(item);
    }
  });

  let list = [];
  for (let i = 0; i < eachList.length; i += 6) {
    list.push(eachList.slice(i, i + 6));
  }
  const data = { cnt: eachList.length, list: list[idx] };

  res.status(201).json(data);
};
