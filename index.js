// import express
import express from "express";
import cors from "cors";
import studentRoute from './routes/student.js'
import routes from "./routes/routes.js";
import flash from 'connect-flash'
import session from 'express-session'
import passport from "passport";
const app = express();
app.use(session({
    secret:'akejicneknf893inefnj3loijenmfnkfenf',
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/student',studentRoute) 
app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(5000, () => console.log('Server running at http://localhost:5000'));