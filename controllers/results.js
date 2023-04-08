import result from "../models/results.js"

const resultCtrl = {}
resultCtrl.getResultsByStudentId =(req,res)=>{
    const id = req.params.id
    result.getResultsByStudentId(id,(err,results)=>{
        if(err){
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}
export default resultCtrl