import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'


const ProductsData = [
    {
      Serial_id: "101",
      name: "Laptop",
      link: "../../images/Laptop.png",
      price: "59,999",
      productDesc: "Best ever laptop",
    },
    {
      Serial_id: "102",
      name: "Camera",
      link: "../../images/Camera.webp",
      price: "25,990",
      productDesc: "Best ever camera",
    },
    {
      Serial_id: "103",
      name: "Earphones",
      link: "../../images/Laptop.png",
      price: "1499",
      productDesc: "Best ever Earphones",
    },
    {
      Serial_id: "1026",
      name: "Laptop",
      link: "../../images/Laptop.png",
      price: "59,999",
      productDesc: "Best ever laptop",
    },
    {
      Serial_id: "1035",
      name: "Laptop",
      link: "../../images/Laptop.png",
      price: "59,999",
      productDesc: "Best ever laptop",
    },
    {
      Serial_id: "1024",
      name: "Laptop",
      link: "../../images/Laptop.png",
      price: "59,999",
      productDesc: "Best ever laptop",
    },
    {
      Serial_id: "1034",
      name: "Laptop",
      link: "../../images/Laptop.png",
      price: "59,999",
      productDesc: "Best ever laptop",
    },
  ];
  
export const NewNFT = () => {
  return (
    <div><div className="px-5 container">
    <Row xs={1} md={2} lg={4} className="g-4 py-5">
      {ProductsData.map((item, idx) => (
        <Col key={idx} className="overflow-hidden">
          <Card>
            <Card.Img variant="top" src={item.image} />
            <Card.Body color="secondary">
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.productDesc}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <div className='d-grid'>
                <Button onClick={()=>{}} variant="primary" size="lg">
                  Create
                   {/* for {ethers.utils.formatEther(item.totalPrice)} ETH */}
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  </div></div>
  )
}
export default NewNFT;
