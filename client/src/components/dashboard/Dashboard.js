import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  setProfileLoading
} from '../../actions/profileActions';

import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = <Spinner />;
    } else {
      // Checkif logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: Display Profile</h4>;
      } else {
        // User is logged in, but has no profile
        dashboardContent = (
          <React.Fragment>
            <p className="lead text-muted">Welcome, {user.name}</p>
            <p>You have not set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </React.Fragment>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setProfileLoading: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, setProfileLoading }
)(Dashboard);
