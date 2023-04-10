export const categoryInitQuery = () => {
  return `
    create table 'category' (
      'categoryId' int not null auto_increment primary key,
      'name' char(30) not null,
      'related' int null
    );`;
};
