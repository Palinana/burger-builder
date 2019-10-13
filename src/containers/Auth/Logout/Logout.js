import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/auth';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }
    
    //whenever this container is loaded it just redirects
    render() {
        return <Redirect to="/" />;
    }
}
  
const mapDisPatchToProps = dispatch => {
    return {
      onLogout: () => dispatch(actions.logout())
    };
};
  
export default connect(null, mapDisPatchToProps)(Logout);
