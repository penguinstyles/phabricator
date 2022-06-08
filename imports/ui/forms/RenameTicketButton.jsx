import React from "react";
import { ticketsdb } from "../../api/tickets";

export const RenameTicketButton = (props) => {
    const RenameTicket = () => {
        let confirmation = confirm("Are you sure you want to rename this ticket?" + props.ticket_id);
        let newTitle = prompt("What would you like to rename this ticket to?");

        if(confirmation && newTitle) {
            ticketsdb.update({ _id: props.ticket_id },
                {
                    $set: {
                        title: newTitle
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
                onClick={RenameTicket}
            >
                Rename ticket
            </button>
        </form>
    );
}