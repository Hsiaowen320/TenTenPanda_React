import { supabase } from "../../supabaseClient";

/**
 * 取得目前登入會員的收藏清單
 */
export async function getFavorite(showAlert = false) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (showAlert) {
        alert("請先登入才能收藏商品喔！");
      }
      return [];
    }

    const response = await supabase
      .from("favorites")
      .select("*, products(*)")
      .eq("user_id", user.id)
      .throwOnError();

    return response.data || [];
  } catch (error) {
    console.error("取得收藏失敗：", error.message);
    return [];
  }
}

/**
 * 加入收藏
 */
export async function addFavorite(productId) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("請先登入才能收藏商品喔！");
      return false;
    }

    const response = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle()
      .throwOnError();

    if (response.data) {
      alert("此商品已在願望清單中！");
      return false;
    }

    await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        product_id: productId,
      })
      .throwOnError();

    return true;
  } catch (error) {
    console.error("加入收藏失敗：", error.message);
    alert("加入願望清單失敗，請稍後再試");
    return false;
  }
}

/**
 * 取消收藏
 */
export async function removeFavorite(productId) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("請先登入才能操作收藏喔！");
      return false;
    }

    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .throwOnError();

    return true;
  } catch (error) {
    console.error("取消收藏失敗：", error.message);
    alert("取消收藏失敗，請稍後再試");
    return false;
  }
}

/**
 * 切換收藏狀態
 * 已收藏 -> 刪除
 * 未收藏 -> 新增
 */
export async function toggleFavorite(productId) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("請先登入才能收藏商品喔！");
      return { success: false, isFavorite: false };
    }

    const response = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle()
      .throwOnError();

    const favoriteItem = response.data;

    if (favoriteItem) {
      await supabase
        .from("favorites")
        .delete()
        .eq("id", favoriteItem.id)
        .throwOnError();

      return { success: true, isFavorite: false };
    }

    await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        product_id: productId,
      })
      .throwOnError();

    return { success: true, isFavorite: true };
  } catch (error) {
    console.error("切換收藏失敗：", error.message);
    alert("操作收藏失敗，請稍後再試");
    return { success: false, isFavorite: false };
  }
}