const express = require("express")
const session = require("express-session")
const passport = require("passport")
const app = express()
app.set("view engine", "ejs");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "606126290429-3lf01flev6ch7cebphjplf8eks91osrr.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    res.redirect("/success");
  }
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT || 8080, (req, res) => {
  console.log("server started");
});
