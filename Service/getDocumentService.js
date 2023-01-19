const db = require("../Database/db");


const getList = async () => {
    try{
        const detail = await db.cmps.query(`SELECT * FROM ddd`);
        return detail[0];
    }catch(e){
        throw  new Error(e.message);
    }
}


const saveDocument = async () => {

//     let SQL =
//     "insert into account (USER_ID , USER_NAME , PASSWORD , DATE_REGISTER , ROLE_ID) values (@USER_ID , @USER_NAME , @PASSWORD , @DATE_REGISTER , @ROLE_ID)";
//   SQL = db.byParameters(SQL, "USER_ID", USER_ID.padStart(12, "0"));
//   SQL = db.byParameters(SQL, "USER_NAME", data.USER_NAME);
//   SQL = db.byParameters(SQL, "PASSWORD", passwordHash);
//   SQL = db.byParameters(SQL, "DATE_REGISTER", new Date(), "Date");
//   SQL = db.byParameters(SQL, "ROLE_ID", 1, "Number");

    try{
        let SQL = `INSERT INTO ddd(name) VALUES ('123456')`;
        await db.cmps.query(SQL);
        return "success"
    }catch(e){
        throw new Error(e.message);
    }
}

module.exports = {
    getList,
    saveDocument
};