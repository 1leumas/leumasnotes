import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api"

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) { //entrar no aplicativo, validar token
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            localStorage.setItem("@leumasnotes:user", JSON.stringify(user));
            localStorage.setItem("@leumasnotes:token", token);

            api.defaults.headers.authorization = `Bearer ${token}`

            setData({ user, token });
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("couldnt sign in");
            }
        }
    }

    function signOut() {
        localStorage.removeItem("@leumasnotes:user");
        localStorage.removeItem("@leumasnotes:token");

        setData({});
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            if(avatarFile){
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            await api.put("/users", user);
            localStorage.setItem("@leumasnotes:user", JSON.stringify(user));
            
            setData({user, token: data.token});
            alert("profile updated")

        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("couldnt update profile");
            }
        }
    }

    useEffect(() => { //ficar salvo no localstorage
        const user = localStorage.getItem("@leumasnotes:user");
        const token = localStorage.getItem("@leumasnotes:token");

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })
        }

    }, [])

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user: data.user,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };