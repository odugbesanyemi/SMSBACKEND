import student from "../models/student.js";

const studentCtrl = {}

studentCtrl.getRecords = (req,res)=>{
    const user_id = req.params.id
    student.getRecords(user_id,(err,results)=>{
        if(err){
            return res.status(403).send("could't complete request")
        }
        return res.status(200).send(results)
    })
}

export default studentCtrl;