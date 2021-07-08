import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletFetchedCurrencies extends Component {
  render() {
    const { fetchedCurrencies } = this.props;
    return (
      <>
        { fetchedCurrencies.map((currency, index) => (
          <option key={ index }>
            {currency.code}
          </option>))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchedCurrencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletFetchedCurrencies);

WalletFetchedCurrencies.propTypes = {
  fetchedCurrencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};