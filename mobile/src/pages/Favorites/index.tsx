import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from './style';
function Favorites(){
    const [favorites, setFavorites] = useState([]);
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
          if (response) {
            const favoritedTeachers = JSON.parse(response);
    
            setFavorites(favoritedTeachers);
          }
        });
      }

      useFocusEffect(() => {
          loadFavorites();
      });

    return(
        <View>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 300,
                }}
            >
               {favorites.map((Teacher: Teacher) => {
                   return(
                        <TeacherItem
                            key={Teacher.id}
                            teachers={Teacher}
                            favorited
                       />
                   )
               })}
            </ScrollView>
        </View>
    );
}

export default Favorites;