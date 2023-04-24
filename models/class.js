import db from '../config/database.js'
const classes = {}
classes.getClassById = (id,result)=>{
    const sql = "SELECT * FROM class INNER JOIN teacher ON teacher.id = class.teacher_id INNER JOIN department ON department.id = class.department_id WHERE class.id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}

export default classes;