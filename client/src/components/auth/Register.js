import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextInputGroup from '../common/TextFieldGroup';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextInputGroup
                  name="name"
                  placeholder="Name"
                  value={name}
                  error={errors.name}
                  onChange={this.onChange}
                />
                <TextInputGroup
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  error={errors.email}
                  onChange={this.onChange}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />
                <TextInputGroup
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  error={errors.password}
                  onChange={this.onChange}
                />
                <TextInputGroup
                  name="password2"
                  placeholder="Confirm Password"
                  type="password"
                  value={password2}
                  error={errors.password2}
                  onChange={this.onChange}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// In order to get auth state into our  react component...
// Puts auth state into a prop called auth. Can be accessed with this.props.auth
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// Action creators become available through props
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
