import express from 'express'
import passport from 'passport'
import assignmentCtrl from '../controllers/assignment.js';
import authController from '../controllers/authController.js'
import classesCtrl from '../controllers/class.js';
import noticeboardCtrl from '../controllers/noticeboard.js';
import resourcesCtrl from '../controllers/resources.js';
import resultCtrl from '../controllers/results.js';
import scheduleCtrl from '../controllers/schedule.js';
import sessionCtrl from '../controllers/session.js';
import studentCtrl from '../controllers/student.js';
import subjectCtrl from '../controllers/subject.js';
import teacherCtrl from '../controllers/teacher.js';
import termCtrl from '../controllers/term.js';
import userController from '../controllers/userController.js';
const router = express.Router()

router.post('/login',authController.processLogin);
router.post('/new-user',userController.createUserCtrl)
router.get('/schedule',scheduleCtrl.getSchedule)
router.get('/schedule/:id',scheduleCtrl.getScheduleByClass)
router.get('/student/:id',studentCtrl.getRecords)
router.get('/active-session',sessionCtrl.getActiveSession)
router.get('/active-term',termCtrl.getActiveTerm)
router.get('/homework/:id',assignmentCtrl.getAssignmentByClass)
router.get('/class-resources',resourcesCtrl.getResourcesBySessionTermClass)
router.get('/class-notification',noticeboardCtrl.getNotificationByClassCtrl)
router.get('/class-subjects/:id',subjectCtrl.getSubjectByClass)
router.get('/class/:id',classesCtrl.getClassById)
router.get('/results/:id',resultCtrl.getResultsByStudentId)
router.get('/teacher/:id',teacherCtrl.getRecords)
router.get('/teacher-class/:id',teacherCtrl.getClass)
router.get('/teacher-subjects/:id',teacherCtrl.getSubjects)
router.get('/class-students/:id',teacherCtrl.getClassStudents)
router.get('/class-attendance',teacherCtrl.getClassAttendanceByDate)
router.post('/new-attendance',teacherCtrl.addClassAttendance)
router.get('/report-attendance',teacherCtrl.getClassAttendanceReport)
export default router