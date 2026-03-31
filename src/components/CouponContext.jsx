import { createContext, useState } from "react";

const CouponContext = createContext();
export default CouponContext;

export function CouponProvider({ children }) {
  const [couponCode, setCouponCode] = useState(null); 
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

