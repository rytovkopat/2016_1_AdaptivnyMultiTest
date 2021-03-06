define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/signup');
        var user = require('models/User');
        var BackboneValidation = require('backbone_validation');

        var View = Backbone.View.extend({
            template: tmpl,
            //model: new user(),
            events: {
                 'click button#signupTologin': 'toLogin',
                 'click button#submitSignup': 'handleSubmit'
            },
            initialize: function() {
                this.render();
                Backbone.Validation.bind(this, {invalid: function(view, attr, error, selector) {
                        alert(error);
                    }
                });
            },
            render: function () {
                this.$el.html(this.template());
            },
            toLogin: function(e) {
                e.preventDefault();
                window.location.hash = "main";
            },
            handleSubmit: function(e) {
                e.preventDefault();
                this.model.set({
                    login : $( ":text" ).val(),
                    email : $( ":text" ).val(),
                    password : $( ":password" ).val()
                });
                if( this.model.isValid(['login', 'email', 'password']) ) {
                    //e.currentTarget.submit();
                    this.model.sendLogin();
                } else {
                    this.model.destroy();
                }
            }
        });
        return new View();
    }
);

