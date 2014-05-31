WebApp.connectHandlers.use(function(req, res, next) {

	/* Check if request is for non-www address */
	var url = req.headers.referer ? req.headers.referer : req.headers.host;
	var domain = 'onmystack';

	if (url.indexOf(domain) != -1 && url.indexOf('www') == -1) {
		var redirectURL = url.replace(domain, 'www.' + domain);

		/* Redirect to the proper address */
		res.writeHead(301, {
			'Content - Type': 'text/html; charset=UTF-8',
			Location: redirectURL
		});

		res.end("Moved to: " + redirectURL);

		return;
	}

	/* Did not redirect - continue with the application stack */

	next();
});