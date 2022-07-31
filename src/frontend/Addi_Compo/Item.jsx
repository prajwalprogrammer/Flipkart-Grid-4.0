import { Link } from "react-router-dom";
import React,{ useState} from 'react'
import Axios from 'axios'
import {useContext} from 'react';

import { TransactionContext } from "../context/TransactionContext";

const Item=(props)=>{
    const {
        account1,
        connectWallet,
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

// import { Link } from "react-router-dom";
// import { Row, Col, Card, Button } from 'react-bootstrap'

// const Item=(props)=>{
//     return(
        
//         <div className="flex justify-center">
//         <div className="px-5 container">
//           <Row xs={1} md={2} lg={4} className="g-4 py-5">
//               <Col key={props.id} className="overflow-hidden">
//                 <Card>
//                   <Card.Img variant="top" src={props.img} />
//                   <Card.Body color="secondary">
//                     <Card.Title>{props.name}</Card.Title>
//                     <Card.Text>
//                     {props.price} ETH 
//                     </Card.Text>
//                     <Card.Text>
//                       {props.productDesc}
//                     </Card.Text>
//                   </Card.Body>
//                   <Card.Footer>
//                     <div className='d-grid'>
//                     <Link to={`/${props.id}`}><Button onClick={() =>{}} variant="primary" size="lg">
//                         Buy Now
//                          {/* for {ethers.utils.formatEther(item.totalPrice)} ETH */}
//                       </Button></Link>
//                     </div>
//                   </Card.Footer>
//                 </Card>
//               </Col>
//           </Row>
//         </div>
//         </div>
//     )
// }

// export default Item;