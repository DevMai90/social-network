import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser, profileLoading } from '../../actions/profileActions';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>hhihihi</h1>
      </div>
    );
  }
}

const mapStateToProps = {
  profile: state.profile
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  profileLoading: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentUser, profileLoading }
)(Dashboard);
