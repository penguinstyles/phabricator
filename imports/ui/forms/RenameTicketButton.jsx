import React from "react";
import { ticketsdb } from "../../api/tickets";
import {commentsdb} from "../../api/comments";

export const RenameTicketButton = (props) => {
    const RenameTicket = () => {
        let confirmation = confirm("Are you sure you want to rename this ticket?" + props.ticket_id);
        let currentTitle = props.ticket_title;
        let newTitle = prompt("What would you like to rename this ticket to?");
        let user = prompt("What is your name?");

        if(confirmation && newTitle) {
            ticketsdb.update({ _id: props.ticket_id },
                {
                    $set: {
                        title: newTitle
                    }
                });

            commentsdb.insert({
                author: "[Phabricator]",
                comment: user + " has renamed this ticket from " + currentTitle + " to " + newTitle,
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
                className={"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1"}
                onClick={RenameTicket}
            >
                Rename ticket
            </button>
        </form>
    );
}
