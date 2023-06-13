import { PassportStatic } from "passport";
import { VerifyCallback } from "passport-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { User, UserDocument } from "@/features/user";

const options = {
  jwt: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },

  google: {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
  },

  github: {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: process.env.GITHUB_CALLBACK_URL as string,
    scope: ["user:email"],
  },
};

export const applyPassportStrategy = (passport: PassportStatic) => {
  // ****** JWT Strategy *******
  passport.use(
    new JwtStrategy(options.jwt, (jwtToken, done) => {
      User.findOne<UserDocument>(
        { email: jwtToken.email },
        (err: unknown, user: UserDocument) => {
          if (err) return done(err, false);

          if (user) return done(undefined, user, jwtToken);

          return done(undefined, false);
        }
      );
    })
  );
  // ****** GOOGLE Strategy *******
  passport.use(
    new GoogleStrategy(
      options.google,
      (accessToken, refreshToken, profile, done) => {
        User.findOne<UserDocument>(
          {
            $or: [
              { "google.id": profile.id },
              { email: profile.emails?.[0].value },
            ],
          },
          (err: Error, user: UserDocument) => {
            if (err) return done(err, undefined);

            if (user) return done(null, user);

            if (!user) {
              let newUser = new User();
              newUser.google!.id = profile.id;
              newUser.google!.email = profile.emails?.[0].value as string;
              newUser.email = profile.emails?.[0].value as string;
              newUser.avatar = profile.photos?.[0].value as string;

              newUser.save((err) => err && done(err, undefined));
              return done(null, newUser);
            }
          }
        );
      }
    )
  );

  // ****** GITHUB Strategy *******
  passport.use(
    new GithubStrategy(
      options.github,
      (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
      ) => {
        User.findOne<UserDocument>(
          {
            $or: [
              { "github.id": profile.id },
              { email: profile.emails?.[0].value },
            ],
          },
          (err: Error, user: UserDocument) => {
            if (err) return done(err, undefined);

            if (user) return done(null, user);

            if (!user) {
              let newUser = new User();
              newUser.github!.id = profile.id;
              newUser.github!.email = profile.emails?.[0].value;
              newUser.email = profile.emails?.[0].value as string;
              newUser.avatar = profile.photos?.[0].value;

              newUser.save((err) => err && done(err, undefined));

              return done(null, newUser);
            }
          }
        );
      }
    )
  );
};
