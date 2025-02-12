import { useState } from "react";
import api from "../services/api";
import '../styles/NewGroup.css';

export default function NewGroup() {
    const [creatorName, setCreatorName] = useState<string>('');
    const [groupName, setGroupName] = useState<string>('');
    const [groupDescription, setGroupDescription] = useState<string>('');

    async function createGroupRequest(creator: string) {
        let isUser: number;

        try {
            isUser = await findUser(creator);

            const requestObject = {
                groupName: groupName,
                groupDescription: groupDescription,
                createdBy: isUser,
            }

            const response = await  api.post("/groups/createGroup", requestObject);

            console.log(response.status);

            setCreatorName('');
            setGroupName('');
            setGroupDescription('');
        } catch (error) {
            console.log(error);
        }
    }   

    async function findUser(username: string): Promise<number> {  

        try {
            const response =  await api.get<number>(`/user/isUserValid/${username}`);
            return response.data;
        } catch(error) {
            if (error instanceof Error) {
                throw new Error(error.message || "Erro ao encontrar o usuário.");
            }
            throw new Error("Erro desconhecido ao encontrar usuário");
        }
    }   

    return (
        <div className="container-div">
           <div id="form-div">
           <h1>Create new group</h1>
            <div>
                <label>Creator name: </label>
                <input 
                    value={creatorName} 
                    onChange={(e) => setCreatorName(e.target.value)}
                /> 
            </div>
            <div>
                <label>Group name: </label>
                <input 
                    value={groupName} 
                    onChange={(e) => setGroupName(e.target.value)}
                /> 
            </div>
            <div>
                <label>Description: </label>
                <input 
                    value={groupDescription} 
                    onChange={(e) => setGroupDescription(e.target.value)}
                />
            </div>
            <div>
                <button onClick={() => createGroupRequest(creatorName)}>Create group</button>
            </div>
           </div>
        </div>
    )
}