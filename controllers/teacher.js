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
    if (err) {console.log(err); return res.sendStatus(400);}
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
      if (err){console.log(err); return res.sendStatus(400)};
      return res.status(200).send(results);
    }
  );
};
teacherCtrl.addClassAttendance = (req, res) => {
  const data = req.body;
  // first check if the data exists?
  teacher.checkStudentAttendance(
    [data.session_id, data.term_id,data.class_id, data.student_id, data.date],
    (err, results) => {
      if (err) {console.log(err); return res.sendStatus(400)};
      if (results.length) {
        teacher.updateClassAttendance(data, (err, results) => {
          if (err){console.log(err); return res.sendStatus(400);}
          return res.status(200).send("Attendance Updated Successfully");
        });
      } else {
        // otherwise meaning there was not data so we are adding afresh
        let {id, ...newOjbect}=data
        teacher.addClassAttendance(newOjbect, (err, results) => {
          if (err){console.log(err); return res.sendStatus(400);}
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
        if (err){console.log(err); return res.sendStatus(400)};
        return res.status(200).send(results);
      }
    );
  };
export default teacherCtrl;
