import db from '../config/database.js'
const schedule = {}

schedule.getSchedule = (result)=>{
    const sql = "SELECT * FROM schedule INNER JOIN subject ON subject.id = schedule.subject_id INNER JOIN class ON class.id = schedule.class_id"
    db.query(sql,(err,response)=>{
        if(err){
            console.log(err)
           return result(err,null)
        }
        return result(null,response)
    })
}
schedule.getScheduleByClass = (id,result)=>{
    const sql = "SELECT * FROM schedule INNER JOIN subject ON subject.id = schedule.subject_id INNER JOIN class ON class.id = schedule.class_id INNER JOIN teacher on class.teacher_id = teacher.id WHERE schedule.class_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            console.log(err)
           return result(err,null)
        }
        return result(null,response)
    })
}
export default schedule