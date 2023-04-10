import { default as fsWithCallbacks } from 'fs';

const fs = fsWithCallbacks.promises;

export const insertImages = data => {
  const list = [];
  data.map(item => list.push(item.filename.replace('.jpg', '')));
  const fileList = list.join('[]');
  const thumbnail = list[0];

  return { fileList, thumbnail };
};

export const getImages = (data, thumbnail) => {
  const images = data.split('[]').filter(el => el !== thumbnail);
  return { images };
};

export const deleteImages = async data => {
  data.split('[]').map(async item => {
    await fs.unlink(`uploads/${item}`);
  });
};
