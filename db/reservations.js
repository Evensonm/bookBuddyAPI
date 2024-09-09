const client = require('./client');

const createReservation = async ({userId, bookId})=>{
    try{
        const SQL = `INSERT INTO reservations(userId, bookId) VALUES($1, $2) RETURNING *`;
        const {
            rows: [reservation],
          } = await client.query(SQL, [
            userId,
            bookId,
          ]);
          return reservation;
    }catch(err){
        throw err;
    }
};

const getReservation = async(id)=>{
    try{
        const SQL = `SELECT * FROM reservations WHERE id=$1`;
        const {
            rows: [result],
          } = await client.query(SQL, [id]);
          return result;

    }catch(err){
        throw err;
    }
};

const getUsersReservations = async (userId) => {
    try {
        const SQL = `SELECT reservations.id, books.title, books.descriptioin, books.coverimage,
        reservations JOIN books ON reservations.bookid = books.id AND userid = $1`;

        const {rows} = await client.query(SQL, [userId]);
        if(!rows) return;
        console.log(rows);
        return rows;

    }
    catch(err)
    {throw err;}
};

const deleteReservation = async(id)=>{
    try{
        const SQL = `DELETE FROM reservations WHERE id=$1 RETURNING *`;
        const {
            rows: [result],
          } = await client.query(SQL, [id]);
          return result;


    }catch(err){
        throw err;
    }
};

module.exports = {createReservation, getReservation, deleteReservation, getUsersReservations};