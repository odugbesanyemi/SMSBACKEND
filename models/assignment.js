import db from '../config/database.js'
const assignment = {}
assignment.getAssignmentByClass = (class_id,result)=>{
    const sql = "SELECT * FROM homework INNER JOIN subject ON subject.id = homework.subject_id INNER JOIN teacher ON teacher.id = homework.teacher_id WHERE homework.class_id = ?"
    db.query(sql,class_id,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}
export default assignment