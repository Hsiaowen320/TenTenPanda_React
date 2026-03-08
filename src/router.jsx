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
import ProductListClassic from "./views/ProductListClassic";
import ProductListGiftbox from "./views/ProductListGiftbox";
import ProductListSeasonal from "./views/ProductListSeasonal";
import SingleProductClassic from "./views/SingleProductClassic";
import SingleProductSeasonal from "./views/SingleProductSeasonal";
import SingleProductGiftbox from "./views/SingleProductGiftbox";

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
