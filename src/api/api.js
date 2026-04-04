import { supabase } from "../../supabaseClient";

/**
 * 取得目前登入會員的收藏清單
 */
export async function getFavorite() {
  try {
    // 先獲取當前登入使用者的 ID (確保有登入)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 未登入
    if (!user) {
      alert("請先登入才能查看收藏商品喔！");
      return null;
    }

    const response = await supabase
      .from("favorites") // 資料表名稱
      .select("*, products(*)") // 取得收藏資料 + 商品資料
      .eq("user_id", user.id) // 只撈目前登入會員的收藏
      .throwOnError();

    // 這裡寫取得收藏成功的執行程式碼
    return response.data;
  } catch (error) {
    console.error("取得收藏失敗：", error.message);
    return null;
  }
}

/**
 * 加入收藏
 */
export async function addFavorite(productId) {
  try {
    // 先獲取當前登入使用者的 ID (確保有登入)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 未登入
    if (!user) {
      alert("請先登入才能收藏商品喔！");
      return false;
    }

    // 先檢查是否已收藏
    const checkResponse = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle()
      .throwOnError();

    // 已收藏就不重複新增
    if (checkResponse.data) {
      alert("此商品已在願望清單中！");
      return false;
    }

    // 新增收藏
    await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        product_id: productId,
      })
      .throwOnError();

    // console.log("已加入願望清單！");
    return true;
  } catch (error) {
    console.error("加入收藏失敗：", error.message);
    alert("加入願望清單失敗，請稍後再試");
    return false;
  }
}