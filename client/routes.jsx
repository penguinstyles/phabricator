import React from "react";
import {App} from "../imports/ui/App";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {render} from "react-dom";

FlowRouter.route('/', {
    name: 'basepage',
    action(params, queryParams) {
        render(<App/>, document.getElementById('react-target'));
    }
});