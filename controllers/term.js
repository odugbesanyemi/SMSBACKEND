import term from "../models/term.js";

const termCtrl = {}
termCtrl.getActiveTerm =(req,res)=>{
    term.getActiveTerm((err,results)=>{
        if(err){
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}
export default termCtrl;