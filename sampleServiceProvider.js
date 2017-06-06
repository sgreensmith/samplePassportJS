const http = require('http')
const URL = require('url').URL

http.createServer( function(req, res) {
	if (req.url == '/authn-request') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({
			saml: 'some-saml'
		}))
		res.end()
	} else if (req.url == '/authn-response') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({
			name: 'gertrude'
		}))
		res.end()
	}
}).listen(3002);