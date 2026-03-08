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
import ItemDetailsBerry from "./views/itemDetailsBerry";
import ItemDetailsBerrycoco from "./views/itemDetailsBerrycoco";
import ItemDetailsCaramelcocoa from "./views/itemDetailsCaramelcocoa";
import ItemDetailsClassic from "./views/itemDetailsClassic";
import ItemDetailsCreamLemon from "./views/ItemDetailsCreamLemon";
import ItemDetailsMatcha from "./views/ItemDetailsMatcha";
import ItemDetailsCompGiftboxSix from "./views/ItemDetailsCompGiftboxSix";
import ItemDetailsCompGiftboxTwelve from "./views/ItemDetailsCompGiftboxTwelve";
import ItemDetailsGiftboxSix from "./views/ItemDetailsGiftboxSix";
import ItemDetailsGiftboxTwelve from "./views/ItemDetailsGiftboxTwelve";
import ItemDetailsFrostberry from "./views/ItemDetailsFrostberry";
import ItemDetailsSnowberry from "./views/ItemDetailsSnowberry";
import ItemDetailsSnowberryMont from "./views/ItemDetailsSnowberryMont";
import ItemDetailsWineberry from "./views/ItemDetailsWineberry";
import ItemDetailsStarberry from "./views/ItemDetailsStarberry";
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
      
      {
        path: "itemDetails-Frostberry",
        element: <ItemDetailsFrostberry />,
      },

      {
        path: "itemDetails-Starberry",
        element: <ItemDetailsStarberry />,
      },
      {
        path: "itemDetails-Berrycoco",
        element: <ItemDetailsBerrycoco />,
      },
      {
        path: "itemDetails-Snowberry",
        element: <ItemDetailsSnowberry />,
      },
      {
        path: "itemDetails-SnowberryMont",
        element: <ItemDetailsSnowberryMont />,
      },
      {
        path: "itemDetails-Wineberry",
        element: <ItemDetailsWineberry />,
      },
    ],
  },
  {
    path: "*",
    element: <h1 className="text-center mt-5">404 Not Found</h1>,
  },
]);

export default router;
