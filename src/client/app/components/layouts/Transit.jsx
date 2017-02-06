import React from 'react'
import config from '../../config/'

// Components
import HeaderBarController from './HeaderBar';
import EasyTransition from 'react-easy-transition'

//import { Router, Route, Link, browserHistory } from 'react-router'


class Transit extends React.Component {
    render() {
        return (
            <div>
              <EasyTransition
                  path={this.props.location.pathname}
                  initialStyle={{ opacity: 0}}
                  transition="opacity 0.3s ease-in"
                  finalStyle={{ opacity: 1}}
              >
              {this.props.children}
              </EasyTransition>
            </div>
        )
    }
}

export default Transit