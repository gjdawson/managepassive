import React from 'react'

class Dummy extends React.Component {
    componentDidMount() {
        console.log('Dummy Mounts');
    }
    render() {
        return(<div>
                {this.props.children}
            </div>
        )
    }
}

export default Dummy