import User from "../models/user.js";
import bcrypt from "bcrypt";
const userController = {};
userController.createUserCtrl = (req, res) => {
  const data = req.body;
  // find userFirst
  User.findByEmail(data.email, (err, results) => {
    if (err) {
      return res.sendStatus(400);
    }
    if (results.length) {
      return res.status(403).send("Email has already been used");
    }
    // else if (!results.length)
    User.findByUsername(data.username, (err, results) => {
      if (err) {
        return res.sendStatus(400);
      }
      if (results.length) {
        return res.status(403).send("Username has been taken");
      }
      // else if (!results.length)
      // continue as username too doenst exists
      const hashed_password = bcrypt.hashSync(data.password, 10);
      const userData = { ...data, password: hashed_password };
      User.createUser(userData, (err, results) => {
        if (err) {
          return res
            .status(402)
            .send("Error adding new User. please contact admin");
        }
        return res.status(200).send("success!");
      });
      return res.status(200).send("success");
    });
  });
};

userController.updateUser = (req,res)=>{
  const user_id = req.params.id
  const data = req.body
  User.updateUser(user_id,data,(err,results)=>{
    if(err){return res.sendStatus(400)}
    return res.status(200).send(results)
  })
}

userController.findUserData = (req,res)=>{
  const user_id = req.params.id
  User.getUserById(user_id,(err,results)=>{
    if(err){return res.sendStatus(400)}
    const userId = user_id
    const accType = results[0].account_type
    User.findUserData(userId,accType,(err,results)=>{
      if(err){return res.sendStatus(400)}
      return res.status(200).send(results)
    })
  })
}

export default userController;
