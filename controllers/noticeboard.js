import noticeboard from "../models/noticeboard.js"

const noticeboardCtrl = {}
noticeboardCtrl.getNotificationByClassCtrl = (req,res)=>{
    const session_id = req.query.session_id
    const term_id = req.query.term_id
    const class_id = req.query.class_id
    noticeboard.getNotificationByClass([session_id,term_id,class_id],(err,results)=>{
        if(err){
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}

export default noticeboardCtrl