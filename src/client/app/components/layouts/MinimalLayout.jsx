import React from 'react'
import config from '../../config/'
import Sidebar from 'react-sidebar'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import Ver from './Ver'

import Muon from 'muonjs'

// Components
import DocumentTitle from 'react-document-title'

//import { Router, Route, Link, browserHistory } from 'react-router'


class MinimalLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sensors: {},
            sidebarOpen: true
        };
    }

    componentDidMount() {

    }

    render() {



        var setStyle = {};

        return (

            <DocumentTitle title={config.title + ' – ' + this.props.title}>
                <div id="user-login-out">

                    {this.props.children}
                    <Ver/>
                </div>

            </DocumentTitle>
        );
    }
}

export default MinimalLayout;
