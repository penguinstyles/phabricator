import React from "react";
import { ticketsdb } from "../../api/tickets";

export const CloseTicketButton = (props) => {

    const CloseTicket = () => {
        let confirmation = confirm("Are you sure you want to close this ticket?" + props.ticket_id);
        if(confirmation) {
            ticketsdb.update({ _id: props.ticket_id },
                {
                   $set: {
                       status: {
                           closed: 1,
                           closed_by: "corey",
                           closure_message: prompt("Please provide a closing comment.."),
                           closure_timestamp: new Date(),
                       }
                   }
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