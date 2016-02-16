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
      // Retrieve all users
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        reply.view('index').code(200);
      }
    },
    {
      // Retrieve all doughnuts
      method: 'GET',
      path: '/doughnuts',
      handler: function(request, reply) {
        reply.view('doughnuts').code(200);
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'static-files-api',
  version: '0.0.1'
};