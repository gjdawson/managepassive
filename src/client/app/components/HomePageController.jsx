import React from 'react'
import DocumentTitle from 'react-document-title'

// Get component
import Rooms from './RoomsController'

class HomePageController extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <DocumentTitle title="Homepage">
                <Rooms />
            </DocumentTitle>
        );
    }
}

export default HomePageController;