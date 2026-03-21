
import React from "react";
import { Link, useLocation } from "react-router-dom";
// import homeIcon from "@/assets/images/home.webp"; 

export default function Breadcrumb() {

    const location = useLocation();
    const paths = location.pathname.split("/").filter(Boolean);

    // 中文對照表
    const nameMap = {
        "admin": "管理員通道",  
        "product": "商品資訊",
        "order": "訂單資訊",
        "announcement": "消息公告",
        "coupon": "折扣優惠",
        "member": "會員列表",
    };


    return (
        <nav>
            <ol className="breadcrumb">
                {/* 首頁 */}
                <li className="breadcrumb-item d-flex align-items-center">
                    <Link to="/">
                        <i className="bi bi-house-door text-neutral-60 fs-4"></i>
                    </Link>
                </li>

                {paths.map((p, idx) => {
                    const to = "/" + paths.slice(0, idx + 1).join("/");
                    const isLast = idx === paths.length - 1;
                    const label = nameMap[p] ?? "訂單詳情";

                    return (
                        <React.Fragment key={to}>
                            {/* 分隔符 */}
                            <span className="text-neutral-60 material-symbols-outlined ms-5">
                                keyboard_double_arrow_right
                            </span>

                            {/* 麵包屑文字 */}
                            <li className="ms-5">
                                {isLast ? (
                                <p className="text-neutral-80 fw-bold fs-6">{label}</p>
                                ) : (
                                <Link to={to} className="text-neutral-80 fs-6">{label}</Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}