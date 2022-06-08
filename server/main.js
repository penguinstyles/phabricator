import { Meteor } from 'meteor/meteor';
import { ticketsdb } from "../imports/api/tickets";

Meteor.startup(() => {
  // Let's populate the database with some initial TicketDetails
  if (ticketsdb.find().count() === 0) {
    ticketsdb.insert({
      title: "Create TicketDetails database and populate it with some initial TicketDetails",
      description: null,
      assigned_to: "corey",
      author: "corey",
      priority: "high",
      status: {
        closed: 1,
        closed_by: "corey",
        closure_message: null,
        closure_timestamp: new Date()
      },
      timestamp: new Date(),
    });

    ticketsdb.insert({
      title: "Allow for new TicketDetails to be created via a form",
      description: null,
      assigned_to: "corey",
      author: "corey",
      priority: "high",
      status: "open",
      timestamp: new Date(),
    });
  }
});