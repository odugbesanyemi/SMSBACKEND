import db from '../config/database.js'

const student = {}
student.getRecords = (id,result)=>{
    const sql = "SELECT * FROM student INNER JOIN class ON class.id = student.class_id WHERE user_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}
export default student;