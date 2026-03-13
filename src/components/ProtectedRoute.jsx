
import { supabase } from '../../supabaseClient.js'
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }){
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    //刷新後執行登入驗證
    
    useEffect(()=>{
        const checkSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;

                if (session?.user) {
                    setIsAuth(true); // 有登入
                    navigate('/cart');
                } else {
                    setIsAuth(false); // 沒登入
                }
            } catch (error) {
                console.error("驗證使用者失敗：", error);
                setIsAuth(false);
            } finally {
                setLoading(false); // 不論成功或失敗都結束 loading
            }
        };

    checkSession();
    },[])    

    if(loading) return (
        <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    if(!isAuth) return <Navigate to={`/login?redirect=${encodeURIComponent  (location.pathname)}`} replace />

    return children;
}

export default ProtectedRoute;

