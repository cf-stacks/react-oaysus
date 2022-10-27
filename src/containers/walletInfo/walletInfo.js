import React from "react";
import Layout from "../layout/layout";
import WalletList from "../../components/walletCheckTesting/walletList";

import './walletInfo.css';

export default function WalletInfo() {
  return (
    <Layout>
      <WalletList />
    </Layout>
  );
}