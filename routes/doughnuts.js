// Every page that involves doughnuts
var Auth = require('./api/auth');

exports.register = function (server, options, next) {
  server.route([
    {
      // Retrieve all doughnuts
      method: 'GET',
      path: '/doughnuts',
      handler: function(request, reply) {
        Auth.authenticated(request, function (result) {
          if (result.authenticated){
            reply.view('doughnuts').code(200);
          } else {
            reply.redirect('/?message=Please Signin First').code(307);
          }
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'doughnuts-view',
  version: '0.0.1'
};