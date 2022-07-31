import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./Navbar";
import Home from "./Home.js";
import Create from "./Create.js";
import Login from "../Addi_Compo/Login";
import MyListedItems from "./MyListedItems.js";
import Welcome from "../Addi_Compo/Welcome";
import MyPurchases from "./MyPurchases.js";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import { ethers } from "ethers";
import "./App.css";
import { TransactionContext } from "../context/TransactionContext";
import Products from "../Addi_Compo/Products";
import ProductDetails from "../Addi_Compo/ProductDetails";
import HandleLogout from "../Addi_Compo/Logout";
import Claimed from "./Claimed";
import AdminContent from "../Addi_Compo/AdminContent";

function App() {
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  const { IsAdmin, setAccount1, setMarketplace1, setNFT1 } =
    useContext(TransactionContext);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setAccount1(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      setAccount1(accounts[0]);

      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    console.log(marketplace.itemCount());
    setMarketplace(marketplace);
    setMarketplace1(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setNFT1(nft);
  };
  const AddMoreComp = () => {
    return (
      <>
        <Welcome web3Handler={web3Handler} account={account} />
        <Products />
      </>
    );
  };
  const Admin = () => {
    return (
      <>
        <Welcome web3Handler={web3Handler} account={account} />
        <AdminContent />
      </>
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          <Routes>
            {!IsAdmin ? (
              <Route path="/" element={<AddMoreComp />} />
            ) : (
              <Route path="/" element={<Admin />} />
            )}
            <Route
              path="/create"
              element={<Create marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/new-Warrenties"
              element={
                <Home marketplace={marketplace} nft={nft} account={account} />
              }
            />
            <Route path="/my-listed-items" element={<MyListedItems />} />
            <Route path="/:id" element={<ProductDetails />} />
            <Route path="/my-purchases" element={<MyPurchases />} />
            <Route path="/login" element={<Login />} />
            <Route path="/claimed" element={<Claimed />} />
            <Route path="/logout" element={<HandleLogout />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
