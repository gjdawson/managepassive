import React from 'react'
import config from '../../config/'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import Ver from './Ver'

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
                        <Ver/>
                    </HeaderBarController>

            </DocumentTitle>
        );
    }
}

export default MainLayout;
