"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPassportStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const user_1 = require("../src/features/user");
const options = {
    jwt: {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ["user:email"],
    },
};
const applyPassportStrategy = (passport) => {
    // ****** JWT Strategy *******
    passport.use(new passport_jwt_1.Strategy(options.jwt, (jwtToken, done) => {
        user_1.User.findOne({ email: jwtToken.email }, (err, user) => {
            if (err)
                return done(err, false);
            if (user)
                return done(undefined, user, jwtToken);
            return done(undefined, false);
        });
    }));
    // ****** GOOGLE Strategy *******
    passport.use(new passport_google_oauth20_1.Strategy(options.google, (accessToken, refreshToken, profile, done) => {
        var _a;
        user_1.User.findOne({
            $or: [
                { "google.id": profile.id },
                { email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value },
            ],
        }, (err, user) => {
            var _a, _b, _c;
            if (err)
                return done(err, undefined);
            if (user)
                return done(null, user);
            if (!user) {
                let newUser = new user_1.User();
                newUser.google.id = profile.id;
                newUser.google.email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
                newUser.email = (_b = profile.emails) === null || _b === void 0 ? void 0 : _b[0].value;
                newUser.avatar = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0].value;
                newUser.save((err) => err && done(err, undefined));
                return done(null, newUser);
            }
        });
    }));
    // ****** GITHUB Strategy *******
    passport.use(new passport_github2_1.Strategy(options.github, (accessToken, refreshToken, profile, done) => {
        var _a;
        user_1.User.findOne({
            $or: [
                { "github.id": profile.id },
                { email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value },
            ],
        }, (err, user) => {
            var _a, _b, _c;
            if (err)
                return done(err, undefined);
            if (user)
                return done(null, user);
            if (!user) {
                let newUser = new user_1.User();
                newUser.github.id = profile.id;
                newUser.github.email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
                newUser.email = (_b = profile.emails) === null || _b === void 0 ? void 0 : _b[0].value;
                newUser.avatar = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0].value;
                newUser.save((err) => err && done(err, undefined));
                return done(null, newUser);
            }
        });
    }));
};
exports.applyPassportStrategy = applyPassportStrategy;
