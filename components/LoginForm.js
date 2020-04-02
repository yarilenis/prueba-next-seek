/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { setAuth, setCookie } from '../store/actions/auth';

import api from '../api';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  title: 'Ingresa tus datos',
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      user: {
        username: '',
        password: '',
        remenber: false,
      },
      reRequestEmail: false,
    };
  }

  loginOk = (token, user) => {
    const { dispatch, redirect, onLoginOk } = this.props;
    window.localStorage.setItem('ses', JSON.stringify({token, user}));
    if (user) {
      dispatch(setCookie(token));
      dispatch(setAuth({ loggedIn: true, user }));
      Router.push('/');
    }
  }

  async submitForm(e) {
    e.preventDefault();
    const { user } = this.state;
    const data = {
      user: user.username,
      password: user.password,
    }
    this.setState({ loading: true });
    try {
      const { token, user } = await api.login(data);
      this.setState({ loading: false });
      if (token) {
        this.loginOk(token, user);
      } else {
        this.setState({ error: true });
        setTimeout(() => {
          this.setState({ error: false });
        }, 5000);
      }
    } catch (e) {
      this.setState({ loading: false, error: true });
      setTimeout(() => {
        this.setState({ error: false });
      }, 5000);
    }
  }

  handlerInput(e) {
    const { user } = this.state;
    const {
      target: {
        id,
        type,
        checked,
        value,
      },
    } = e;
    const clon = { ...user };
    const val = type === 'checkbox' ? checked : value;
    clon[id] = val;
    this.setState({ user: clon });
  }

  render() {
    const { title, loginOnly } = this.props;
    const {
      loading,
      user,
      error,
    } = this.state;

    return (
      <div>
        {title && (
          <div className="text-center mb-5">
            <h2>{title}</h2>
          </div>
        )}
        <form onSubmit={e => this.submitForm(e)} autoComplete="on">
          <div className="form-group">
            <label htmlFor="username" className="d-block">
              <b>Usuario</b>
              <input
                value={user.user}
                onChange={e => this.handlerInput(e)}
                id="username"
                className="form-control mt-2"
                type="text"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="d-block">
              <b>Contraseña</b>
              <input
                value={user.password}
                onChange={e => this.handlerInput(e)}
                id="password"
                className="form-control mt-2"
                type="password"
                required
              />
            </label>
          </div>
          {error && (
            <div className="small text-danger mb-3">
            Error, datos incorrectos!
            </div>
          )}
          <div className="row">
            <div className="col">
              <label htmlFor="remenber" className="form-group form-check mb-0">
                <input
                  checked={user.remenber}
                  onChange={e => this.handlerInput(e)}
                  type="checkbox"
                  className="form-check-input"
                  id="remenber"
                />
                <b className="form-check-label">Recordar mi cuenta</b>
              </label>
            </div>
            {!loginOnly && (
              <div className="col-auto pb-3">
                <a href="#">Restablecer la contraseña</a>
              </div>
            )}
          </div>
          <p>
            <button
              disabled={loading}
              className="btn btn-primary btn-lg btn-block text-white"
              type="submit"
            >
              {loading ? <Spinner size="sm" color="light" className="mr-3" /> : ''}
              {loading ? 'Conectando' : 'Ingresar'}
              {!loading ? <i className="fa fa-angle-right ml-2" /> : ''}

            </button>
          </p>
          {!loginOnly && (
            <p className="text-center">
              <a href="#">
                <b>Crea cuenta de Intragentes</b>
              </a>
            </p>
          )}
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default connect()(LoginForm);
