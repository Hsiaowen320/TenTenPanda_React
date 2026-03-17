// React 入口文件
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";
import { CouponProvider } from "./components/CouponContext.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <StrictMode>
    <CouponProvider>  
      <App />
    </CouponProvider>  
  </StrictMode>,
);
