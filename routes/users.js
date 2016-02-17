// Every page that involves doughnuts
var Auth = require('./api/auth');

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'GET',
      path: '/users/{username}',
      handler: function(request, reply) {
        Auth.authenticated(request, function (result) {
          if (result.authenticated){
            var db = request.server.plugins['hapi-mongodb'].db;
            var username = request.params.username;
            var session  = request.yar.get('hapi_doughnuts_session');

            var user_id = session.user_id;

            db.collection('users').findOne({username: username}, function (err, user) {
              if (err) { return reply(err).code(400); }

              if (user === null){
                return reply.view('user', {user: null, message: "No such user"});
              }

              if (user_id === user._id) {
                reply.view('user', {user: user}).code(200);
              } else {
                reply.view('user', {user: null, message: "You do not have access"});
              }
            });
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
  name: 'users-view',
  version: '0.0.1'
};