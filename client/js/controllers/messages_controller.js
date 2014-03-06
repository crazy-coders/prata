Prata.MessagesController = Ember.ArrayController.extend({
  actions: {
    createMessage: function() {
      // Get the todo title set by the "New Message" text field
      var messageText = this.get('newMessage');
      if (!messageText.trim()) { return; }

      // Create the new Message model
      var store = this.store;

      var m = Prata.Message.createRecord({
        message: messageText,
        user: store.find('user', 1) // Set user
      });

      // Clear the "New Message" text field
      this.set('newMessage', '');

      // Save the new model
      m.save();
    }
  }
});