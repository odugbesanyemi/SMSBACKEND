import db from '../config/database.js'

const User = {};

User.findByUsername = (username,result)=> {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql,username,(err,response)=>{
        if(err){
            return result(err,null)
        } 
        return result(null,response)
    });
};

User.findByEmail = (email,result)=>{
    const sql = "SELECT * FROM users WHERE email = ?"
    db.query(sql,email,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response[0])
    });
}

User.createUser = (data,result)=>{
    const sql = "INSERT INTO users SET ?"
    db.query(sql,data,(err,response)=>{
        if(err){
         return result(err,null)
        }
        return result(null,response)
    })
}

User.updateUser = (id,data,result)=>{
    const sql = `UPDATE users SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err){
            return result(err,null)
           }
        return result(null,response)
    })
}

User.getUserById = (id,result)=>{
    const sql = `SELECT id,account_type FROM users WHERE id = ?`
    db.query(sql,id,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
User.findUserData =(id,accType,result)=>{
    const sql =  `SELECT ${accType}.*,users.account_type,${accType}.user_id AS person_id,users.online_status,users.last_seen,users.chat_id FROM ${accType} INNER JOIN users ON users.id = ${accType}.user_id WHERE user_id = ?`
    db.query(sql,id,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
export default User;