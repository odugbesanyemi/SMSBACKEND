import db from  "../config/database.js"

const subject = {}

subject.getSubjectByClass = (id,result)=>{
    const sql = "SELECT * FROM class_subject INNER JOIN class ON class.id = class_subject.class_id INNER JOIN subject ON subject.id = class_subject.subject_id  WHERE class_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}
export default subject;