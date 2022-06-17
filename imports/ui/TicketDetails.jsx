import React from 'react';
import {commentsdb} from "../api/comments";
import {ticketsdb} from "../api/tickets";
import {useTracker} from "meteor/react-meteor-data";
import {Badge} from "./components/Badge";
import {CloseTicketButton} from "./forms/CloseTicketButton";
import {GlobalNavigation} from "./components/GlobalNavigation";
import {NewTicketCommentForm} from "./forms/NewTicketCommentForm";
import {RenameTicketButton} from "./forms/RenameTicketButton";
import {ReopenTicketButton} from "./forms/ReopenTicketButton";

export const TicketDetails = (params, queryParams) => {

    let _id = params.params._id;

    const childComments = useTracker(() => {
        return commentsdb.find({parent_ticket: _id}).fetch();
    });

    const alltickets = useTracker(() => {
        return ticketsdb.find({}).fetch();
    });

    const thisTicket = useTracker(() => {
        return ticketsdb.find({_id: _id}).fetch();
    });

    return(
        <div className={"h-screen flex overflow-x-hidden overflow-y-hidden"}>
            <GlobalNavigation/>
            <div className={"block"}>
                <div style={{height:'64px', lineHeight:'64px', marginLeft: '68px'}} className={"border-b"}>
                    <div className={"px-2"}>
                        <span>Search bar and misc nav stuff will go here</span>
                    </div>
                </div>
                <div style={{height:'calc(100% - 64px)', marginLeft: '68px'}} className={"flex"}>
                    <div className={"border-r overflow-y-auto w-1/4"}>
                        <ul className={""}>
                            {alltickets.map(ticket =>
                                <a href={"/ticket/" + ticket._id}>
                                    <li className={"border-b p-4 hover:bg-gray-100"}>
                                        <div className={"flex"}>
                                            <span className={"font-semibold text-sm w-3/4"}>{ticket.title}</span>
                                            <span className={"w-1/4"}>Timestamp</span>
                                        </div>
                                        <span className={""}>{ticket.description}</span>
                                    </li>
                                </a>
                            )}
                        </ul>
                    </div>
                    <div className={"overflow-y-auto w-3/4"}>
                        {thisTicket.map(ticket =>
                            <div key={ticket._id} className={"h-screen"}>
                                <div style={{lineHeight:'64px'}} className={"border-b flex h-24 p-4"}>
                                    <div className={"font-semibold truncate w-3/12"}>{ticket.title}</div>
                                    <div className={"flex justify-center px-2 space-x-2"}>
                                        {ticket.status === "open" ? <CloseTicketButton /> : <ReopenTicketButton />} <RenameTicketButton />
                                    </div>
                                </div>
                                <div className={"flex p-4 space-x-4"}>
                                    <div className={"w-2/3"}>
                                        <span className={"font-semibold text-lg"}>{ticket.title}</span>
                                        <div className={"border mt-4 rounded"}>
                                            <div className={"bg-gray-100 p-2"}>
                                                Description
                                            </div>
                                            <div className={"p-2"}>
                                                {ticket.description}
                                            </div>
                                        </div>
                                        <hr className={"border-b my-6"} />
                                        <div className={"font-semibold mt-4 text-lg"}>Comments</div>
                                        {childComments.map(comment =>
                                            <div key={comment._id}>
                                                <div className={"border mt-4 rounded"}>
                                                    <div className={"bg-gray-100 flex p-2"}>
                                                        <div className={"w-3/4"}>
                                                            {comment.author}
                                                        </div>
                                                        <div className={"text-gray-600"}>
                                                            timestamp
                                                        </div>
                                                    </div>
                                                    <div className={"p-2"}>
                                                        {comment.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <hr className={"border-b my-6"} />
                                        <div className={"font-semibold mt-4 text-lg"}>Submit a new comment</div>
                                        <div>
                                            {ticket.status === 'open' ? <NewTicketCommentForm id={ticket._id} /> : "This ticket has been closed and may not be commented on."}
                                        </div>
                                    </div>
                                    <div className={"w-1/3"}>
                                        <ol className={"border rounded"}>
                                            <li className={"border-b p-4"}>Author: {ticket.author}</li>
                                            <li className={"border-b p-4"}>Priority: {ticket.priority}</li>
                                            <li className={"border-b p-4"}>Tags: <Badge text={"asdf"} color={"blue"}/> <Badge text={"asdf"} color={"blue"}/> <Badge text={"asdf"} color={"blue"}/> <Badge text={"asdf"} color={"blue"}/></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
