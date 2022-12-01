const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL:
					'https://discord-clone-backend.up.railway.app/auth/google/callback',
			},
			async (accessToken, refreshToken, profile, done) => {
				done(null, profile);
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});
};
