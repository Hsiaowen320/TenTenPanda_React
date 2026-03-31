import { useContext } from "react";
import CouponContext from "./CouponContext"; // 路徑視你的專案結構而定

export function useCoupon() {
  return useContext(CouponContext);
}

