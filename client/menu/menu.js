if (Meteor.isClient) {

	Router.route('/insertMenu', function() {
        if(Session.get('userId') == null)
        {
            Router.go('/');
        }
        else
        {
        	this.layout('ApplicationLayout');
            this.render('InsertMenu');
            this.render('RenderMenuItem', {
            		to: 'menu_item', 
            		data : {
            			menuItems : Menus.find({}).fetch()
            		} 
            });
            this.render('Footer', {to : 'footer'});
        }
    });


    Template.InsertMenu.helpers({
        accountGoogle: function () {
            if(Session.get('role') == null)
            {
                return true;
            }else{
                return false;
            }
        },

        loggedIn: function(){
            if(Session.get('role') != null && Session.get('role') == 'admin')
            {
                return true;
            }else{
                return false;
            }
        }
    });


    Template.InsertMenu.events({
        "submit .add_menu": function(event) {

            var menu_name = event.target.menu_name.value;
            var menu_value = event.target.menu_value.value;

            Menus.insert({
                name: menu_name,
                value: menu_value,
                createdAt: new Date()
            });

            event.target.menu_name.value = "";
            event.target.menu_value.value = "";

            return false;
        }
    });

    Template.WSLogout.events({
        "click .logout": function(event) {
            Session.keys = {};
            Router.go('/');
        }
    });

}