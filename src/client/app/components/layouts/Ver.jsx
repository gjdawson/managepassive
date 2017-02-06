import React from 'react'
import config from '../../config/'

class Ver extends React.Component {
    render() {
        return(
            <div className="verdisp">Version {config.version}</div>
        )
    }
}

export default Ver