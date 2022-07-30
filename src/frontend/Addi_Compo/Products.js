import Item from "./Item";
import Laptop from "../../images/Laptop.png";
import Earphones from "../../images/Earphones.jpg";
import Camera from "../../images/Camera.webp";
import Phone from "../../images/Phone.png";
import SmartWatches from "../../images/SmartWatch.webp";
import TShirt from "../../images/TShirt.jpg";

const ProductsData = [
  {
    Serial_id: "101",
    name: "Laptop",
    link: Laptop,
    price: "59,999",
    productDesc: "Best ever laptop",
    warrentyTime:"2years",
  },
  {
    Serial_id: "102",
    name: "Camera",
    link: Camera,
    price: "25,990",
    productDesc: "Best ever camera",
    warrentyTime:"5months",
  },
  {
    Serial_id: "103",
    name: "Earphones",
    link: Earphones,
    price: "1499",
    productDesc: "Best ever Earphones",
    warrentyTime:"1months",
  },
  {
    Serial_id: "104",
    name: "TShirt",
    link: TShirt,
    price: "999",
    productDesc: "Best ever tshirt",
    warrentyTime:"2years",
  },
  {
    Serial_id: "105",
    name: "Phone",
    link: Phone,
    price: "65,999",
    productDesc: "Best ever Phone",
    warrentyTime:"1year",
  },
  {
    Serial_id: "106",
    name: "SmartWatch",
    link: SmartWatches,
    price: "21,599",
    productDesc: "Best ever SmartWatch",
    warrentyTime:"6months",
  },
];

const Products = () => {
  return (
    <div className="products">
      <div>
        <h1 className="tit">Products</h1>
      </div>
      <div className="firstLine">
        {ProductsData.map((product) => (
            <Item
              key={product.Serial_id}
              name={product.name}
              img={product.link}
              price={product.price}
              productDesc={product.productDesc}
              id={product.Serial_id}
              warrentyTime={product.warrentyTime}
            />
        ))}
      </div>
      {/* <div className="firstLine">
          <Item
            name="Laptop"
            img={Laptop}
            price="59,999"
            productDesc="Best ever laptop"
          />
          <Item
            name="Camera"
            img={Camera}
            price="25,990"
            productDesc="Best ever camera"
          />
          <Item
            name="Earphones"
            img={Earphones}
            price="1499"
            productDesc="Best ever earphones"
          />
          <Item
            name="Earphones"
            img={Earphones}
            price="1499"
            productDesc="Best ever earphones"
          />
        </div> */}
      {/* <div className="secondLine">
        <Item
          name="Phone"
          img={Phone}
          price="55,000"
          productDesc="Best ever mobile phone"
        />
        <Item
          name="TShirt"
          img={TShirt}
          price="599"
          productDesc="Best ever t-shirt"
        />
        <Item
          name="SmartWatch"
          img={SmartWatches}
          price="32,000"
          productDesc="Best ever smart watches"
        />
      </div> */}
    </div>
  );
};

export default Products;
