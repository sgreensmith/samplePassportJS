const Authenticate = {

    authenticate: (callbackUrl) => {
    	return (req, res) => {
			req.res.send(`
				<h1>Send SAML Authn request to hub</h1>
				<form method='post' action='http://localhost:3001/authenticate?callback=${encodeURIComponent(callbackUrl)}'>
					<button>Submit</button>
				</form>`)
		}
    },

    callback: (req) => {
      // figure out saml
      return new Promise((resolve, reject) => {
        resolve({username: 'bob'})
        // or reject('blah')
      })
    }

}

module.exports = Authenticate