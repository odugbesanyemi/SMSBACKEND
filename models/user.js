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

export default User;