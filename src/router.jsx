import { createHashRouter } from "react-router-dom";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/frontend/Home";
import Login from "./views/frontend/Login";
import Story from "./views/frontend/Story";
import Join from "./views/frontend/Join";
import Password from "./views/frontend/Password";
import Return from "./views/frontend/Return";
import Privacy from "./views/frontend/Privacy";
import News from "./views/frontend/News";
import Cart from "./views/frontend/Cart";
import Checkout from "./views/frontend/Checkout";
import OrderSuccess from "./views/frontend/OrderSuccess";
import ProductListClassic from "./views/frontend/ProductListClassic";
import ProductListGiftbox from "./views/frontend/ProductListGiftbox";
import ProductListSeasonal from "./views/frontend/ProductListSeasonal";
import MyFavorite from "./views/frontend/MyFavorite";
import MyProfile from "./views/frontend/MyProfile";
import MyOrders from "./views/frontend/MyOrders";
import SingleProductClassic from "./views/frontend/SingleProductClassic";
import SingleProductSeasonal from "./views/frontend/SingleProductSeasonal";
import SingleProductGiftbox from "./views/frontend/SingleProductGiftbox";
import MemberLayout from "./layout/MemberLayout";
import AdminLayout from "./layout/AdminLayout";
import BackendProduct from "./views/backend/BackendProduct";
import BackendOrder from "./views/backend/backendOrder";
import BackendAnnouncement from "./views/backend/backendAnnouncrment";
import BackendCoupon from "./views/backend/BackendCoupon";
import BackendLogin from "./views/backend/BackendLogin";
import BackendLayout from "./layout/BackendLayout";
import ProtectedRoute from "./components/ProtectedRoute";


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
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        path: "cart/checkout/order-success",
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        )
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
        ],
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
    path: "/admin",
    element: <BackendLayout />,
    children: [
      {
        index: true,
        element: <BackendLogin />,
      },      
      {
        element: <AdminLayout />,
        children: [     
            {
              path: "product",
              element: <BackendProduct />,
            },
            {
              path: "order",
              element: <BackendOrder />,
            },
            {
              path: "announcement",
              element: <BackendAnnouncement />,
            },
            {
              path: "coupon",
              element: <BackendCoupon />,
            },
        ],
      },
    ]
  },
  {
    path: "*",
    element: <h1 className="text-center mt-5">404 Not Found</h1>,
  },
]);

export default router;
