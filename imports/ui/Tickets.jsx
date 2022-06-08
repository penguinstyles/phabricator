import React from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {ticketsdb} from '../api/tickets';
import {NewTicketForm} from "./forms/NewTicketForm";
import {CloseTicketButton} from "./forms/CloseTicketButton";
import {RenameTicketButton} from "./forms/RenameTicketButton";

export const Tickets = () => {

  const opentickets = useTracker(() => {
    return ticketsdb.find({status: "open"}).fetch();
  });

  return (
    <div>
        <h2>Create ticket</h2>
        <NewTicketForm/>
        <h2>Open tickets ({ticketsdb.find({status:"open"}).count()})</h2>
        <ul>{opentickets.map(
            ticket => <li key={ticket._id}>
                <a href={"/ticket/" + ticket._id}>{ticket.title}</a>
                <CloseTicketButton ticket_id={ticket._id} />
                <RenameTicketButton ticket_id={ticket._id} />
                <ul>
                    <li>Description: {ticket.description}</li>
                    <li>Author: {ticket.author}</li>
                    <li>Assigned to: {ticket.assigned_to}</li>
                    <li>Status: {ticket.status === "open" ? "Open" : "Closed"}</li>
                    <li>Priority: {ticket.priority.toUpperCase()}</li>
                    {ticket.status === "open" ? "" : <ul>
                        <li>Closed by: {ticket.status.closed_by}</li>
                        <li>Closure message: {ticket.status.closure_message}</li>
                    </ul>}
                </ul>
            </li>
        )}</ul>
    </div>
  );
};
