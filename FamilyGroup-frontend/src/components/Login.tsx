import { useForm } from "react-hook-form";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import '../styles/login.css';

interface User {
    username: string;
    password: string;
}

export default function Login() {

    const auth = useContext(AuthContext);

    const { register,
                handleSubmit, 
                formState: { errors } 
        } = useForm<User>();

    const onSubmit = async (data: User) => {

        try {
            const response = await api.post("/user/auth", {
                username: data.username,
                password: data.password
            });
            console.log("Usuário autenticado com sucessso!");

            const token = response.data.Authorization;

            if (token) {
                auth?.setToken(token);
            } else {
                console.log("Erro: Token não recebido");
            }

        } catch (error) {
            console.log("Erro ao fazer login", error);
        }
    }

    return (
        <div className="app-container">
            <div className="main">
                <h1>Login</h1>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder='Username...'
                        {...register("username", {required: true})}
                    >
                    </input>
                    {errors?.username?.type === 'required' && <p className='error-message'>Username must not be empty</p>}
                </div>
                
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder='Password...'
                        {...register("password", {required: true})}
                    >
                    </input>
                    {errors?.password?.type === 'required' && <p className='error-message'>E-mail must not be empty</p>}
                </div>

                <div className="form-group">
                    <button onClick={() => handleSubmit(onSubmit) ()}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}