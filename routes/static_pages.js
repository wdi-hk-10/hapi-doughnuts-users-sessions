exports.register = function (server, options, next) {
  // serving static files
  server.route([
    {
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
        reply.view('index');
      }
    },
    {
      // Retrieve all doughnuts
      method: 'GET',
      path: '/doughnuts',
      handler: function(request, reply) {
        reply.view('doughnuts');
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'static-files-api',
  version: '0.0.1'
};