import React, { useEffect, useState } from 'react';
import { View, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';


import styles from './style';

function Landing(){
    const navigation = useNavigation();
    const [total, setTotal] = useState(0);

    function handleNavigateToGiveClasses(){
        navigation.navigate('GiveClasses')
    }

    function handleNavigateToStudyTabs(){
        navigation.navigate('Study');
    }

    useEffect(() => {
        api.get('connections').then(res => {
            const { total } = res.data;
        })
    }, [total])

    return(
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}

                <Text style={styles.titleBold}>O que deseja fazer</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigateToStudyTabs} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClasses} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {total} conecxões já realizadas {' '} <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;