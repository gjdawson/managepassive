import React from 'react'
import DocumentTitle from 'react-document-title'

// Get component
import HomePage from './HomePage';
import Rooms from './RoomsController'

class HomePageController extends React.Component {

    componentDidMount() {
        // pretend rooms


    }

    render() {
        return (
            <DocumentTitle title="Manage My Carehome Control Panel">
                <Rooms />
            </DocumentTitle>
        );
    }
}

export default HomePageController;