import { useEffect, useState } from "react";
import api from "../services/api";
import '../styles/Group.css';

interface Group {
    id: number,
    groupName: string,
    groupDescription: string,
    createdBy: number,
}   

export default function Group() {
    const [groups, setGroups] = useState<Group[]>();
    
    const userId: number = 3;

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await api.get(`/groups/getGroupsByUser/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                setGroups(response.data);
             } catch(err) {
                console.log(err);
             }
        };

        if (userId) {
            fetchGroups();
        }
    }, [userId]);

    return (
        <div className="container">
            <main id="groups">
                <h1 id="group-title">My Groups</h1>
                    <div className="group-container">
                        {groups?.map((group) => (
                            <div key={group.id} id="groups-info">
                                <div>
                                    <h1>{group.groupName}</h1>
                                </div>   
                                <div>
                                    <p>{group.groupDescription}</p>
                                </div>    
                                <div>
                                    <button>Enter Group</button>
                                </div>    
                            </div>
                        ))}
                    </div>                
            </main>
        </div>
    )
}