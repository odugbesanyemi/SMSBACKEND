
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
teacher.addClassResource = (data,result)=>{
    const sql = `INSERT INTO resources SET ?`
    db.query(sql,data,(err,response)=>{
        if(err) return result(err,null)
        return result(null,response)
    })
}

teacher.editClassResource = (id,data,result)=>{
    const sql = `UPDATE resources SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err) return result(err,null)
        return result(null,response)
    })
}
teacher.removeClassResource = (id,result)=>{
    const sql = `DELETE FROM resources WHERE id = ?`
    db.query(sql,id,(err,response)=>{
        if(err) return result(err,null)
        return result(null,response)
    })
}
teacher.getClassResults = (data,result)=>{
    const sql = "SELECT * FROM results INNER JOIN student ON student.student_id = results.student_id INNER JOIN subject ON subject.id = results.subject_id WHERE session_id = ? AND term_id = ? AND class_id = ? AND assessment_type_id =?"
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getClassSubjects = (id, result)=>{
    const sql = "SELECT * FROM class_subject INNER JOIN subject ON subject.id = class_subject.subject_id WHERE class_id =? "
    db.query(sql,id,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getAssessmentType = (level_id,result)=>{
    const sql = "SELECT * FROM assessment_type WHERE level_id = ? "
    db.query(sql,level_id,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}

teacher.findScore = (data,result)=>{
    const sql = "SELECT * FROM results WHERE student_id = ? AND subject_id = ? AND assessment_type_id = ? AND session_id =? AND term_id = ?"
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.addScore = (data,result)=>{
    const sql = "INSERT INTO results SET ?"
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.updateScore = (id,data,result)=>{
    const sql = `UPDATE results SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getPsychomotor = (level_id,result)=>{
    const sql = `SELECT * FROM psychomotor WHERE level_id = ?`
    db.query(sql,level_id,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getPsychomotorResults = (data,result)=>{
    const sql = `SELECT * FROM psychomotor_results INNER JOIN psychomotor ON psychomotor.id = psychomotor_id WHERE student_id = ? AND session_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.findPsychomotor = (data,result)=>{
    const sql =`SELECT * FROM psychomotor_results WHERE student_id = ? AND psychomotor_id = ? AND session_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.addPsychomotorResult =(data,result)=>{
    const sql = `INSERT INTO psychomotor_results SET ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.updatePsychomotorResult = (id,data,result)=>{
    const sql = `UPDATE pyschomotor_results SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getAffectiveReport = (result)=>{
    const sql = `SELECT * FROM affective_report `
    db.query(sql,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getAffectiveReportResults = (data,result)=>{
    const sql = `SELECT * FROM affective_report_results INNER JOIN affective_report ON affective_report.id = affective_report_id WHERE student_id = ? AND session_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.findAffectiveReport = (data,result)=>{
    const sql = `SELECT * FROM affective_report_results WHERE student_id = ? AND affective_report_id = ? AND session_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.addAffectiveReportResult = (data,result)=>{
    const sql = `INSERT INTO affective_report_results SET ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.updateAffectiveReportResult = (id,data,result)=>{
    const sql = `UPDATE affective_report_results SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.findAffectiveReport = (data,result)=>{
    const sql = `SELECT * FROM affective_report_results WHERE student_id = ? AND affective_report_id = ? AND session_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.getStudentComment = (data,result)=>{
    const sql = `SELECT * FROM teacher_comments WHERE teacher_id = ? AND student_id =? AND session_id = ? AND term_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null);
        return result(null,response);
    })
}
teacher.updateStudentComment =(id,data,result)=>{
    const sql = `UPDATE teacher_comments SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.addStudentComment = (data,result)=>{
    const sql = `INSERT INTO teacher_comments SET ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.getClassNotice = (data,result)=>{
    const sql = `SELECT * FROM noticeboard WHERE session_id = ? AND term_id = ? AND class_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response) 
    })
}
teacher.addNotice = (data,result)=>{
    const sql = `INSERT INTO noticeboard SET ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.updateNotice = (id,data,result)=>{
    const sql = `UPDATE noticeboard SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.removeNotice = (id,result)=>{
    const sql = `DELETE FROM noticeboard WHERE id = ?`
    db.query(sql,id,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.getTeacherSubjects = (teacher_id,result)=>{
    const sql = `SELECT * FROM teacher_subjects INNER JOIN subject ON subject.id = subject_id INNER JOIN class ON class.id = class_id WHERE teacher_subjects.teacher_id = ?`
    db.query(sql,teacher_id,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.getHomework = (data,result)=>{
    const sql = `SELECT homework.*,subject.subject_name,class.name FROM homework INNER JOIN subject ON subject.id = subject_id INNER JOIN class ON class.id = class_id WHERE homework.teacher_id = ? AND homework.subject_id = ? AND homework.session_id = ? AND homework.term_id = ? ORDER BY homework.id DESC`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.getHomeworkSubmission=(data,result)=>{
    const sql = `SELECT homework_submission.*,student_image,student.name FROM homework_submission INNER JOIN student ON student.student_id = homework_submission.student_id WHERE homework_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.addHomework = (data,result)=>{
    const sql = `INSERT INTO homework SET ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.editHomework = (id,data,result)=>{
    const sql = `UPDATE homework SET ? WHERE id = ${id}`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.removeHomework = (id,result)=>{
    const sql = `DELETE FROM homework WHERE id = ?`
    db.query(sql,id,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.getSubjectResource = (id,data,result) =>{
    const sql = `SELECT * FROM resources WHERE teacher_id = ${id} AND session_id = ? AND term_id = ? AND class_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}
teacher.getSubjectGrades = (data,result)=>{
    const sql = `SELECT *,subject.id AS subject_id,results.id AS result_id FROM results INNER JOIN student ON student.student_id = results.student_id INNER JOIN subject ON subject.id = results.subject_id WHERE subject_id = ? AND assessment_type_id = ? AND session_id = ? AND term_id = ?`
    db.query(sql,data,(err,response)=>{
        if(err)return result(err,null)
        return result(null,response)
    })
}

export default teacher;