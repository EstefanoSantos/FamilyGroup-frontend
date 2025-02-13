import { useForm } from 'react-hook-form';
import '../styles/newUser.css';
import api from '../services/api';

interface User {
    username: string;
    email: string;
    password: string;

}

export default function NewUserForm() {

    const { register,
            handleSubmit, 
            formState: { errors } 
    } = useForm<User>();

    const onSubmit = async (data: User) => {
        try {
            await api.post("/user/createUser", {
                username: data.username,
                email: data.email,
                password: data.password,
            });
            console.log("Usuário criado com sucesso!");
        } catch(error) {
            console.log("Erro ao criar usuário", error);
        }
    }

    return (
        <div className="app-container">
            <div className='main'>
                <h2>Create account</h2>
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
                        type="text" 
                        placeholder='E-mail...'
                        {...register("email", {required: true})}
                    >
                    </input>
                    {errors?.email?.type === 'required' && <p className='error-message'>E-mail must not be empty</p>}
                </div>

                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder='Password...'
                        {...register("password", {required: true, minLength: 7})}
                    >
                    </input>
                    {errors?.password?.type === 'required' && <p className='error-message'>Password must not be empty</p>}
                    {errors?.password?.type === 'minLength' && <p className='error-message'>Password must have at least 7 characteres</p>}
                </div>

                <div className="form-group">
                    <button onClick={() => handleSubmit(onSubmit) ()}>
                        Create User
                    </button>
                </div>
            </div>
        </div>
    )

}