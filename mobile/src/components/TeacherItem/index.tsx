import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import AsyncStorage from '@react-native-community/async-storage';


import styles from './style';

export interface Teacher{
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

export interface TeacherProps {
    teachers: Teacher;
    favorited: boolean;
}
const TeacherItem: React.FC<TeacherProps> = ({ teachers, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkWhatsapp(){
        Linking.openURL(`whstapp://send?phone=${teachers.whatsapp}`)
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
    
        if (favorites) {
          favoritesArray = JSON.parse(favorites);
        }
    
        if (isFavorited) {
          const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
            return teacherItem.id === teachers.id;
          });
          favoritesArray.splice(favoriteIndex, 1);
          setIsFavorited(false);
        } else {
          favoritesArray.push(teachers);
          setIsFavorited(true);
        }
    
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      }

    // async function handleToggleFavorite(){
    //     try{
    //     const favorites = await AsyncStorage.getItem('favorites');
    //     let favoritesArray = [];

    //     if(favorites){
    //         favoritesArray = JSON.parse(favorites);
    //     }


    //     if(isFavorites){
    //         const favoritesIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
    //             // return teacherItem.id === teachers.id;
    //             console.log(teacherItem.id)
    //         });

    //         favoritesArray.splice(favoritesIndex, 1);

    //         setIsFavorites(false);

    //     }else {


    //         favoritesArray.push(favorites);

    //         setIsFavorites(true);

    //     }
    //     await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{uri: `${teachers.avatar}`}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teachers.name}</Text>
                    <Text style={styles.subject}>{teachers.subject}</Text>
                </View>

            </View>
                <Text style={styles.bio}>
                    {teachers.bio}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>
                        Preço/hora {'   '}
                        <Text style={styles.priceValue}>R$ {teachers.cost}</Text>
                    </Text>

                    <View style={styles.buttonsContainer}>
                        <RectButton onPress={handleToggleFavorite} style={[
                                styles.favoriteButton,
                                isFavorited ? styles.favorited : {},
                            ]}>
                            { isFavorited
                            ?
                                <Image source={unfavoriteIcon}/>
                            :
                                <Image source={heartOutlineIcon}/>
                         }
                        </RectButton>

                        <RectButton onPress={handleLinkWhatsapp} style={styles.contactButton}>
                            <Image source={whatsappIcon}/>
                            <Text style={styles.contactButtonText}>Entrar em contato</Text>
                        </RectButton>
                    </View>
                </View>
        </View>
    );
}

export default TeacherItem;