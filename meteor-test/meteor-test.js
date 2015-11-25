if (Meteor.isClient) {
  Template.header.events({
    'click .item': function(event, template) {
      $('.item').removeClass('active');
      var selectedMenuItem = event.currentTarget;
      selectedMenuItem.classList.add('active');
    }
  });


  Template.modal.events({
    'click .ui.primary.button': function(event, template) {
      $('.ui.modal').modal('show');
      this.preventDefault();
    }
  });

  Template.dropdown.rendered = function(){
    $('.ui.dropdown').dropdown(); //gets called N times
  };

  Template.allowadditions.helpers({
    langs: [{name: 'English'}, {name: 'French'}, {name: 'Spanish'}]
  });

  Template.allowadditions.rendered = function() {
    $('.ui.dropdown').dropdown({allowAdditions: true});
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
