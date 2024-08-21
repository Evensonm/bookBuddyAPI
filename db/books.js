// TODO : create a function createBook({ title, author, description, coverimage, available})
//to insert into the booksd table in our db jusdt like createUser function
//then export function from this file

const client = require("./client");

const getBooks = async () => {
  try {
    const SQL = `SELECT * FROM books`;
    const { rows } = await client.query(SQL);
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const createBook = async ({
  title,
  author,
  description,
  coverImage,
  available,
}) => {
  try {
    const SQL = `INSERT INTO books(title, author, description, coverImage, 
        available) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const {
      rows: [book],
    } = await client.query(SQL, [
      title,
      author,
      description,
      coverImage,
      available,
    ]);
    console.log(book);
    return book;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { createBook, getBooks };
