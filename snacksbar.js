if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

Menus = new Mongo.Collection('menu');
AdminUser = new Mongo.Collection('admin_user');
SelectedMenu = new Mongo.Collection('selected_menu');

if (Meteor.isClient) {

    Meteor.startup(function() {
        Hooks.init();

        // Meteor.Router.add({
        //     '/': 'loginTemplate',
        //     '/insertMenu': 'insertMenu',
        //     '/showMenu': 'showMenu'
        // });
    });

    Router.route('/', function() {
        this.layout('ApplicationLayout');
        this.render('LoginTemplate');
    });

    Template.LoginTemplate.events({
        "submit .login": function(event) {

            var userText = event.target.username.value;
            var passwordText = event.target.password.value;

            user = AdminUser.find({ 
                username: userText,
                password: passwordText
            }).fetch();

            if(user != null){
                Session.set('userId', user[0]._id);
                Session.set('role', user[0].role);
                Router.go('insertMenu');                
            }else{
                alert("Invalid username and password");
            }
            return false;
        }
    });    

    Hooks.onLoggedIn = function() {
        Session.set('userId', Meteor.userId());
        Router.go('insertMenu');
    }

    Hooks.onLoggedOut = function(){
        Session.keys = {};
        Router.go('/');
    }

}