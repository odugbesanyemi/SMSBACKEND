import teacher from "../models/teacher.js";

const teacherCtrl = {};

teacherCtrl.getRecords = (req, res) => {
  const user_id = req.params.id;
  teacher.getRecords(user_id, (err, results) => {
    if (err) {
      return res.status(403).send("could't complete request");
    }
    return res.status(200).send(results);
  });
};
teacherCtrl.getClass = (req, res) => {
  const teacher_id = req.params.id;
  teacher.getClass(teacher_id, (err, results) => {
    if (err) return res.sendStatus(400);
    return res.status(200).send(results);
  });
};
teacherCtrl.getSubjects = (req, res) => {
  const teacher_id = req.params.id;
  teacher.getSubjects(teacher_id, (err, results) => {
    if (err) return res.sendStatus(400);
    return res.status(200).send(results);
  });
};
teacherCtrl.getClassStudents = (req, res) => {
  const class_id = req.params.id;
  teacher.getClassStudents(class_id, (err, results) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    return res.status(200).send(results);
  });
};
teacherCtrl.getClassAttendanceByDate = (req, res) => {
  const session_id = req.query.session_id;
  const term_id = req.query.term_id;
  const class_id = req.query.class_id;
  const attendance_date = req.query.date;
  teacher.getClassAttendanceByDate(
    [session_id, term_id, class_id, attendance_date],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.status(200).send(results);
    }
  );
};
teacherCtrl.addClassAttendance = (req, res) => {
  const data = req.body;
  // first check if the data exists?
  teacher.checkStudentAttendance(
    [data.session_id, data.term_id, data.class_id, data.student_id, data.date],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      if (results.length) {
        teacher.updateClassAttendance(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.sendStatus(400);
          }
          return res.status(200).send("Attendance Updated Successfully");
        });
      } else {
        // otherwise meaning there was not data so we are adding afresh
        let { id, ...newOjbect } = data;
        teacher.addClassAttendance(newOjbect, (err, results) => {
          if (err) {
            console.log(err);
            return res.sendStatus(400);
          }
          return res.status(200).send(results);
        });
      }
    }
  );
};
teacherCtrl.getClassAttendanceReport = (req, res) => {
  const session_id = req.query.session_id;
  const term_id = req.query.term_id;
  const class_id = req.query.class_id;
  teacher.getClassAttendanceReport(
    [session_id, term_id, class_id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.status(200).send(results);
    }
  );
};
teacherCtrl.addClassResource = (req, res) => {
  const file = req.file;
  const info = {
    resource_name: req.query.name,
    description: req.query.description,
    class_id: req.query.class_id,
    session_id: req.query.session_id,
    teacher_id:req.query.teacher_id,
    term_id: req.query.term_id,
  };
  const data = {
    ...info,
    type: file.mimetype.split("/")[0],
    resource_link: file.filename,
  };
  teacher.addClassResource(data, (err, results) => {
    if (err) return res.sendStatus(400);
    return res.status(200).send("Resource Saved Successfully");
  });
};
teacherCtrl.editClassResource = (req, res) => {
  const file = req.file;
  const id = req.params.resource_id;
  const info = {
    resource_name: req.query.name,
    description: req.query.description,
    class_id: req.query.class_id,
    session_id: req.query.session_id,
    term_id: req.query.term_id,
  };
  const data = {
    ...info,
   ...(req.file && {
    type: req.file.mimetype.split("/")[0],
    resource_link: req.file.filename,
  })
  };
  teacher.editClassResource(id, data, (err, results) => {
    if (err) return res.sendStatus(400);
    return res.status(200).send("Resource Updated Successfully");
  });
};
teacherCtrl.removeClassResource = (req, res) => {
  const id = req.params.resource_id;
  teacher.removeClassResource(id, (err, results) => {
    if (err) return res.sendStatus(400);
    return res.status(200).send("Resource Deleted Successfully");
  });
};
teacherCtrl.getClassResults = (req, res) => {
  const session_id = req.query.session_id;
  const term_id = req.query.term_id;
  const class_id = req.query.class_id;
  const assessment_type_id = req.query.assessment_type_id;
  const data = [session_id, term_id, class_id, assessment_type_id];
  teacher.getClassResults(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    return res.status(200).send(results);
  });
};
teacherCtrl.getClassSubjects = (req, res) => {
  const class_id = req.query.class_id;
  teacher.getClassSubjects(class_id, (err, results) => {
    if (err) return res.sendStatus(400);
    return res.status(200).send(results);
  });
};
teacherCtrl.getAssessmentType = (req, res) => {
  const level_id = req.query.level_id;
  teacher.getAssessmentType(level_id, (err, results) => {
    if (err) return res.sendStatus(400);
    return res.status(200).send(results);
  });
};
teacherCtrl.ManageScore = (req, res) => {
  const student_id = req.query.student_id;
  const subject_id = req.query.subject_id;
  const marks_obtained = req.query.marks_obtained;
  const assessment_type_id = req.query.assessment_type_id;
  const session_id = req.query.session_id;
  const term_id = req.query.term_id;
  const findArray = [
    student_id,
    subject_id,
    assessment_type_id,
    session_id,
    term_id,
  ];
  const data = {
    student_id: student_id,
    subject_id: subject_id,
    assessment_type_id: assessment_type_id,
    marks_obtained: marks_obtained,
    session_id: session_id,
    term_id: term_id,
  };
  teacher.findScore(findArray, (err, results) => {
    if (err) return res.sendStatus(400);
    // found a match get the id of the record
    if (results.length) {
      // meaning there is a match
      teacher.updateScore(
        results[0].id,
        { marks_obtained: marks_obtained,last_updated:new Date()},
        (err, results) => {
          if (err) return res.sendStatus(400);
          return res.status(200).send("Marks Updated");
        }
      );
    } else {
      // meaning there are no matches
      teacher.addScore(data, (err, results) => {
        if (err) return res.sendStatus(400);
        return res.status(200).send("Marks Added Successfully");
      });
    }
  });
};
teacherCtrl.editScore= (req,res)=>{
  const id = req.params.id
  const data = req.body
  teacher.updateScore(id,data,(err,results)=>{
    if (err) return res.sendStatus(400);
    return res.status(200).send("Marks updated Successfully");
  })

}
teacherCtrl.getPsychomotor = (req, res) => {
  const level_id = req.query.level_id;
  teacher.getPsychomotor(level_id, (err, results) => {
    if (err){console.log(err); return res.sendStatus(400)};
    return res.status(200).send(results);
  });
};
teacherCtrl.getPsychomotorResults = (req, res) => {
  const student_id = req.query.student_id;
  const session_id = req.query.session_id;
  teacher.getPsychomotorResults([student_id, session_id], (err, results) => {
    if (err){console.log(err); return res.sendStatus(400)};
    return res.status(200).send(results);
  });
};
teacherCtrl.managePsychomotorResults = (req, res) => {
  const student_id = req.query.student_id;
  const psychomotor_id = req.query.psychomotor_id;
  const result = req.query.result;
  const session_id = req.query.session_id;
  const findArray = [student_id, psychomotor_id, session_id];
  const data = {student_id:student_id,psychomotor_id:psychomotor_id,result:result,session_id:session_id}
  teacher.findPsychomotor(findArray, (err, results) => {
    if (err) return res.sendStatus(400);
    if (results.length) {
      // meaning there is a match
      teacher.updatePsychomotorResult(
        results[0].id,
        { result: result },
        (err, results) => {
          if (err) return res.sendStatus(400);
          return res.status(200).send("psychomotor Changed");
        }
      );
    } else {
      // meaning there are no matches
      teacher.addPsychomotorResult(data, (err, results) => {
        if (err) return res.sendStatus(400);
        return res.status(200).send("new changes added Successfully");
      });
    }
  });
};
teacherCtrl.getAffectiveReport = (req,res)=>{
  teacher.getAffectiveReport((err,results)=>{
    if (err){console.log(err); return res.sendStatus(400)};
    return res.status(200).send(results);
  })
}
teacherCtrl.getAffectiveReportResults = (req,res)=>{
  const student_id = req.query.student_id;
  const session_id = req.query.session_id;
  teacher.getAffectiveReportResults([student_id,session_id],(err,results)=>{
    if (err){console.log(err); return res.sendStatus(400)};
    return res.status(200).send(results);
  })
}
teacherCtrl.manageAffectiveReportResults = (req,res)=>{
  const student_id = req.query.student_id;
  const affective_report_id = req.query.affective_report_id
  const result = req.query.result
  const session_id = req.query.session_id
  const findArray = [student_id,affective_report_id,session_id]
  const data = {student_id:student_id,affective_report_id:affective_report_id,result:result,session_id:session_id}
  teacher.findAffectiveReport(findArray,(err,results)=>{
    if(err)return res.sendStatus(400)
    if(results.length){
      // meaning there is a match
      teacher.updateAffectiveReportResult(results[0].id,{result:result},(err,results)=>{
        if(err)return res.sendStatus(400);
        return res.status(200).send("done")
      })
    }else{
      // meaning there arent match records
      teacher.addAffectiveReportResult(data,(err,results)=>{
        if (err) return res.sendStatus(400);
        return res.status(200).send("new changes added Successfully");
      })
    }
  })
}
teacherCtrl.getStudentComment = (req,res)=>{
  const teacher_id = req.query.teacher_id
  const student_id = req.query.student_id
  const session_id = req.query.session_id
  const term_id = req.query.term_id
  const data = {teacher_id:teacher_id,student_id:student_id,session_id:session_id,term_id:term_id}
  teacher.getStudentComment([teacher_id,student_id,session_id,term_id],(err,results)=>{
    if(err)return res.sendStatus(400);
    return res.status(200).send(results)
  })
}
teacherCtrl.manageStudentComment = (req,res)=>{
  const teacher_id = req.query.teacher_id
  const student_id = req.query.student_id
  const session_id = req.query.session_id
  const term_id = req.query.term_id
  const comment = req.query.comment
  const data = {teacher_id:teacher_id,comment:comment,student_id:student_id,session_id:session_id,term_id:term_id}
  teacher.getStudentComment([teacher_id,student_id,session_id,term_id],(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)};
    if(results.length){
      // meaning there is a record update instead
      teacher.updateStudentComment(results[0].id,data,(err,results)=>{
        if(err)return res.sendStatus(400)
        return res.status(200).send("update successfull")
      })
    }else{
      // meaning there is no record add new 
      teacher.addStudentComment(data,(err,results)=>{
        if(err){console.log(err); return res.sendStatus(400)}
        return res.status(200).send("Student comment successfull")
      })
    }
  })
}
teacherCtrl.getClassNotice = (req,res) => {
  const session_id = req.query.session_id
  const term_id = req.query.term_id
  const class_id = req.query.class_id
  const _array = [session_id,term_id,class_id]
  teacher.getClassNotice(_array,(err,results)=>{
    if(err)return res.sendStatus(400)
    return res.status(200).send(results)
  })
}
teacherCtrl.addNotice = (req,res)=>{
  const data = req.body
  teacher.addNotice(data,(err,results)=>{
    if(err)return res.sendStatus(400)
    return res.status(200).send(results)
  })
}
teacherCtrl.updateNotice = (req,res)=>{
  const id = req.params.id
  const data = req.body
  teacher.updateNotice(id,data,(err,results)=>{
    if(err)return res.sendStatus(400)
    return res.status(200).send("Success!")
  })
}
teacherCtrl.removeNotice = (req,res)=>{
  const id = req.params.id
  teacher.removeNotice(id,(err,results)=>{
    if(err)return res.sendStatus(400)
    return res.status(200).send("Success!")
  })
}
teacherCtrl.getTeacherSubjects = (req,res)=>{
  const id = req.params.id
  teacher.getTeacherSubjects(id,(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)
  })
}
teacherCtrl.getHomework = (req,res)=>{
  const teacher_id = req.query.teacher_id
  const subject_id = req.query.subject_id
  const session_id = req.query.session_id
  const term_id = req.query.term_id
  const array = [teacher_id,subject_id,session_id,term_id]
  teacher.getHomework(array,(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)
  })
}
teacherCtrl.getHomeworkSubmission = (req,res)=>{
  const homework_id = req.query.homework_id
  teacher.getHomeworkSubmission([homework_id],(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)    
  })
}
teacherCtrl.addHomework = (req,res)=>{
  const title = req.query.title
  const question_type= req.query.question_type
  const notes  = req.query.notes
  const date_due = req.query.date_due
  const teacher_id = req.query.teacher_id
  const subject_id = req.query.subject_id
  const class_id = req.query.class_id
  const resource_link = req.file?req.file.filename:""
  const session_id = req.query.session_id
  const term_id = req.query.term_id
  const data = {title:title,question_type:question_type,notes:notes,date_due:date_due,teacher_id:teacher_id,subject_id:subject_id,class_id:class_id,session_id:session_id,term_id:term_id};
  const newData = {...data,resource_link:resource_link}
  teacher.addHomework(newData,(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)    
  })
}
teacherCtrl.editHomework = (req,res)=>{
  const homework_id = req.params.id
  const title = req.query.title
  const notes  = req.query.notes
  const date_due = req.query.date_due
  const data = {title:title,notes:notes,date_due:date_due};
  const newData = {...data, ...(req.file && {resource_link:req.file.filename})}
  teacher.editHomework(homework_id,newData,(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)
  })
}
teacherCtrl.removeHomework = (req,res)=>{
  const homework_id = req.params.id
  teacher.removeHomework(homework_id,(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)
  })
}
teacherCtrl.getSubjectResource = (req,res)=>{
  const teacher_id = req.params.id
  const session_id = req.query.session_id
  const term_id = req.query.term_id
  const class_id = req.query.class_id
  const data = [session_id,term_id,class_id]
  teacher.getSubjectResource(teacher_id,data,(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)
  })
},
teacherCtrl.getSubjectGrades = (req,res)=>{
  const subject_id = req.query.subject_id
  const assessment_type_id = req.query.assessment_type_id
  const session_id = req.query.session_id
  const term_id = req.query.term_id
  const data = [subject_id,assessment_type_id,session_id,term_id]
  teacher.getSubjectGrades(data,(err,results)=>{
    if(err){console.log(err); return res.sendStatus(400)}
    return res.status(200).send(results)  
  })

}
export default teacherCtrl;
