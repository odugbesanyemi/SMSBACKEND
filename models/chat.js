import db from '../config/database.js'

const chat = {}
chat.searchUser = (user_id,type,keyword,result)=>{
    const sql = `SELECT ${type}.*,users.online_status,users.last_seen,users.account_type,${type}.user_id AS person_id, users.chat_id FROM ${type} INNER JOIN users ON users.id = ${type}.user_id WHERE (name LIKE ? OR '${type}.email' LIKE ?) AND (user_id <> ${user_id})`
    db.query(sql,[`%${keyword}%`,`%${keyword}%`],(err,response)=>{
        if(err){console.log(err); return result(err,null)}
        return result(null,response)
    })
}
chat.findThread = (users,result)=>{
    const sender_id = users[0]
    const receiver_id = users[1]
    const sql = `SELECT * FROM message_thread WHERE (sender_id = ? AND receiver_id = ?) OR (receiver_id = ? AND sender_id = ?)`
    db.query(sql,[sender_id,receiver_id,sender_id,receiver_id],(err,response)=>{
        if(err){return result(err,null)}
        return result(null,response)
    })
}
chat.newThread = (users,result)=>{
    const sql = `INSERT INTO message_thread SET ?`
    db.query(sql,users,(err,response)=>{
        if(err){return result(err,null)}
        return result(null,response)
    })
}
chat.getThreadMessages = (thread_id,options,result)=>{
    const sql = `SELECT message.* FROM message WHERE thread_id = ? ORDER BY message_id DESC LIMIT ? OFFSET ?`
    db.query(sql,[thread_id,options[0],options[1]],(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
chat.newMessage = (data,result)=>{
    const sql = `INSERT INTO message SET ?`
    db.query(sql,data,(err,response)=>{
        if(err){return result(err,null)}
        return result(null,response)
    })
}
chat.getContactList = (user_id,result)=>{
    const sql = `SELECT * FROM message_thread WHERE sender_id = ? OR receiver_id = ?`
    db.query(sql,[user_id,user_id],(err,response)=>{
        if(err){return result(err,null)}
        return result(null,response)
    })
}
chat.deleteMessage = (id,result)=>{
    const sql = `DELETE FROM message WHERE message_id = ?`
    db.query(sql,id,(err,response)=>{
        if(err){return result(err,null)}
        return result(null,response)
    })
}

export default chat;