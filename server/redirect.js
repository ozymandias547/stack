WebApp.connectHandlers.use(function(req, res, next) {

	/* Check if request is for non-www address */
	var url = req.headers.referer ? req.headers.referer : req.headers.host;
	var domain = 'onmystack';

	if (url.indexOf(domain) != -1 && url.indexOf('www') == -1) {
		var redirectURL = url.replace(domain, 'www.' + domain);
		var redirectURL = redirectURL.indexOf('http://') == -1 ? 'http://' + redirectURL : redirectURL;

		// Example redirect:
		//
		// HTTP/1.1 301 Moved Permanently
		// Location: http://www.example.org/
		// Content-Type: text/html
		// Content-Length: 174

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