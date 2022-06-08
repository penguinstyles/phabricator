import React from "react";
import {App} from "../imports/ui/App";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {render} from "react-dom";
import { TicketDetails } from "../imports/ui/TicketDetails";

FlowRouter.route('/', {
    name: 'basepage',
    action(params, queryParams) {
        render(<App/>, document.getElementById('react-target'));
    }
});

FlowRouter.route('/ticket/:_id', {
    name: 'ticket.details',
    action(params, queryParams) {
        render(<TicketDetails params={params} queryParams={queryParams}/>, document.getElementById('react-target'));

    }
});