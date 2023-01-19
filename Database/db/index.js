const mysql = require("mysql2");
const knex = require("knex");
const escapeRegExp = require('lodash.escaperegexp');

//set config from file env (SQL command)


const sqlcm = mysql.createConnection({
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    port:process.env.DB_PORT,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST
});

//set config from fine env (SQL knex)
const sqlknex = knex.default({
    client : "mysql2",
    connection : {
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        port:process.env.DB_PORT,
        database : process.env.DB_NAME,
        host : process.env.DB_HOST
    }
});

const byParameters = (str , find , replaces , type = undefined) => {
    try{
        function replaceAll(str, find, replaces) {
            
            if(!replaces){
                replaces = null;
            }else if(!type){
                replaces = `'${replaces}'`;
            }else if (type.toLowerCase() === 'number'){
                replaces = replaces;
            }else if(type.toLowerCase() === 'date'){
                if(replaces.toString() === "Invalid Date"){
                    throw new Error(`รูปแบบวันที่ของ ( ${find} ) ผิดต้องเป็น [ YYYY-MM-DDThh:mm:ss.000Z ]`);
                }
                replaces = `'${replaces.toJSON().slice(0, 19).replace('T', ' ')}'`;
            }
            return str.replace(new RegExp(escapeRegExp(`@${find}`), 'g'), replaces);
        }
        return replaceAll(str, find , replaces);
    }catch(err){
        throw new Error(err.message);
    }
}

    const byParametersMulti = (str , params = []) => {
    try{
        // Example params [ find , replace , type ]
        let SQL = str;
        params = params.sort((a, b) => {return b[0].length - a[0].length});
        for(const data of params){
            if(data.length >2){
                SQL = byParameters(SQL , data[0] , data[1] , data[2]);
            }else{
                SQL = byParameters(SQL , data[0] , data[1]);
            }
        }
        return SQL;
    }catch(err){
        throw new Error(err.message);
    }
}

const db = {
    cm : sqlcm,
    cmps : sqlcm.promise(),
    knex : sqlknex,
    byParameters : byParameters,
    byParametersMulti : byParametersMulti
};
module.exports = db;