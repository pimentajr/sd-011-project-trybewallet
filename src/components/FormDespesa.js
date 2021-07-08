import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mountExpenses, fetchMoedas } from '../actions';

class FormDespesa extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchMoedas } = this.props;
    dispatchFetchMoedas();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderForm1() {
    const { value, description, currency } = this.state;
    const { currencies } = this.props;
    const moedas = Object.keys(currencies).filter((code) => code !== 'USDT');
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            onChange={ this.handleInput }
            value={ currency }
          >
            {moedas.map((res, i) => <option key={ i } value={ res }>{res}</option>)}
          </select>
        </label>
      </form>
    );
  }

  renderForm2() {
    const { method, tag } = this.state;
    return (
      <form>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleInput }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select name="tag" id="tag" value={ tag } onChange={ this.handleInput }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }

  render() {
    const { MountExpenses, exchange, dispatchFetchMoedas } = this.props;
    return (
      <div>
        {this.renderForm1()}
        {this.renderForm2()}
        <button
          type="button"
          onClick={ () => {
            dispatchFetchMoedas();
            MountExpenses({ ...this.state, exchangeRates: exchange });
            this.setState((prevState) => ({
              value: '',
              description: '',
              currency: 'USD',
              method: 'Dinheiro',
              tag: 'Alimentação',
              id: prevState.id + 1,
            }));
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchange: state.wallet.exchange,
});

const mapDispatchToProps = (dispatch) => ({
  MountExpenses: (state) => dispatch(mountExpenses(state)),
  dispatchFetchMoedas: (state) => dispatch(fetchMoedas(state)),
  // dispatchfetchExchange: (state) => dispatch(fetchExchange(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);

FormDespesa.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  dispatchFetchMoedas: PropTypes.func.isRequired,
  MountExpenses: PropTypes.func.isRequired,
  exchange: PropTypes.objectOf(Object).isRequired,
};
