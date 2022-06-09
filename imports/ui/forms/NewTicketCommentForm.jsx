import React from "react";
import {commentsdb} from "../../api/comments";

export const NewTicketCommentForm = (ticket) => {

    const [comment, setComment] = React.useState("");

    const SubmitComment = () => {

        let author = prompt("What is your name?");

        if(author && comment) {
            commentsdb.insert({
                author,
                comment,
                parent_ticket: ticket.id,
                timestamp: new Date()
            });

            setComment("");
        }
    }

    return(
        <form>
            <input
                type="text"
                id="comment"
                placeholder={"Leave a comment.."}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="button" onClick={SubmitComment}>
                Submit comment
            </button>
        </form>
    );
}