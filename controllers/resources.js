
import resources from '../models/resources.js'
const resourcesCtrl = {}

resourcesCtrl.getResourcesBySessionTermClass = (req,res)=>{
    const session_id = req.query.session_id
    const term_id = req.query.term_id
    const class_id = req.query.class_id
    resources.getResourcesBySessionTermClass([session_id,term_id,class_id],(err,results)=>{
        if(err){
            return res.sendStatus(400)
        }
        return res.status(200).send(results)
    })
}

export default resourcesCtrl