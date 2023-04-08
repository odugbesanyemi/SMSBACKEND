import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import User  from '../models/user.js'

passport.use(new LocalStrategy(async function(username, password, done) {
  User.findByUsername(username,(err,results)=>{
    if (!results[0]) {
      console.log('user not found')
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!bcrypt.compareSync(password, results[0].password)) {
      console.log('passwords don"t match')
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, results[0]);

  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  const user = rows[0];
  done(null, user);
});

export default passport;