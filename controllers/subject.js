import subject from "../models/subject.js"

const subjectCtrl = {}
subjectCtrl.getSubjectByClass = (req,res)=>{
    const class_id = req.params.id
    subject.getSubjectByClass(class_id,(err,results)=>{
        if(err){
            console.log(err)
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}
export default subjectCtrl