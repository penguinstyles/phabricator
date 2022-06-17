import React from "react";
import {CloseTicketButton} from "../forms/CloseTicketButton";
import {ReopenTicketButton} from "../forms/ReopenTicketButton";
import {RenameTicketButton} from "../forms/RenameTicketButton";
import {NewTicketCommentForm} from "../forms/NewTicketCommentForm";

export const Badge = (props) => {

    return (
        <>
            <a href={"/tag/" + props.text}>
                <span className={"text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-" + props.color + "-600 bg-" + props.color + "-200 uppercase last:mr-0 mr-1"}>
                    {props.text}
                </span>
            </a>
        </>
    );
}
