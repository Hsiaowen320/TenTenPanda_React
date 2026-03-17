import { supabase } from "../../../supabaseClient.js";
import { useState, useEffect } from "react";

function BackendMember() {
    const [openId, setOpenId] = useState(null); 
    const [memberData, setMemberData] = useState([]);
    const toggleAccordion = (id) => {
        setOpenId(prev => prev === id ? null : id); 
    };

    const getMemberInfo = async () => {
        try {
            const res = await supabase
                .from('profiles') 
                .select(`*`) 
                .throwOnError();
            setMemberData(res.data);
        } catch (error) {
            alert("資料錯誤");
        }
    };

    useEffect(() => {
        getMemberInfo();
    }, []);


    return(
        <>
            <div className="px-5 d-flex align-items-center border-bottom py-2 gap-5 bg-primary-20 br-tl-12 br-tr-12 fs-6">
                    <div className="col-1">
                        <p><i className="bi bi-person-fill"></i></p>
                    </div>
                    <div>
                        <p>名稱</p>
                    </div>
            </div>
            {/* 手風琴 */}
            {memberData.map((member, index)=>(
                <div className="accordion" key={member.id}>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className={`accordion-button d-flex align-items-center gap-3 pt-6 ${openId === member.id ? "" : "collapsed"}`} type="button" 
                            onClick={() => toggleAccordion(member.id)}>
                                <span className="col-1">{index+1}</span>
                                <span>{member.name}</span>
                            </button>
                        </h2>
                        <div
                        style={{
                            height: openId === member.id ? "auto" : 0,
                            overflow: "hidden",
                            transition: "height 0.5s ease",
                        }}>
                            <div className="accordion-body d-flex flex-column gap-5 mb-5">
                                {/* 信箱 */}
                                <div className="d-flex gap-3">
                                    <div className="col-1"></div>
                                    <div className="d-flex gap-3 w-100">
                                        <p className="col-2">信箱</p>
                                        <p>{member.email || "(無)"}</p>
                                    </div>
                                </div>
                                {/* 聯絡電話 */}
                                <div className="d-flex gap-3">
                                    <div className="col-1"></div>
                                    <div className="d-flex gap-3 w-100">
                                        <p className="col-2">連絡電話</p>
                                        <p>{member.tel}</p>
                                    </div>
                                </div>
                                {/* 收貨地址 */}
                                <div className="d-flex gap-3">
                                    <div className="col-1"></div>
                                    <div className="d-flex gap-3 w-100">
                                        <p className="col-2">收貨地址</p>
                                        <p>{member.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
        
    )
}

export default BackendMember;