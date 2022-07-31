import { useState,useContext } from 'react'
import OrderedItem from './OrderedItem';
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import './Create.css';
import Axios from 'axios';
import { TransactionContext } from '../context/TransactionContext';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');


const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [serial, setSerial] = useState('')
  const [UserAddress, setUserAddress] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [expDate, setExpDate] = useState('')
  const [extime,setexTime] = useState('')
  const [loading, setLoading] = useState(false);
  const {phoneNum}=useContext(TransactionContext);


  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;


  const createNFT = async () => {
    setLoading(true);
    if (!image || !UserAddress || !name  ) return
    try{
      const final = name;
      const new_desc = 'Created on'+' '+dateTime+', '+description+', '+'and is Valid till :'+expDate+' '+extime;
      console.log("df"+expDate+' '+extime)
      const result = await client.add(JSON.stringify({image, UserAddress, name:final, description:new_desc}))
      mintThenList(result)
      addMessage();
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const addMessage=()=>{
    Axios.post("http://localhost:3001/sendMes",{
      phone:phoneNum,
    });
  }
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    await(await nft.mint(uri)).wait()
    const id = await nft.tokenCount()
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    const listingPrice = ethers.utils.parseEther('0.0001')
    await(await marketplace.makeItem(nft.address, id, listingPrice, UserAddress)).wait()
    setLoading(false);
  }

  const UpdateData = (id,name,address,des,uri) => {
    setSerial(id);
    setName(name);
    setUserAddress(address);
    setImage(uri);
    setDescription(des);
  }


  return (
    <div className="createForm">
      <OrderedItem UpdateData={UpdateData} />
      <div className="roebox">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              
              <Form.Control value={serial} onChange={(e) => setSerial(e.target.value)} size="lg" required type="text" placeholder="Serial Number" />
              <Form.Control value={name} onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control value={UserAddress} onChange={(e) => setUserAddress(e.target.value)} size="lg" required type="text" placeholder="User Adress:" />
              <Form.Control onChange={(e) => setExpDate(e.target.value)} size="lg" required type="date" placeholder="Set Expiry Date: " />
              <Form.Control onChange={(e) => setexTime(e.target.value)} size="lg" required type="time" placeholder="Set Expiry time: " />
              <div className="d-grid px-0">
                {loading?(
                  <main className="tit">
                    <div className="lds-roller11">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <h2 style={{ color: "black" }}>Loading...</h2>
                  </main>
                ):
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
                }
              </div>
            </Row>
          </div>
        </main>
      </div>
      
    </div>
  );
}

export default Create