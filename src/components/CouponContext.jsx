import { createContext, useContext, useState } from "react";

const CouponContext = createContext();

export function CouponProvider({ children }) {
  const [couponCode, setCouponCode] = useState(""); 
  const [couponDiscount, setCouponDiscount] = useState(0); 

  return (
    <CouponContext.Provider
      value={{
        couponCode, 
        setCouponCode,
        couponDiscount,
        setCouponDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

// 自訂 Hook
export function useCoupon() {
  return useContext(CouponContext);
}