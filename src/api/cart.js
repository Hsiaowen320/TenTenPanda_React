import { supabase } from "../../supabaseClient";

export async function updateCart(productId, amount, isRelative = true) {
  try {
    // 先獲取當前登入使用者的 ID (確保有登入)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 未登入：只跳提醒，不要開 modal
    if (!user) {
      alert("請先登入再加入購物車喔！");
      return false;
    }

    // 定義加入購物車商品的最終數量
    let targetQuantity;

    // isRelative 是 true 代表「相對增減」
    // 先查看購物車的數量，再進行更新
    if (isRelative) {
      const response = await supabase
        .from("carts")
        .select("qty")
        .eq("product_id", productId)
        .eq("user_id", user.id)
        .maybeSingle()
        .throwOnError();

      const existingItem = response.data;

      // 購物車無此商品時，數量預設為 0
      const currentQty = existingItem ? existingItem.qty : 0;
      targetQuantity = currentQty + amount;
    } else {
      targetQuantity = amount;
    }

    // 防呆：數量不能小於 1
    if (targetQuantity <= 0) {
      alert("商品數量需大於 0");
      return false;
    }

    // 執行 upsert
    await supabase
      .from("carts")
      .upsert(
        {
          product_id: productId,
          user_id: user.id,
          qty: targetQuantity,
        },
        {
          onConflict: "user_id,product_id",
        },
      )
      .throwOnError();

    console.log("購物車已更新！");
    return true;
  } catch (error) {
    console.error("操作失敗：", error.message);
    alert("加入購物車失敗，請稍後再試");
    return false;
  }
}