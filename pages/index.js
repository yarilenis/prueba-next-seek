// Import from libs
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Spinner } from 'reactstrap';

import api from '../api';
import initStore from '../store';

// import components
import LayoutWrapper from '../layout/default';
import Card from '../components/Card';

const propTypes = {
  getState: PropTypes.func.isRequired,
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [],
    };
  }

  componentDidMount() {
    this.initData();
  }

  static async getInitialProps() {
    return {};
  }

  async initData() {
    const { getState } = this.props;
    const { auth: { idCookie } } = getState();

    if (idCookie) {
      this.setState({ loading: true });
      const list = await api.getList(idCookie);
      this.setState({ list, loading: false });
    } else {
      Router.push('/login');
    }
  }

  render() {
    const { loading, list } = this.state;

    return (
      <div className="shop" style={{ minHeight: '77vh', position: 'relative' }}>
        <section>
          <div className="container my-5">
            <div className="pt-4 mb-2 d-flex justify-content-between align-items-center">
              <h5><b>Nuevos productos</b></h5>
              <a href="#">
                Ver todo
                <i className="fa fa-angle-right ml-2" />
              </a>
            </div>

            {list.news && list.news.length && (
              <div className="row">
                {list.news.map((product) => (
                  <div className="col-12 col-md-6 col-lg-4 my-3" key={product.articleCode}>
                    <Card product={product} />
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 mb-2 d-flex justify-content-between align-items-center">
              <h5><b>Ofertas del mes</b></h5>
              <a href="#">
                Ver todo
                <i className="fa fa-angle-right ml-2" />
              </a>
            </div>

            {list.offers && list.offers.length && (
              <div className="row">
                {list.offers.map((product) => (
                  <div className="col-12 col-md-6 col-lg-4 my-3" key={product.articleCode}>
                    <Card product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        {loading && (
          <div className="loaderCart">
            <span className="py-2">
              <Spinner size="lg" color="dark" className="mr-3" />
            </span>
          </div>
        )}
      </div>
    );
  }
}

Index.propTypes = propTypes;

const IndexW = LayoutWrapper(Index);

export default connect(initStore)(IndexW);
