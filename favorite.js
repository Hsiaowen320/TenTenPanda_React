// 收藏
document.addEventListener("DOMContentLoaded", () => {
  const favoritesList = document.getElementById("favorites-list");
  const pagination = document.getElementById("favorites-pagination"); // 下面放頁碼
  const ITEMS_PER_PAGE = 6;

  // 商品資料
  const products = [
    {
      id: "classic",
      name: "經典甜甜",
      price: 65,
      img: "../assets/%E7%B6%93%E5%85%B8%E7%94%9C%E7%94%9C-Cs5Etp7x.webp",
      padding: "p-0",
    },
    {
      id: "berry",
      name: "莓果甜甜",
      price: 65,
      img: "../assets/%E8%8E%93%E6%9E%9C%E7%94%9C%E7%94%9C-Ifbh7mOU.webp",
      padding: "p-0",
    },
    {
      id: "sesame",
      name: "芝麻甜甜",
      price: 65,
      img: "../assets/%E8%8A%9D%E9%BA%BB%E7%94%9C%E7%94%9C-DoL5nBCi.webp",
      padding: "p-0",
    },
    {
      id: "matcha",
      name: "抹茶甜甜",
      price: 65,
      img: "../assets/%E6%8A%B9%E8%8C%B6%E7%94%9C%E7%94%9C-JW-VG4UK.webp",
      padding: "p-0",
    },
    {
      id: "caramelcocoa",
      name: "焦糖可可甜甜",
      price: 65,
      img: "../assets/%E7%84%A6%E7%B3%96%E5%8F%AF%E5%8F%AF%E7%94%9C%E7%94%9C-0uhqrfN7.webp",
      padding: "p-0",
    },
    {
      id: "creamlemon",
      name: "生乳檸檬甜甜",
      price: 65,
      img: "../assets/%E7%94%9F%E4%B9%B3%E6%AA%B8%E6%AA%AC%E7%94%9C%E7%94%9C-lF70gClV.webp",
      padding: "p-0",
    },
    {
      id: "starberry",
      name: "星塵草莓",
      price: 95,
      img: "../assets/%E6%98%9F%E5%A1%B5%E8%8D%89%E8%8E%93%EF%BC%88%E5%85%89%E6%9A%88%EF%BC%89-Du1Aj3hz.webp",
      padding: "p-18",
    },
    {
      id: "snowberry",
      name: "白雪綿霜莓",
      price: 95,
      img: "../assets/%E7%99%BD%E9%9B%AA%E7%B6%BF%E9%9C%9C%E8%8E%93%EF%BC%88%E5%85%89%E6%9A%88%EF%BC%89-B5DDcb2-.webp",
      padding: "p-18",
    },
    {
      id: "berrycoco",
      name: "莓果可可",
      price: 95,
      img: "../assets/%E8%8E%93%E6%9E%9C%E5%8F%AF%E5%8F%AF%EF%BC%88%E5%85%89%E6%9A%88%EF%BC%89-Cb11tIyi.webp",
      padding: "p-18",
    },
    {
      id: "SnowberryMont",
      name: "雪莓蒙布朗",
      price: 95,
      img: "../assets/%E9%9B%AA%E8%8E%93%E8%92%99%E5%B8%83%E6%9C%97%EF%BC%88%E5%85%89%E6%9A%88%EF%BC%89-B6R64g0i.webp",
      padding: "p-18",
    },
    {
      id: "wineberry",
      name: "熱紅酒莓果",
      price: 95,
      img: "../assets/%E7%86%B1%E7%B4%85%E9%85%92%E8%8E%93%E6%9E%9C%EF%BC%88%E5%85%89%E6%9A%88%EF%BC%89-70SzG_lH.webp",
      padding: "p-18",
    },
    {
      id: "frostBerry",
      name: "莓果夾心",
      price: 80,
      img: "../assets/%E8%8E%93%E6%9E%9C%E5%A4%BE%E5%BF%83%EF%BC%88%E5%85%89%E6%9A%88%EF%BC%89-BXFX6iwp.webp",
      padding: "p-25",
    },
    {
      id: "giftbox_Six",
      name: "經典甜甜-禮盒-6入",
      price: 360,
      img: "../assets/%E7%B6%93%E5%85%B8%E7%94%9C%E7%94%9C-%E7%A6%AE%E7%9B%92-6%E5%85%A5-%E5%8E%BB%E8%83%8C-DLwmNRmF.webp",
      padding: "p-25",
    },
    {
      id: "giftbox_twelve",
      name: "經典甜甜-禮盒-12入",
      price: 750,
      img: "../assets/%E7%B6%93%E5%85%B8%E7%94%9C%E7%94%9C-%E7%A6%AE%E7%9B%92-12%E5%85%A5-%E5%8E%BB%E8%83%8C-BSzD1Buh.webp",
      padding: "p-25",
    },
    {
      id: "comp_giftbox_Six",
      name: "綜合甜甜-禮盒-6入",
      price: 360,
      img: "../assets/%E7%B6%9C%E5%90%88%E7%94%9C%E7%94%9C-%E7%A6%AE%E7%9B%92-6%E5%85%A5-%E5%8E%BB%E8%83%8C-BYC-VGdj.webp",
      padding: "p-25",
    },
    {
      id: "comp_giftbox_twelve",
      name: "綜合甜甜-禮盒-12入",
      price: 750,
      img: "../assets/%E7%B6%9C%E5%90%88%E7%94%9C%E7%94%9C-%E7%A6%AE%E7%9B%92-12%E5%85%A5-%E5%8E%BB%E8%83%8C-BE_PNVOF.webp",
      padding: "p-25",
    },
  ];
  // 收藏商品篩選
  const favorites = products.filter(
    (p) => localStorage.getItem(p.id) === "true",
  );
  // 頁碼
  let currentPage = 1;
  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);

  function renderPage(page) {
    favoritesList.innerHTML = ""; // 先清空
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = favorites.slice(start, end);

    // 渲染收藏清單
    pageItems.forEach((p) => {
      const div = document.createElement("div");
      div.classList.add("col-12", "col-lg-6", "mb-8", "favorite-item");
      div.dataset.id = p.id;
      div.innerHTML = `
            <div class="mb-lg-8 product" data-id="${p.id}">
                <a href="./item_details-${p.id}.html" class="position-relative d-inline-block">
                    <div class="img-box ${p.padding}">
                        <img src="${p.img}" alt="${p.name}" class="img-fluid">
                    </div>
                    <button
                        type="button"
                        class="favorite-btn active position-absolute top-0 end-0 fs-3 fs-lg-1"
                        data-bs-toggle="modal"
                        data-bs-target="#favoriteModal"
                    >
                        <i class="bi bi-heart empty"></i>
                        <i class="bi bi-heart-fill full"></i>
                    </button>
                </a>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h2 class="fs-6 mb-2">${p.name}</h2>
                        <p class="fs-6">$ ${p.price}</p>
                    </div>
                    <button
                        type="button"
                        class="producList-cart-btn br-999"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal">
                        <i class="bi bi-cart2 fs-3 fs-lg-2"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
      favoritesList.appendChild(div);
    });
    renderPagination();
  }
  function renderPagination() {
    // 清除舊頁碼（保留左右箭頭）
    pagination.querySelectorAll(".page-number").forEach((n) => n.remove());

    // 動態生成頁碼
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("px-3", "page-number");
      if (i === currentPage) li.classList.add("text-primary-60");
      li.textContent = i;
      li.dataset.page = i;

      // 插入到左右箭頭中間
      const nextBtn = document.getElementById("next-page");
      pagination.insertBefore(li, nextBtn);

      li.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });
    }

    // 左右箭頭
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");

    prevBtn.style.pointerEvents = currentPage === 1 ? "none" : "auto";
    nextBtn.style.pointerEvents = currentPage === totalPages ? "none" : "auto";

    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    };
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    };
  }
  renderPage(currentPage);
});

// 收藏
document.addEventListener("DOMContentLoaded", () => {
  const favoritesList = document.getElementById("favorites-list");

  favoritesList.addEventListener("click", (e) => {
    const btn = e.target.closest(".favorite-btn");
    if (!btn) return;

    e.preventDefault(); // 阻止 <a> 跳轉
    e.stopPropagation(); // 阻止事件冒泡

    const item = btn.closest(".favorite-item");
    const itemId = item.dataset.id;

    btn.classList.toggle("active");

    if (btn.classList.contains("active")) {
      localStorage.setItem(itemId, "true");
      btn.setAttribute("data-bs-target", "#cancelFavoriteModal");
      favoriteModal.show();
    } else {
      localStorage.removeItem(itemId);
      btn.setAttribute("data-bs-target", "#favoriteModal");
    }
  });

  // 初始化愛心狀態
  const favBtns = document.querySelectorAll(".favorite-btn");
  favBtns.forEach((btn) => {
    const product = btn.closest(".product");
    const itemId = product.dataset.id;

    if (localStorage.getItem(itemId) === "true") {
      btn.classList.add("active");
      btn.setAttribute("data-bs-target", "#cancelFavoriteModal");
    }
  });
});
