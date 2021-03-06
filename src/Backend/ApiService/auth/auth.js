function requireAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ description: "Authentication Error" });
	}
}

function requireGuest(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ description: "Authentication Error" });
	}
}

module.exports = {
	requireAuth,
	requireGuest
}
