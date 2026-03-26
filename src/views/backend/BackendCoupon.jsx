import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

/**
 * 這裡先假設你有 adminChecked()
 * 如果你已經有共用函式，請改成正確 import
 */
const adminChecked = async () => {
  const admin = localStorage.getItem("isAdmin");
  if (admin === null) return undefined;
  return admin === "true";
};

const BackendCoupon = () => {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * 取得所有折扣券
   */
  const getAllCoupons = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      // 確認是否為管理者
      const checked = await adminChecked();

      // 尚未登入的情況
      //   if (checked === undefined) {
      //     alert("請先登入！");
      //     navigate("/login", { replace: true });
      //     return [];
      //   }

      // 非管理者的情況
      //   if (!checked) {
      //     alert("無此權限！");
      //     navigate("/", { replace: true });
      //     return [];
      //   }

      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("取得優惠券失敗：", error.message);
      setErrorMessage("優惠券資料取得失敗，請稍後再試");
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * 初始化頁面
   */
  useEffect(() => {
    const initPage = async () => {
      const data = await getAllCoupons();
      setCoupons(data);
    };

    initPage();
  }, []);

  /**
   * 點擊編輯
   */
  const handleEdit = (id) => {
    navigate(`/admin/couponEdit/${id}`);
  };

  /**
   * 點擊刪除
   * 目前先前端移除，之後可接 delete API
   */
  const handleDelete = (id, title) => {
    const confirmed = window.confirm(`確定要刪除優惠券「${title}」嗎？`);
    if (!confirmed) return;

    setCoupons((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * 狀態文字
   */
  const getStatusText = (isActive) => {
    return isActive ? "啟用中" : "未啟用";
  };

  return (
    <div className="coupon-page">
      <main className="coupon-content">
        <div className="coupon-header">
          <h2 className="coupon-page-title">折扣優惠</h2>

          <button
            type="button"
            className="coupon-add-btn"
            onClick={() => navigate("/admin/CouponCreate")}
          >
            ＋ 新增優惠券
          </button>
        </div>

        {/* 載入中 */}
        {loading && (
          <div className="coupon-status-box">
            <p>優惠券載入中...</p>
          </div>
        )}

        {/* 錯誤 */}
        {!loading && errorMessage && (
          <div className="coupon-status-box error">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* 無資料 */}
        {!loading && !errorMessage && coupons.length === 0 && (
          <div className="coupon-status-box">
            <p>目前沒有優惠券資料</p>
          </div>
        )}

        {/* 優惠券列表 */}
        {!loading && !errorMessage && coupons.length > 0 && (
          <div className="coupon-list">
            {coupons.map((coupon) => (
              <div className="coupon-row" key={coupon.id}>
                <div className="coupon-info-block">
                  {/* 折扣優惠碼 */}
                  <h3 className="coupon-code">{coupon.id}</h3>

                  {/* 優惠碼名稱 */}
                  <p className="coupon-title">{coupon.title}</p>

                  {/* 額外資訊 */}
                  <div className="coupon-meta">
                    <span>折扣金額：${coupon.discount_value}</span>
                    <span>最低消費：${coupon.min_spend}</span>
                    <span
                      className={`coupon-status ${
                        coupon.is_active ? "active" : "inactive"
                      }`}
                    >
                      {getStatusText(coupon.is_active)}
                    </span>
                  </div>
                </div>

                <div className="coupon-action-group">
                  <button
                    type="button"
                    className="coupon-icon-btn"
                    onClick={() => handleEdit(coupon.id)}
                    aria-label={`編輯 ${coupon.title}`}
                    title="編輯"
                  >
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  </button>

                  <button
                    type="button"
                    className="coupon-icon-btn"
                    onClick={() => handleDelete(coupon.id, coupon.title)}
                    aria-label={`刪除 ${coupon.title}`}
                    title="刪除"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BackendCoupon;
