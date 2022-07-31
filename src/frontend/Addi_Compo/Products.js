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
    link: "https://www.lenovo.com/medias/lenovo-laptop-legion-5-15-amd-subseries-hero.png?context=bWFzdGVyfHJvb3R8MTYyNjIwfGltYWdlL3BuZ3xoNTIvaDU1LzE0MTkwNDY2NjI5NjYyLnBuZ3wwNTQ1YjQxMzI0ZGJiODc2YmIwNWE3YzRiMzNlZWEzNjg1ODJkZjljNDRhOGVhYTY2YzE1N2Q5OGVhNTlhYWUw" ,
    price: "59,999",
    productDesc: "Best ever laptop",
    warrentyTime:"2years",
  },
  {
    Serial_id: "102",
    name: "Camera",
    link: "https://cdn11.bigcommerce.com/s-pkla4xn3/images/stencil/608x608/products/27338/253470/D7200-digital-cameras-13MP-DSLR-cameras-24X-Telephotos-Lens-8X-Digital-zoom-Wide-Angle-Lens-LED__11877.1553059038.jpg?c=2",
    price: "25,990",
    productDesc: "Best ever camera",
    warrentyTime:"6months",
  },
  {
    Serial_id: "103",
    name: "Earphones",
    link: "https://m.media-amazon.com/images/I/61I84V9RcSL._AC_UY327_FMwebp_QL65_.jpg",
    price: "1499",
    productDesc: "Best ever Earphones",
    warrentyTime:"1months",
  },
  {
    Serial_id: "104",
    name: "TShirt",
    link: "https://m.media-amazon.com/images/I/61qSidquxlL._AC_UL480_FMwebp_QL65_.jpg",
    price: "999",
    productDesc: "Best ever tshirt",
    warrentyTime:"2years",
  },
  {
    Serial_id: "105",
    name: "Phone",
    link: "https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_UY327_FMwebp_QL65_.jpg",
    price: "65,999",
    productDesc: "Best ever Phone",
    warrentyTime:"1year",
  },
  {
    Serial_id: "106",
    name: "SmartWatch",
    link: "https://m.media-amazon.com/images/I/61IMRs+o0iL._AC_UY327_FMwebp_QL65_.jpg",
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
