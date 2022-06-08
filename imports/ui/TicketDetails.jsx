import React from 'react';
import {render} from "react-dom";
import { Tickets } from './Tickets.jsx';
import {useTracker} from "meteor/react-meteor-data";
import {ticketsdb} from "../api/tickets";
import {CloseTicketButton} from "./forms/CloseTicketButton";

export const TicketDetails = (params, queryParams) => {

    let _id = params.params._id;
    const thisTicket = useTracker(() => {
        return ticketsdb.find({_id: _id}).fetch();
    });

    return(
        <div>
            <h2>Ticket details</h2>
            <ul>{thisTicket.map(
                ticket => <li key={ticket._id}>
                    <a href={"/ticket/" + ticket._id}>{ticket.title}</a>
                    <CloseTicketButton ticket_id={ticket._id} />
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
}