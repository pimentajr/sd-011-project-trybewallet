import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';

export default class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <WalletForm />
        <WalletTable />
      </div>
    );
  }
}
