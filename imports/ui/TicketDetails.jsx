import React from 'react';
import {commentsdb} from "../api/comments";
import {ticketsdb} from "../api/tickets";
import {useTracker} from "meteor/react-meteor-data";
import {CloseTicketButton} from "./forms/CloseTicketButton";
import {RenameTicketButton} from "./forms/RenameTicketButton";
import {NewTicketCommentForm} from "./forms/NewTicketCommentForm";

export const TicketDetails = (params, queryParams) => {

    let _id = params.params._id;
    const thisTicket = useTracker(() => {
        return ticketsdb.find({_id: _id}).fetch();
    });

    const childComments = useTracker(() => {
        return commentsdb.find({parent_ticket: _id}).fetch();
    });

    return(
        <div>
            <a href={"/"}>Back</a>
            <h2>Ticket details</h2>
            <ul>{thisTicket.map(
                ticket => <li key={ticket._id}>
                    <a href={"/ticket/" + ticket._id}>{ticket.title}</a>
                    <CloseTicketButton ticket_id={ticket._id} />
                    <RenameTicketButton ticket_id={ticket._id} ticket_title={ticket.title} />
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

            <h3>Comments</h3>
            <ul>{childComments.map(
                child =>
                    <span key={child._id}>
                        <li>() <b>{child.author}</b>: {child.comment}</li>
                    </span>
            )}</ul>

            <h3>Submit a new comment</h3>
            {thisTicket[0].status === "open" ? <NewTicketCommentForm id={_id}/> : "This ticket has been closed and may not be commented on."}
        </div>
    );
}