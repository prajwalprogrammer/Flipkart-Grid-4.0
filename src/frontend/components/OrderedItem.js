import React, { useState,useContext } from 'react'
import {useEffect} from 'react';
import Axios from 'axios';
import { TransactionContext } from '../context/TransactionContext';

const OrderedItem=({UpdateData})=>{
    const {account1}=useContext(TransactionContext);

    const [itemDetail,setItemDetail]=useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/read").then((response)=>{
            setItemDetail(response.data);
        });
    },[itemDetail]);
    const deleteItem=(id)=>{
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
            Axios.get("http://localhost:3001/read").then((response)=>{
            setItemDetail(response.data);
        });
        });
    }
    const CreateList= async({_id,productName,address,des,uri})=>{
       await UpdateData(_id,productName,address,des,uri);
        deleteItem(_id)
    }
    if(!itemDetail.length){
        return(<main className="tit">
        <h2 style={{color: 'white'}}>No Pending Warranties</h2>
      </main>)
    }
    return(
        <div>
            <h4 className='order'>Items Ordered by Customers</h4>
            <table>
                <tr>
                    <th className='col1 colHead'>Serial Id</th>
                    <th className='col1 colHead'>Product</th>
                    <th className='col1 colHead'>Price</th>
                    <th className='col1 colHead'>Wallet Address</th>
                    <th className='col1 colHead'>Item Ordered At</th>
                    <th className='col1 colHead'>Exipry</th> 
                    <th className='col1 colHead'>Delete Item</th> 
                    <th className='col1 colHead'>Create</th> 
                </tr>
                    {itemDetail.map((val,key)=>{
                    return <tr key={key}><td className='col1'>{val._id}</td> <td className='col1'>{val.productName}</td> <td className='col1'>{val.price}</td> <td className='col1'>{val.address}</td> <td className='col1'>{val.itemOrderedAt}</td> <td className='col1'>{val.expiryDate}</td> <td className='col1'><input type="checkbox" onClick={()=>deleteItem(val._id)}></input></td><td className='col1'><input type="button" onClick={()=>CreateList(val)} value="Create"></input></td></tr>
                    })}
                </table>
            
        </div>
    )
}

export default OrderedItem;