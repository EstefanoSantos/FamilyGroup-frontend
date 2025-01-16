import { useForm } from 'react-hook-form';
import '../styles/newUserForm.css';

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

    const onSubmmit = (data: User) => {
        alert(`Welcome, ${data.username}.`);
    }

    return (
        <div className="app-container">
            <div className="form-group">
                <label>
                    Username:
                </label>
                <input 
                    type="text" 
                    placeholder='Your name'
                    {...register("username", {required: true})}
                >
                </input>
                {errors?.username?.type === 'required' && <p className='error-message'>Username must not be empty</p>}
            </div>
            
            <div className="form-group">
                <label>
                    E-mail:
                </label>
                <input 
                    type="text" 
                    placeholder='Your e-mail'
                    {...register("email", {required: true})}
                >
                </input>
                {errors?.email?.type === 'required' && <p className='error-message'>E-mail must not be empty</p>}
            </div>

            <div className="form-group">
                <label>
                    Password:
                </label>
                <input 
                    type="password" 
                    placeholder='Your password'
                    {...register("password", {required: true, minLength: 7})}
                >
                </input>
                {errors?.password?.type === 'required' && <p className='error-message'>Password must not be empty</p>}
                {errors?.password?.type === 'minLength' && <p className='error-message'>Password must have at least 7 characteres</p>}
            </div>

            <div className="form-group">
                <button onClick={() => handleSubmit(onSubmmit) ()}>
                    Create User
                </button>
            </div>
        </div>
    )

}