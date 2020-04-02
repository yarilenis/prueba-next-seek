import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  product: PropTypes.object.isRequired,
};

function CardProduct({ product }) {
  return (
    <div className="card">
      <div className="mx-auto pt-3">
        <img
          className="img-fluid"
          src="/static/images/shop/tj_cisco.png"
          alt="product"
          width="150"
        />
      </div>
      <div className="card-body">
        <div className="text-center">
          <small>{ product.brand }</small>
          <p className="card-title"><b>{ product.articleName }</b></p>
        </div>
        <div className="text-center my-4">
          <small>{`Código: ${product.articleCode}`}</small>
          <h3><b>{`$ ${product.priceList.toFixed(2)}`}</b></h3>
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <small>{`Stock: ${product.articleCode}`}</small>
          <p>{`U.M: ${product.articleUM}`}</p>
        </div>
      </div>
    </div>
  );
}

CardProduct.propTypes = propTypes;

export default CardProduct;
