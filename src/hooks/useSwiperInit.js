import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";

export function useSwiperInit(options) {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const finalOptions = {
      ...options,
      pagination: options.pagination
        ? {
            ...options.pagination,
            el: paginationRef.current,
          }
        : undefined,
    };

    swiperInstance.current = new Swiper(swiperRef.current, finalOptions);

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [options]);

  return { swiperRef, swiperInstance, paginationRef };
}
