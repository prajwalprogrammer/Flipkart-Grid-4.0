import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./Navbar";
import Home from "./Home.js";
import Create from "./Create.js";
import Login from "../Addi_Compo/Login";
import MyListedItems from "./MyListedItems.js";
import Welcome from "../Addi_Compo/Welcome"
import Navbar from "../Addi_Compo/Navbar"
import MyPurchases from "./MyPurchases.js";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import { ethers } from "ethers";
import { Spinner } from "react-bootstrap";
import "./App.css";
import { TransactionContext } from "../context/TransactionContext";
import Products from "../Addi_Compo/Products";
import ProductDetails from "../Addi_Compo/ProductDetails";
import Footer from "../Addi_Compo/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  const { IsAdmin } = useContext(TransactionContext);

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    console.log(marketplace.itemCount());
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  const AddMoreComp = () => {
    return (
      <>
        <Welcome web3Handler={web3Handler} account={account} />
        <Products />
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
          {false ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              <Spinner animation="border" style={{ display: "flex" }} />
              <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              {!IsAdmin ? (
                <Route
                  path="/"
                  element={<AddMoreComp/>}
                />
              ):<Route
                  path="/"
                  element={<Welcome/>}
                />}
              <Route
                path="/create"
                element={<Create marketplace={marketplace} nft={nft} />}
              />
              <Route
                path="/new-Warrenties"
                element={<Home marketplace={marketplace} nft={nft} account={account} />}
              />
              <Route
                path="/my-listed-items"
                element={
                  <MyListedItems
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
              <Route path="/:id" element={<ProductDetails />} />
              <Route
                path="/my-purchases"
                element={
                  <MyPurchases
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <Login
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
            </Routes>
          )}
        </div>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
