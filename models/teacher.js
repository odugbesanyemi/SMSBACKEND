import { response } from 'express'
import db from '../config/database.js'

const teacher = {}
teacher.getRecords = (id,result)=>{
    const sql = "SELECT * FROM teacher WHERE user_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}

teacher.getClass = (id,result)=>{
    const sql = "SELECT * FROM class WHERE teacher_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            return result(err,null)
        }
        return result(null,response)
    })
}
teacher.getSubjects = (id,result)=>{
    const sql = "SELECT * FROM subject WHERE teacher_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err){
            return result(err,null)
        }return result(null,response)
    })
}
teacher.getClassStudents = (id,result)=>{
    const sql = "SELECT * FROM student WHERE class_id = ?"
    db.query(sql,id,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getClassAttendanceByDate = (data,result)=>{
    const sql = `SELECT * FROM attendance INNER JOIN student ON attendance.student_id = student.student_id WHERE session_id = ? AND attendance.term_id = ? AND attendance.class_id = ? AND date = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.checkStudentAttendance = (data,result)=>{
    const sql = "SELECT * FROM attendance WHERE session_id = ? AND term_id = ? AND class_id = ? AND student_id = ? AND date = ?"
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.addClassAttendance =(data,result)=>{
    const sql = "INSERT INTO attendance SET ?"
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response)
    })
}
teacher.updateClassAttendance = (data,result)=>{
    const sql = `UPDATE attendance SET ? WHERE id = ${data.id}`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response)
    })
}
teacher.getClassAttendanceReport = (data,result)=>{
    const sql = `SELECT * FROM attendance INNER JOIN student ON attendance.student_id = student.student_id WHERE session_id = ? AND attendance.term_id = ? AND attendance.class_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
export default teacher;