// static pages is static views such as home, about, contact..etc
var Auth = require('./api/auth');

exports.register = function (server, options, next) {
  server.route([
    {
      // serving static files
      method: 'GET',
      path: "/public/{path*}",
      handler: {
        directory: {
          path: 'public'
        }
      }
    },
    {
      // Login Page
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        Auth.authenticated(request, function (result) {
          if (result.authenticated){
            reply.redirect('/doughnuts').code(307);
          } else {
            reply.view('index', {message: request.query.message}).code(200);
          }
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'static-files-api',
  version: '0.0.1'
};