import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  profileLoading
} from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  getCurrentProfile: PropTypes.func.isRequired,
  profileLoading: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, profileLoading }
)(Dashboard);
