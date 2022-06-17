import React from "react";
import {commentsdb} from "../../api/comments";
import {ticketsdb} from "../../api/tickets";

export const ReopenTicketButton = (props) => {

    const ReopenTicket = () => {
        let confirmation = confirm("Are you sure you want to reopen this ticket?" + props.ticket_id);
        let comment = prompt("Please provide a comment..");
        let user = prompt("What is your name?");

        if(confirmation && comment) {
            ticketsdb.update({ _id: props.ticket_id }, {
                $set: {
                    status: "open"
                }
            });

            commentsdb.insert({
                author: "[Phabricator]",
                comment: "This ticket was reopened by " + user + " with the following reason: " + comment,
                parent_ticket: props.ticket_id,
                timestamp: new Date()
            });
        }
    }

    return(
        <form>
            <input
                type="text"
                id="author"
                value={props.ticket_id}
                readOnly
                hidden
            />
            <button
                type="button"
                className={"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 uppercase last:mr-0 mr-1"}
                onClick={ReopenTicket}
            >
                Reopen ticket
            </button>
        </form>
    );
}
