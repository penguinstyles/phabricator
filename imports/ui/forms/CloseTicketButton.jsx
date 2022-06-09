import React from "react";
import {commentsdb} from "../../api/comments";
import {ticketsdb} from "../../api/tickets";

export const CloseTicketButton = (props) => {

    const CloseTicket = () => {
        let confirmation = confirm("Are you sure you want to close this ticket?" + props.ticket_id);
        let comment = prompt("Please provide a closing comment..");

        if(confirmation && comment) {
            ticketsdb.update({ _id: props.ticket_id }, {
                $set: {
                    status: {
                        closed: 1,
                        closed_by: "corey",
                        closure_message: comment,
                        closure_timestamp: new Date(),
                    }
                }
            });

            commentsdb.insert({
                author: "[Phabricator]",
                comment: "This ticket was closed with the following reason: " + comment,
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
                onClick={CloseTicket}
            >
                Close ticket
            </button>
        </form>
    );
}