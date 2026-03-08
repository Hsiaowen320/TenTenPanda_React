import { useEffect, useRef } from "react";

/**
 * 共用 news hover 預覽切換 hook
 *
 * 功能：
 * - 監聽 .list-group 裡面的 label[for^="n"]
 * - hover / focus 時，替外層 news 容器加上 data-hover="1~4"
 * - mouseleave / focusout 時移除 data-hover
 *
 * 使用方式：
 * const { newsRef } = useNewsHoverPreview();
 * <div className="news" ref={newsRef}>...</div>
 */
export function useNewsHoverPreview() {
  // 綁在外層 .news 容器上
  const newsRef = useRef(null);

  useEffect(() => {
    const news = newsRef.current;
    if (!news) return;

    // 找到消息清單容器
    const list = news.querySelector(".list-group");
    if (!list) return;

    /**
     * 滑鼠移入某則新聞時
     * 透過 label 的 htmlFor（例如 n3）
     * 轉成 data-hover="3"
     */
    const handleMouseOver = (e) => {
      const label = e.target.closest('label[for^="n"]');
      if (!label || !list.contains(label)) return;

      news.setAttribute("data-hover", label.htmlFor.replace("n", ""));
    };

    /**
     * 鍵盤 focus 進入時也做同樣處理
     * 方便無障礙操作
     */
    const handleFocusIn = (e) => {
      const label = e.target.closest('label[for^="n"]');
      if (!label || !list.contains(label)) return;

      news.setAttribute("data-hover", label.htmlFor.replace("n", ""));
    };

    /**
     * 離開清單或失去焦點時，移除 hover 狀態
     */
    const clearHover = () => {
      news.removeAttribute("data-hover");
    };

    // 綁定事件
    list.addEventListener("mouseover", handleMouseOver);
    list.addEventListener("focusin", handleFocusIn);
    list.addEventListener("mouseleave", clearHover);
    list.addEventListener("focusout", clearHover);

    // 清理事件
    return () => {
      list.removeEventListener("mouseover", handleMouseOver);
      list.removeEventListener("focusin", handleFocusIn);
      list.removeEventListener("mouseleave", clearHover);
      list.removeEventListener("focusout", clearHover);
    };
  }, []);

  return { newsRef };
}