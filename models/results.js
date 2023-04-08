import db from '../config/database.js'
const result = {}
result.getResultsByStudentId = (id,result)=>{
    const sql = "SELECT * FROM published_results INNER JOIN session ON session.id = published_results.session_id INNER JOIN term ON term.id = published_results.term_id WHERE student_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}
export default result;