import passport from 'passport';
import JwtCookieComboStrategy from 'passport-jwt-cookiecombo';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new JwtCookieComboStrategy({
  secretOrPublicKey: process.env.JWT_SECRET,
  jwtCookieName: 'jwt'
}, (payload, done) => {
  return done(null, payload.user);
}));

export default passport;
