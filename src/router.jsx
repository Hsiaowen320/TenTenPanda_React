import { createHashRouter } from "react-router-dom";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import Story from "./views/Story";
import Join from "./views/Join";
import Password from "./views/Password";
import Return from "./views/Return";
import Privacy from "./views/Privacy";
import News from "./views/News";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import OrderSuccess from "./views/OrderSuccess";
import ProductListClassic from "./views/ProductListClassic";
import ProductListGiftbox from "./views/ProductListGiftbox";
import ProductListSeasonal from "./views/ProductListSeasonal";
import MyFavorite from "./views/MyFavorite";
import MyProfile from "./views/MyProfile";
import MyOrders from "./views/MyOrders";
import SingleProductClassic from "./views/SingleProductClassic";
import SingleProductSeasonal from "./views/SingleProductSeasonal";
import SingleProductGiftbox from "./views/SingleProductGiftbox";
import MemberLayout from "./layout/MemberLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "story",
        element: <Story />,
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "password",
        element: <Password />,
      },
      {
        path: "return",
        element: <Return />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "member",
        element: <MemberLayout />,
        children: [
          {
            path: "myProfile",
            element: <MyProfile />,
          },  
          {
            path: "myorders",
            element: <MyOrders />,
          },  
          {
            path: "myfavorite",
            element: <MyFavorite />,
          },    
        ] 
      },   
      {
        path: "productList-classic",
        element: <ProductListClassic />,
      },
      {
        path: "productList-classic/:id",
        element: <SingleProductClassic />,
      },

      {
        path: "productList-giftbox",
        element: <ProductListGiftbox />,
      },
      {
        path: "productList-giftbox/:id",
        element: <SingleProductGiftbox />,
      },
      {
        path: "productList-seasonal",
        element: <ProductListSeasonal />,
      },      
      {
        path: "productList-seasonal/:id",
        element: <SingleProductSeasonal />,
      },
    ],
  },
  {
    path: "*",
    element: <h1 className="text-center mt-5">404 Not Found</h1>,
  },
]);

export default router;
