import { Link } from "react-router-dom";
import React,{ useState} from 'react'
import Axios from 'axios'
import {useContext} from 'react';

import { TransactionContext } from "../context/TransactionContext";

const Item=(props)=>{
    const {
        account1,
      } = useContext(TransactionContext);
    const [name, setName] = useState(props.name);
    const [price, setprice] = useState(props.price);
    const [warrenty, setwarrenty] = useState(props.warrentyTime);
    const [des,setDes] = useState(props.productDesc);
    const [uri,setUri] = useState(props.img);
    const [date,setdate]=useState(new Date().toLocaleString("en-US", "Asia/Delhi"));
    
    const address=account1;
    const addToList=()=>{
        Axios.post("http://localhost:3001/insert",{
            name:name,
            address:account1,
            date:date,
            warrenty:warrenty,
            price:price,
            des:des,
            uri:uri
        });
    }
    const setProduct=(info)=>{
        setName(info.name);
        console.log(name);
        setprice(info.price);
        console.log(price);
        setwarrenty(info.warrentyTime);
        console.log(warrenty);
        setdate(new Date().toLocaleString("en-US", "Asia/Delhi"));
        console.log(date);
        console.log(account1);
        addToList();
    }

    return(
        <div className="box">
            <div>
                <img className="boxImg" src={props.img} alt={props.name}></img>
            </div>
            <div className="boxContent">
                <h4 className="cardContent">{props.name}</h4>
                <h5 className="cardContent">{props.price}</h5>
                <h5 className="cardContent">{props.productDesc}</h5>
            </div>
            <Link to={`/${props.id}`}><button type="button" onClick={()=>setProduct(props)} className="buyBtn btn-grad">Buy Now</button></Link>
        </div>
    )
}

export default Item;
