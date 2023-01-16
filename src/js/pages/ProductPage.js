import ProductHeader from "../components/products/ProductHeader";

import NavigationBar from "../components/menu/NavigationBar";
import AppFooter from "../components/footer/AppFooter";
import ProductDetails from "../components/products/ProductDetails";
import ProductImagePicker from "../components/products/ProductImagePicker";

export default function ProductPage() {

  const product =
    {
      name: "Asus Vivobook 15 pro",
      price: "1599.99",
      stocks: 40,
      brand: "Asus",
      model: "Vivobook 15 pro",
      type: "Laptop",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus non dolor non fringilla. Duis nec accumsan nisl. Phasellus blandit tempus elit sit amet aliquam. Duis id tortor lobortis, feugiat turpis id, pretium urna. Integer tristique sapien laoreet rhoncus tempus. Etiam vitae sollicitudin elit. Duis sit amet tortor est. Aliquam egestas, lacus ut hendrerit lobortis, lacus sem vehicula nunc, eget elementum quam libero vitae enim. Nam facilisis luctus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
      image: "https://ardes.bg/uploads/p/asus-vivobook-pro-15-n580vn-fy076-188580.jpg"
    };

  const images = [
    {
      src: "https://p.jarcomputers.com/680x680/d9/NBASUS90NB0G71M00840_680x680.jpg",
      alt: "https://p.jarcomputers.com/680x680/d9/NBASUS90NB0G71M00840_680x680.jpg"
    },
    {
      src: "https://ardes.bg/uploads/original/asus-n580gd-vivobook-pro-15-213647.jpg",
      alt: "https://ardes.bg/uploads/original/asus-n580gd-vivobook-pro-15-213647.jpg"
    },
    {
      src: "https://ardes.bg/uploads/p/asus-vivobook-pro-15-n580vn-fy076-188580.jpg",
      alt: "https://ardes.bg/uploads/p/asus-vivobook-pro-15-n580vn-fy076-188580.jpg"
    },
    {
      src: "https://www.notebookcheck.net/fileadmin/Notebooks/Asus/VivoBook_Pro_15_N580VD-DM028T/N580_Product_Photo_1A_Icicle_Gole_Web_07.jpg",
      alt: "https://www.notebookcheck.net/fileadmin/Notebooks/Asus/VivoBook_Pro_15_N580VD-DM028T/N580_Product_Photo_1A_Icicle_Gole_Web_07.jpg"
    },
    {
      src: "https://p1.akcdn.net/full/556340094.asus-vivobook-pro-15-n580gd-e4135.jpg",
      alt: "https://p1.akcdn.net/full/556340094.asus-vivobook-pro-15-n580gd-e4135.jpg"
    },
  ];

  return (
    <>
      <NavigationBar />
      <ProductHeader product={product} />
      <ProductImagePicker images={images}/>
      <ProductDetails product={product} />
      <AppFooter />
    </>
  ); 
}