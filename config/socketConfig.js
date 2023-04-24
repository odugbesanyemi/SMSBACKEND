import { Server } from "socket.io";
import User from "../models/user.js";
import chatCtrl from "../controllers/chat.js";
import chat from "../models/chat.js";
const socketEvents = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
//   the io connection
  io.on("connection", (socket) => {
    socket.on("loggedIn", user_id => {
      User.updateUser(user_id,{ online_status: 1, last_seen: new Date(),chat_id:socket.id },
        (err, results) => {
          if (err) {
            socket.emit("isLoggedIn", "failed");
            return;
          }
          socket.emit("isLoggedIn", socket.id);
        }
      );
        
    });

    // Handle socket events here
    socket.on('joinRoom',(data)=>{
        socket.join(`thread_${data}`)

        socket.on('sendMessage',(data)=>{
            // broadcast message to users in this thread
            socket.to(`thread_${data}`).emit('newMessage',socket.id)
        })
    })

    socket.on('disconnecting',(user_id)=>{
    })

    // handle disconnection
  socket.on("disconnect", ( user_id,)=> {
    socket.on('logout',user_id =>{
    })
    });
  });


};

export default socketEvents;
