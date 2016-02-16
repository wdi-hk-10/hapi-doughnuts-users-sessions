$(document).ready(function () {
  var bindSignup = function () {
    $('#signup').on('submit', function (e) {
      e.preventDefault();
      $('#signup-form-message').text('');

      var user = {
        email   : $('#signup [name="email"]').val(),
        name    : $('#signup [name="name"]').val(),
        username: $('#signup [name="username"]').val(),
        password: $('#signup [name="password"]').val()
      };

      // do validation here. only continue if validation pass

      $.ajax({
        type: "POST",
        url: '/api/users',
        data: user,
        success: function (response) {
          $('#signup-form-message').text("Created User. Please Signin");

          $('#signup [name="email"]').val('');
          $('#signup [name="name"]').val('');
          $('#signup [name="username"]').val('');
          $('#signup [name="password"]').val('');
        },
        error: function (response) {
          var text = response.responseJSON ? response.responseJSON.message : response.responseText;
          $('#signup-form-message').text(text);
        }
      });
    });
  };

  var bindSignin = function () {
    $('#signin').on('submit', function (e) {
      e.preventDefault();

      var user = {
        username: $('#signin [name="username"]').val(),
        password: $('#signin [name="password"]').val()
      };

      $.ajax({
        type: "POST",
        url: "/api/sessions",
        data: user,
        success: function(response){
          window.location.href = "/doughnuts";
        },
        error: function(response){
          console.log(response);
        }
      });
    });
  };

  var init = function () {
    bindSignup();
    bindSignin();
  };

  init();
});
