import React, { Component } from 'react';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{`${
              profile.user.name
            }'s bio`}</h3>
            <p className="lead">{profile.bio}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
