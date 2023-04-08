import db from '../config/database.js'

const noticeboard = {}
noticeboard.getNotificationByClass = (data,result)=>{
    const sql = "SELECT * FROM noticeboard WHERE session_id = ? AND term_id = ? AND class_id = ?"
    db.query(sql,data,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}
export default noticeboard