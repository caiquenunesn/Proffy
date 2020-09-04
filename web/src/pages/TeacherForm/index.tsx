import React, { useState, ChangeEvent, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';
import './styles.css';
import { useHistory } from 'react-router-dom';


function TeacherForm(){
    const [subject, setSubject] =  useState('');
    const [bio, setBio] = useState('');
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        avatar: '',
        whatsapp: '',
        cost: '',
    })

    const [scheduleItem, setScheduleItem] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewForm(){
        setScheduleItem([
            ...scheduleItem,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updateScheduleItems = scheduleItem.map((scheduleItem, index) => {
            if(index === position){
                return {...scheduleItem, [field]: value,};
            }
            return scheduleItem;
        });
       setScheduleItem(updateScheduleItems);
    }

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })

        
    }

    function submit(event: FormEvent) {
        event.preventDefault();

        const { name, avatar, whatsapp, cost } = formData;

        const data = new FormData();


        // data.append('name', name);
        // data.append('avatar', avatar);
        // data.append('whatsapp', whatsapp);
        // data.append('bio', bio);
        // data.append('subject', subject);
        // data.append('cost', cost);
        // data.append('schedule', scheduleItem.join(','))
        try{
            api.post('classes', {
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schedule: scheduleItem,
            }).then(() => {
                history.push('/');
            }).catch(()=>{
                alert('Erro no Cadastro')
            })
        }catch(e){
            
        }
    }
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={submit}>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input name="name" id="name" label="Nome completo" onChange={handleInput}/>
                    <Input name="avatar" label="Avatar" onChange={handleInput}/>
                    <Input name="whatsapp" label="Whatsapp" onChange={handleInput}/>
                    <Textarea name="bio" label="Biografia" onChange={(e) => setBio(e.target.value)} />
                    
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select
                    name="subject"
                    label="Matéria"
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}}
                    options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Física', label: 'Física' },
                        { value: 'Geografia', label: 'Geografia' },
                        { value: 'História', label: 'História' },
                        { value: 'Ciências', label: 'Ciências' },
                        { value: 'Matemática', label: 'Matemática' },
                        { value: 'Português', label: 'Português' },
                        { value: 'Química', label: 'Química' },
                    ]}
                    />
                    <Input name="cost" label="Custo da sua hora por aula" onChange={handleInput}/>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addNewForm} >+ Novo hórario</button>
                        </legend>
                        
                        {scheduleItem.map((scheduleItems, index) => {
                            return(
                                <div key={index} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={scheduleItems.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terceira-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input 
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    value={scheduleItems.from}
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />

                                    <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={scheduleItems.to}
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar cadastro </button>
                </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;