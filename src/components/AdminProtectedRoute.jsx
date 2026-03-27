
import { supabase } from '../../supabaseClient.js'
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";

function AdminProtectedRoute({ children }){
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();


    //登入驗證
    const adminChecked = async () => {
        try {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError || !user) {
                return false;
            }

            const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

            if (error || !data || data.role !== "admin") {
                return false;
            }
            return true;
        } catch (error) {
            console.error("驗證錯誤:", error.message);
            return false;
        }
    }

    //刷新後執行登入驗證
    useEffect(()=>{
        const checkAdmin = async () => {
            const isAdmin = await adminChecked();
            setIsAuth(isAdmin);
            setLoading(false);
        };
        checkAdmin();
    },[])    

    if(loading) return (
        <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
   if (!isAuth) return <Navigate to="/admin/login" replace state={{ from: location }} />;

    return children;
}

export default AdminProtectedRoute;