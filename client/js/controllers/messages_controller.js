Prata.MessagesController = Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  actions: {
    createMessage: function() {
      // Get the todo title set by the "New Message" text field
      var messageText = this.get('newMessage');
      if (!messageText.trim()) { return; }

      // Create the new Message model
      var store = this.store;

      var m = store.createRecord('message', {
        message: messageText,
        createdAt: new Date()
      });

      // Clear the "New Message" text field
      this.set('newMessage', '');

      // Save the new model
      m.save();
    }
  }
});