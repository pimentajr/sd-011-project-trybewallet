export const REQUEST_QUOTE_API = 'REQUEST_QUOTE_API';
export const RECEIVE_QUOTE_API = 'RECEIVE_QUOTE_API';
export const VALIDATE_LOGIN = 'VALIDATE_LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

const requestQuoteApi = () => ({
  type: REQUEST_QUOTE_API,
});

const receiveQuoteApi = (quote) => ({
  type: RECEIVE_QUOTE_API,
  quote,
});

export const validateLogin = (email) => ({
  type: VALIDATE_LOGIN,
  email,
});

export const receiveCurrencies = (currencie, expense) => ({
  type: SAVE_CURRENCIES,
  currencie,
  expense,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestQuoteApi());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const quote = await response.json();
    return dispatch(receiveQuoteApi(quote));
  };
}
