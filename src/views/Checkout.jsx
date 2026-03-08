import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink,useNavigate } from "react-router";
import { supabase } from '../../supabaseClient.js'

const Checkout = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [creditCard, setCreditCard] = useState({
        part1: "",
        part2: "",
        part3: "",
        part4: "",
        expiry: "",
        cvv: ""
    });


    useEffect(()=>{
        (async()=>{
            const { data: { user } } = await supabase.auth.getUser();
            const res = await supabase
                .from('carts') 
                .select(`*, profiles(*), products(*)`) 
                .eq('user_id', user.id)      
                .throwOnError(); 
            setCart(res.data);            
        })()
    },[])

  useEffect(() => {
    setTotalPrice(
      cart.reduce((sum, item) => sum + item.products.price * item.qty, 0)
    );
  }, [cart]);

    const { 
        register, 
        handleSubmit,
        formState:{errors}
    } = useForm({
        defaultValues: {
        customername: "",
        email: ""
        },mode: 'onChange',
    });

   const onSubmit = async(data) => {
        // const orderData = {
        //     data: {
        //         user: {
        //             name: data.customername,
        //             email: data.email,
        //             tel: data.phone,
        //             address: data.address
        //         },
        //         message: data.message
        //     }
        // }
        // try {
        //     const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/order`, orderData);
        //     navigate("/cart/checkout/order-success");
        // } catch (error) {
        //     console.log(error);
        // } 
    };

    return (
        <>
            <main className="order-bg">
                <section className="py-lg-14 py-8 container">
                    {/* <!-- 進度條 --> */}
                    <ol
                    className="d-flex justify-content-between p-lg-8 px-2 position-relative mb-lg-10 mb-8"
                    >
                    <li className="d-flex flex-column align-items-center">
                        <div
                        className="bg-primary-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                        >
                        <i className="bi bi-check2 text-white fs-lg-5 fs-7"></i>
                        </div>
                        <p className="fw-bold fs-lg-6 fs-8 text-primary-40">查看購物車</p>
                    </li>
                    <li className="d-flex flex-column align-items-center">
                        <div
                        className="bg-primary-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                        >
                        <p className="text-white fs-lg-6 fs-8" style={{ marginLeft: '1px' }}>2</p>
                        </div>
                        <p className="fw-bold fs-lg-6 fs-8 text-primary-40">填寫收件資料</p>
                    </li>
                    <li className="d-flex flex-column align-items-center">
                        <div
                        className="bg-white border border-neutral-40 mb-lg-3 mb-2 order-progress-dot rounded-circle d-flex justify-content-center align-items-center"
                        >
                        <p className="text-neutral-60 fs-lg-6 fs-8" style={{ marginLeft: '1px' }}>
                            3
                        </p>
                        </div>
                        <p className="fw-bold fs-lg-6 fs-8 text-neutral-60">確認付款</p>
                    </li>
                    {/* <!-- 線條 --> */}
                    <div
                        className="order-progress-leftline bg-primary-40 position-absolute translate-middle-y"
                    ></div>
                    <div
                        className="order-progress-rightline bg-neutral-40 position-absolute translate-middle-y"
                    ></div>
                    </ol>
                    {/* <!-- 訂單資訊 --> */}
                    <div className="row">
                    <div className="col-lg-8">
                        <div className="bg-white p-lg-8 rounded-4">
                            <h1 className="fw-bold text-neutral-100 fs-4 mb-6">收件人資訊</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-8 gap-lg-6" id="myForm">
                                {/* 收件人姓名與電話 */}
                                <div className="d-flex gap-lg-6 gap-8 flex-column flex-lg-row">
                                    <div className="w-100">
                                        <label
                                            htmlFor="order-name"
                                            className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                                        >收件人姓名
                                        </label>                                        
                                        <input
                                            type="text"
                                            className={`form-control ${errors.customername && "border border-primary-40"}`}
                                            id="order-name"
                                            placeholder="例如：王小明"
                                            {...register("customername",{
                                                required: "※請輸入姓名"
                                            })}
                                        />
                                        {errors.customername && (<div className="text-primary-60 pt-1 text-start">{errors.customername.message}</div>)}
                                    </div>
                                    <div className="w-100">
                                        <label
                                        htmlFor="order-phone"
                                        className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                                        >收件人電話</label>
                                        <input
                                        type="text"
                                        className={`form-control ${errors.phone && "border border-primary-40"}`}
                                        id="order-phone"
                                        placeholder="例如：0912-345678"
                                        {...register("phone",{
                                            required: "※請輸入手機號碼",
                                            pattern: {
                                                value: /^09\d{2}-\d{6}$/, 
                                                message: "※請依照手機格式 09XX-XXXXXX 輸入"
                                            }
                                        })}
                                        />
                                        {errors.phone && (<div className="text-primary-60 pt-1 text-start">{errors.phone.message}</div>)}
                                    </div>
                                </div>
                                {/* 電子信箱 */}
                                <div className="w-100">
                                    <label
                                        htmlFor="order-email"
                                        className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                                        >電子信箱</label
                                    >
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email && "border border-primary-40"}`}
                                        id="order-email"
                                        placeholder="例如：example@email.com"
                                        {...register("email", {
                                            required: "※請輸入電子信箱",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "※請輸入有效的電子信箱"
                                            }
                                        })}
                                    />
                                    {errors.email && (<div className="text-primary-60 pt-1 text-start">{errors.email.message}</div>)}
                                </div>
                                {/* 收件地址 */}
                                <div className="w-100">
                                    <label
                                        htmlFor="order-address"
                                        className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                                        >收件地址</label
                                    >
                                    <input
                                        type="text"
                                        className={`form-control ${errors.address && "border border-primary-40"}`}
                                        id="order-address"
                                        placeholder="例如：忠孝東路四段 123 號 5 樓"
                                        {...register("address",{
                                            required: "※請輸入地址"
                                        })}
                                    />
                                    {errors.address && (<div className="text-primary-60 pt-1 text-start">{errors.address.message}</div>)}
                                </div>
                                {/* 付款方式 */}
                                <div>
                                    <label htmlFor="paymentMethod" className="lh-base ps-2 fs-lg-9 fs-7 mb-2">付款方式</label>
                                    <select id="paymentMethod"  className={`form-select ${errors.paymentMethod && "border border-primary-40"}`} 
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}        
                                    >
                                        <option value="" hidden>請選擇付款方式</option>
                                        <option value="cod">貨到付款</option>
                                        <option value="credit-card">線上刷卡</option>      
                                    </select>
                                </div>
                                {paymentMethod === "credit-card" && (
                                    <div>
                                        {/* 卡號 */}
                                        <div className="pay-online-input-creditcard mb-3">
                                            <label htmlFor="credit-part1" className="lh-base ps-2 fs-lg-9 fs-7 mb-2">
                                                信用卡卡號
                                            </label>
                                            <div className="d-flex gap-lg-2 gap-1 align-items-center">
                                                <input type="text" id="credit-part1" className="form-control text-centefs-7 fs-lg-9 px-4" maxLength={4} />
                                                <i className="bi bi-dash-lg text-neutral-60 d-lg-block d-none"></i>
                                                <i className="bi bi-dash text-neutral-60 d-block d-lg-none"></i>
                                                <input type="text" id="credit-part2" className="form-control text-centefs-7 fs-lg-9 px-4" maxLength={4} />
                                                <i className="bi bi-dash-lg text-neutral-60 d-lg-block d-none"></i>
                                                <i className="bi bi-dash text-neutral-60 d-block d-lg-none"></i>
                                                <input type="text" id="credit-part3" className="form-control text-centefs-7 fs-lg-9 px-4" maxLength={4} />
                                                <i className="bi bi-dash-lg text-neutral-60 d-lg-block d-none"></i>
                                                <i className="bi bi-dash text-neutral-60 d-block d-lg-none"></i>
                                                <input type="text" id="credit-part4" className="form-control text-centefs-7 fs-lg-9 px-4" maxLength={4} />
                                            </div>
                                        </div>
                                        {/* 有效期限 & CVV */}
                                        <div className="pay-online-input-creditcard-date mt-lg-6 mt-8">
                                            <div className="d-flex gap-lg-6 gap-4 justify-content-start align-items-start">
                                                <div>
                                                    <label htmlFor="credit-expiry" className="lh-base ps-2 fs-lg-9 fs-7 mb-2">
                                                        有效期限
                                                    </label>
                                                    <input type="text" id="credit-expiry" className="form-control" maxLength={4} placeholder="例如：MMYY" />
                                                </div>
                                                <div>
                                                    <label htmlFor="credit-cvv" className="lh-base ps-2 fs-lg-9 fs-7 mb-2">
                                                         安全碼 (CVV / CVC)
                                                    </label>
                                                    <input type="text" id="credit-cvv" className="form-control" maxLength={3} placeholder="例如：000" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* 其他需求 */}
                                <div>
                                    <label htmlFor="order-card" className="lh-base ps-2 fs-lg-9 fs-7 mb-2"
                                        >其他需求
                                    </label>
                                    <textarea
                                        className="form-control mb-lg-5 pb-0"
                                        id="order-card"
                                        rows="8"
                                        placeholder="例如：甜點禮盒請幫我附上生日小卡。（最多可輸入 150 字）"
                                        maxLength="150"
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-8 mt-lg-0">
                        <div className="orer-details-bg py-lg-8 py-6 px-4 px-lg-6 rounded-4">
                        <h2 className="fw-bold fs-4 text-neutral-100">訂單明細</h2>
                        <div
                            className="mt-5 mt-lg-8 d-flex flex-column gap-lg-5 gap-1 pb-2 pb-lg-6 border-bottom border-neutral-40"
                        >
                            {cart.map(item => {
                                return (
                                    <div className="d-flex flex-column gap-1 py-2" key={item.id}>
                                        <h3 className="fs-6 text-neutral-100">{item.products.name}</h3>
                                        <div className="d-flex justify-content-between fs-6">
                                            <p className="orer-details-num-color">x{item.qty}</p>
                                            <p>NT$ {item.products.price * item.qty}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="pt-0 pt-lg-2">
                            <div className="pt-4">
                            <h3
                                className="fw-bold fs-lg-4 fs-5 text-neutral-100 pb-lg-4 pb-3"
                            >
                                合計
                            </h3>
                            <div
                                className="py-6 d-flex flex-column gap-4 border-bottom border-neutral-40 mb-3 mb-lg-4"
                            >
                                <div
                                className="d-flex justify-content-between fs-6 text-neutral-100"
                                >
                                <p>小計</p>
                                <p>NT$ {totalPrice}</p>
                                </div>
                                <div
                                className="d-flex justify-content-between fs-6 text-neutral-100"
                                >
                                <p>運費</p>
                                <p>NT$ 65</p>
                                </div>
                                <div
                                className="d-flex justify-content-between fs-6 text-neutral-100"
                                >
                                <p>優惠折扣</p>
                                <p>− NT$ 100</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h3 className="fs-4 fs-lg-6 text-neutral-100 fw-bold">總計</h3>
                                <p className="fs-5 text-primary-80 fw-bold">NT$ {totalPrice + 65 - 100}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div
                        className="mt-lg-10 mt-8 d-flex flex-column justify-content-center align-items-center gap-4 gap-lg-6"
                        >
                        <button type="button" className="btn btn-primary-40 text-white w-100 py-4 fs-6"
                            onClick={() => document.getElementById("myForm").requestSubmit()}
                        >確認付款</button>    
                        <button className="btn btn-outline-primary-80 w-100 py-4 fs-6" onClick={() => navigate(-1)}>
                            編輯購物車
                        </button>
                        </div>
                    </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Checkout;
