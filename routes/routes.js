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
import{upload} from '../config/multer.js'
import chatCtrl from '../controllers/chat.js';
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
router.get('/class-students/:id',teacherCtrl.getClassStudents)
router.get('/class-attendance',teacherCtrl.getClassAttendanceByDate)
router.post('/new-attendance',teacherCtrl.addClassAttendance)
router.get('/report-attendance',teacherCtrl.getClassAttendanceReport)
router.post('/new-class-resource',upload.single('file'),teacherCtrl.addClassResource)
router.post('/edit-class-resource/:resource_id',upload.single('file'),teacherCtrl.editClassResource)
router.post('/delete-class-resource/:resource_id',teacherCtrl.removeClassResource)
router.get('/class-results',teacherCtrl.getClassResults)
router.get('/class-subjects',teacherCtrl.getClassSubjects)
router.get('/level-assessment-type',teacherCtrl.getAssessmentType)
router.get("/manage-scores",teacherCtrl.ManageScore)
router.post('/update-score/:id',teacherCtrl.editScore)
router.get("/level-psychomotor",teacherCtrl.getPsychomotor)
router.get("/student-psychomotor-results",teacherCtrl.getPsychomotorResults)
router.get('/manage-psychomotor-results',teacherCtrl.managePsychomotorResults)
router.get('/affective-report',teacherCtrl.getAffectiveReport)
router.get('/student-affective-report',teacherCtrl.getAffectiveReportResults)
router.get('/manage-affective-report-results',teacherCtrl.manageAffectiveReportResults);
router.get('/student-comment',teacherCtrl.getStudentComment)
router.get('/manage-student-comment',teacherCtrl.manageStudentComment)
router.get('/class-notice',teacherCtrl.getClassNotice)
router.post('/noticeboard-new',teacherCtrl.addNotice)
router.post('/noticeboard-update/:id',teacherCtrl.updateNotice)
router.post('/noticeboard-remove/:id',teacherCtrl.removeNotice)
router.get('/teacher-subjects/:id',teacherCtrl.getTeacherSubjects)
router.get('/subject-homework',teacherCtrl.getHomework)
router.get('/homework-submission',teacherCtrl.getHomeworkSubmission)
router.post('/new-homework',upload.single('file'),teacherCtrl.addHomework)
router.post('/edit-homework/:id',upload.single('file'),teacherCtrl.editHomework)
router.get('/homework-remove/:id',teacherCtrl.removeHomework)
router.get('/subject-resources/:id',teacherCtrl.getSubjectResource)
router.get('/subject-grades',teacherCtrl.getSubjectGrades)
router.get('/search-user/:type',chatCtrl.searchUser)
router.get('/init-message-thread',chatCtrl.initThread)
router.get('/thread-messages/:id',chatCtrl.getThreadMessages)
router.post('/new-message',upload.single('file'), chatCtrl.newMessage) 
router.get('/chat-contact-list/:id',chatCtrl.getContactList)
router.get('/user-data/:id',userController.findUserData)
router.get('/delete-message/:id',chatCtrl.deleteMessage)
export default router 

