const express = require("express");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router();
const User = require('../models/user')

function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl,
    };
}

passport.use(new GoogleStrategy({
        clientID: "756664460961-a0n0c9h1nt93ui8njpovgdeu58blpo34.apps.googleusercontent.com",
        clientSecret: "sez0TEOPP_SK171JhsI9oChA",
        callbackURL: "/auth/google/callback "
}, function (accessToken, refreshToken, profile, done) {
    console.log("-----------------------------------")
    console.log(profile)
    console.log("-----------------------------------------")
    if (profile) {
        User.upsert({
            userId: profile.id,
            username: profile.displayName
        }).then(() => {
            return 	done(null, profile);
        }).catch(() => {
            console.log("プロフィールエラーー！！！！！")
            return done(null, profile);
        })
    }else {
        return done(null, false);
    }
}));


router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect("/");
});
module.exports = router;

