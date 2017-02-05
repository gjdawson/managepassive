import React from 'react'
import classNames from 'classnames';
import { Link } from 'react-router'

class NavLink extends React.Component {

    render() {

        const { className, active, disabled } = this.props;

        const { to } = this.props;
        return (
            <li role="presentation"
                className={classNames(className, { active, disabled })}
            >
                <Link to={to}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}

export default NavLink;
