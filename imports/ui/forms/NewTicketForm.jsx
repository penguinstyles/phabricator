import React from "react";
import { ticketsdb } from "../../api/tickets";

export const NewTicketForm = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [assigned_to, setAssigned_To] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const timestamp = new Date();

    const createTicket = () => {
        ticketsdb.insert({ title, description, assigned_to, author, priority, status: "open", timestamp });

        setTitle("");
        setDescription("");
        setAssigned_To("");
        setAuthor("");
        setPriority("");
    }

    return(
        <form>
            <div>
                <label htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    placeholder={"Give your ticket a descriptive title.."}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">
                    Description
                </label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    placeholder={"..and be as detailed as possible!"}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="assigned_to">
                    Assign to
                </label>
                <input
                    type="text"
                    id="assigned_to"
                    value={assigned_to}
                    placeholder={"corey"}
                    onChange={(e) => setAssigned_To(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="author">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    placeholder={"corey"}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="priority">
                    Priority
                </label>
                <select
                    name="priority"
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="wishlist">Wishlist</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="fixnow">Fix now!</option>
                </select>
            </div>
            <div>
                <button
                    type="button"
                    onClick={createTicket}
                >
                    Create ticket
                </button>
            </div>
        </form>
    );
}