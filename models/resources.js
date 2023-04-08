import db from '../config/database.js'
const resources = {}

resources.getResourcesBySessionTermClass = (data,result)=>{
    const sql = "SELECT * FROM resources WHERE session_id = ? AND term_id = ? AND class_id=?"
    db.query(sql,data,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}

export default resources