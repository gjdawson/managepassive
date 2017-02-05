import React from 'react'
import config from '../../config/'
import Sidebar from 'react-sidebar'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'


// Components
import DocumentTitle from 'react-document-title'
import HeaderBarController from './HeaderBar';

//import { Router, Route, Link, browserHistory } from 'react-router'


class MainLayout extends React.Component {

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

            <DocumentTitle title={config.title}>


                    <HeaderBarController>
                        {this.props.children}
                    </HeaderBarController>

            </DocumentTitle>
        );
    }
}

export default MainLayout;
