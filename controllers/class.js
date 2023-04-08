import classes from "../models/class.js"

const classesCtrl = {}
classesCtrl.getClassById = (req,res)=>{
    const id = req.params.id
    classes.getClassById(id,(err,results)=>{
        if(err){
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}
export default classesCtrl 