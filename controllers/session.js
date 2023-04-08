import session from "../models/session.js";

const sessionCtrl = {}
sessionCtrl.getActiveSession =(req,res)=>{
    session.getActiveSession((err,results)=>{
        if(err){
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}
export default sessionCtrl;