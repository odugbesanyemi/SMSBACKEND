import db from '../config/database.js'
const session = {}
    session.getActiveSession = (result)=>{
        const sql = "SELECT * FROM session WHERE active=1"
        db.query(sql,(err,response)=>{
            if(err){
                return result(err,null)
            }
            return result(null,response)
        })
    }
export default session