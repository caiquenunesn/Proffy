import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';

export interface Teacher  {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeachersProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeachersProps> = ({ teacher }) => {

    async function createNewConnection(){
        await api.post('connections');
    }
    return(
        <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt="Caique Nunes" />
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                    </header>

    <p>{teacher.bio}</p>
                    <footer>
                        <p>
                            Preço por hora
                            <strong>R$ {teacher.cost}</strong>
                        </p>
                        <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entar em contato
                        </a>
                    </footer>
                </article>
    );
}

export default TeacherItem;