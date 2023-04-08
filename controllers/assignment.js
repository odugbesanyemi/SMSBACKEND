import assignment from "../models/assignment.js";

const assignmentCtrl = {}
assignmentCtrl.getAssignmentByClass = (req,res)=>{
    const class_id = req.params.id
    assignment.getAssignmentByClass(class_id,(err,results)=>{
        if(err){
            console.log(err)
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}
export default assignmentCtrl;