import { useEffect } from "react";
import { useAuthContext } from "../components/context/Auth";
import {useRouter} from "next/router";


const SignIn = () => {
    const {user,login} = useAuthContext();
    const router = useRouter();

    useEffect(()=>{
        if(user.loading) return
        if(user.token){
            
            router.push("/")
        }
    },[user])
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height: "800px"}}>
            <form style={styles.form} onSubmit={(e)=>{
                e.preventDefault()
                login({
                    login: e.target.email.value,
                    password: e.target.password.value
                })
            }}>
                <div className="mb-3">
                    <label className="form-label">
                        Логин
                    </label>
                    <input name="email"
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Пароль
                    </label>
                    <input name="password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Войти
                </button>
            </form>
        </div>

    )
}


export default SignIn;


const styles = {
    form: {
        "width":"400px"
    }
}