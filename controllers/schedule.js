import schedule from "../models/schedule.js"
const scheduleCtrl = {}
scheduleCtrl.getSchedule = (req,res)=>{
    schedule.getSchedule((err,results)=>{
        if(err){
            return res.status(402).send('Error getting Schedule')
        }
        return res.status(200).send(results)
    })
}
scheduleCtrl.getScheduleByClass = (req,res)=>{
    const class_id = req.params.id
    schedule.getScheduleByClass(class_id,(err,results)=>{
        if(err){
            return res.status(402).send('Error getting Schedule')
        }
        return res.status(200).send(results)
    })
}
export default scheduleCtrl