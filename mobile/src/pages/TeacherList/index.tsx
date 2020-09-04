import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import styles from './style';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);

    const [favorites, setFavorites] = useState<number[]>([]);


    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
          if (response) {
            const favoritedTeachers = JSON.parse(response);
            const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => { 
              return teacher.id;
            });
    
            setFavorites(favoritedTeachersIds);
          }
        });
      }

      

    function handleFilterShow(){
        setIsFilterVisible(!isFilterVisible);
    }

    function handleFilterSubmit(){
        try{
            loadFavorites();
            api.get('classes', {
                params: {
                    subject,
                    week_day,
                    time,
                }
            }).then(res => {
                setIsFilterVisible(false)
                setTeachers(res.data)
            })
        }catch(err){
            console.log(err)
        }
    }
    
    return(
        <View>
            <PageHeader 
                title="Proffys disponíveis"
                headerRight={(
                <BorderlessButton onPress={handleFilterShow}>
                    <Feather name="filter" size={20} color='#fff' />
                </BorderlessButton>
            )}>
                { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Qual o dia?"
                                        placeholderTextColor="#c1bccc"
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                    />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Qual horário?"
                                        placeholderTextColor="#c1bccc"
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                    />
                            </View>
                        </View>
                        <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 250,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                        key={teacher.id}
                        teachers={teacher}
                        favorited={favorites.includes(teacher.id)}    
                    />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;