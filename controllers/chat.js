import chat from "../models/chat.js"

const chatCtrl = {}
chatCtrl.searchUser = (req,res)=>{
    const type = req.params.type
    const user_id = req.query.user_id
    const keyword = req.query.keyword
    chat.searchUser(user_id,type,keyword,(err,results)=>{
        if(err)return res.sendStatus(400);
        return res.status(200).send(results)
    })
}
chatCtrl.initThread = (req,res)=>{
    const sender_id = req.query.sender_id
    const receiver_id = req.query.receiver_id
    const data = [sender_id,receiver_id]
    const users = {sender_id:sender_id,receiver_id:receiver_id}
    chat.findThread(data,(err,results)=>{
        if(err)return res.sendStatus(400);
        if(!results.length){
            // meaning there is not a thread already, create one and return the thread_id
            chat.newThread(users,(err,results)=>{
                if(err)return res.sendStatus(400);
                const thread_id = results.insertId
                return res.status(200).send({thread_id:thread_id})
            })
            return;
        }
        // else meaning there is already a thread started return the thread data
        const thread_id = results
        return res.status(200).send({thread_id:thread_id[0].thread_id})
    })
}
chatCtrl.getThreadMessages = (req,res)=>{
    const thread_id = req.params.id
    const limit = req.query.limit || 20
    const offset = req.query.offset || 0
    const options = [Number(limit), Number(offset)]
    chat.getThreadMessages(thread_id,options,(err,results)=>{
        if(err){console.log(err); return res.sendStatus(400);}
        return res.status(200).send(results)
    })
}
chatCtrl.newMessage = (req,res)=>{
    const user_id = req.query.user_id
    const thread_id = req.query.thread_id
    const type = req.query.type
    const content = req.query.content
    const info = {user_id:user_id,thread_id:thread_id,type:type,content:content}
    const data = {
        ...info,
        ...(req.file && {
            attachment_type: req.file.mimetype.split("/")[0],
            attachment_name: req.file.filename})
    }
    chat.newMessage(data,(err,results)=>{
        if(err){console.log(err); return res.sendStatus(400);}
        return res.status(200).send(results)
    })
}
chatCtrl.getContactList = (req,res)=>{
    const user_id = req.params.id 
    chat.getContactList(user_id,(err,results)=>{
        if(err){ return res.sendStatus(400);}
        return res.status(200).send(results)
    })
}
chatCtrl.deleteMessage = (req,res)=>{
    const msg_id = req.params.id
    chat.deleteMessage(msg_id,(err,results)=>{
        if(err){ return res.sendStatus(400);}
        return res.status(200).send(results)
    })
}
export default chatCtrl