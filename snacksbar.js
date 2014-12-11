if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Menus = new Mongo.Collection('menu');


if(Meteor.isClient){
  
  Template.body.helpers({
    menuItems : function(){
      return Menus.find({});
    }
  });

  Template.body.events({
    "submit .add_menu": function (event) {
      
      var menu_name = event.target.menu_name.value;
      var menu_value = event.target.menu_value.value;

      Menus.insert({
        name : menu_name,
        value : menu_value,
        createdAt : new Date()
      });

      event.target.menu_name.value = "";
      event.target.menu_value.value = "";

      return false;
    }
  });


}