import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

  static getDerivedStateFromProps(props, state) {
    const { errors } = props;

    if (errors) {
      return { errors };
    }
    return null;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const {
      errors,
      handle,
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      displaySocialInputs
    } = this.state;

    // Social Media Inputs
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <React.Fragment>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            value={twitter}
            icon="fab fa-twitter"
            error={errors.twitter}
            onChange={this.onChange}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            value={facebook}
            icon="fab fa-facebook"
            error={errors.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            value={linkedin}
            icon="fab fa-linkedin"
            error={errors.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="YouTube Page URL"
            name="youtube"
            value={youtube}
            icon="fab fa-youtube"
            error={errors.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            value={instagram}
            icon="fab fa-instagram"
            error={errors.instagram}
            onChange={this.onChange}
          />
        </React.Fragment>
      );
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, and nickname"
                />

                <SelectListGroup
                  name="status"
                  value={status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or company one"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City and state suggested (Eg. San Jose, CA)"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (Eg. HTML,CSS,JavaScript,PHP)"
                />

                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />

                <TextAreaFieldGroup
                  placeholder="A short bio about yourself"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      this.setState({
                        displaySocialInputs: !this.state.displaySocialInputs
                      })
                    }
                  >
                    Add Social Network Links
                  </button>{' '}
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit Profile"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
