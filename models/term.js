import db from '../config/database.js'
const term = {}
    term.getActiveTerm = (result)=>{
        const sql = "SELECT * FROM term WHERE active = 1"
        db.query(sql,(err,response)=>{
            if(err){
                return result(err,null)
            }
            return result(null,response)
        })
    }
export default term