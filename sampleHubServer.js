const http = require('http')
const URL = require('url').URL

http.createServer( function(req, res) {
	const requestUrl = new URL(`http://${req.url}`)
	const callback = decodeURIComponent(requestUrl.searchParams.get('callback'))
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(`
		<h1>Send SAML Response to application</h1>
		<form method='post' action='${callback}'>
			<button>Submit</button>
		</form>`);
	res.end()
}).listen(3001);