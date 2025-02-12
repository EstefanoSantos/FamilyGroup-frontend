import { SetStateAction, useState} from "react";
import api from "../services/api";
import '../styles/header.css';

interface User {
  id: number,
  username: string,
  email: string,
  password: string,
}

function HeadersForm() {

  const [inputField, setInputField] = useState("");
  const [user, setUser] = useState<User>();
  const [wasUserFound, setWasUserFound] = useState(false);
  const [error, setError] = useState('');

  async function getUserByName(username: string) {

    await api
      .get<User>(`/user/getUser/${username}`)
      .then((res: { data: SetStateAction<User | undefined>; }) => {
        setUser(res.data);
        setWasUserFound(true);
        setError("");

      })
      .catch((error: { response: { status: number; data: { message: string; }; }; }) => {
        if (error.response) {
          
          let errorMessage = error.response.data?.message || `User ${username} not found.`;

          if (error.response.status === 500) {
            errorMessage = "Internal server error.";
          } else if (error.response.status === 400) {
            errorMessage = "Request error.";
          }

          setError(errorMessage);
          setWasUserFound(false);
        }

        setTimeout(() => {
          setError("");
        }, 3000);
      });

  }

  return (
    <header className="form-container">  
        <label>Find User</label>
        <input 
          value={inputField} 
          placeholder="Type name..." 
          onClick={() => setInputField('')}
          onChange={(e) => {
          setInputField(e.target.value);
        }}></input>
        <button id ="find-buttom" onClick={() => {
          if (inputField.trim() !== "") {
            getUserByName(inputField);
          }
        }}>find</button>
    {wasUserFound ? (
      <div className="user-found">
        <h1>{`User ${user?.username} found!`}</h1>
      </div>
    ) : (
      <div className="user-not-found">
        <h1>{error}</h1>
      </div>
    )}
    </header>
  )
}

export default function HeaderComponent() {
  return (
    <div className="header">
      <h1>Family Group</h1>
      <nav>
        <p><a href="#">Home</a></p>
        <p><a href="#">Group</a></p>
        <p><a href="#">My groups</a></p>
      </nav>
      <HeadersForm />
    </div>
  )
}
  