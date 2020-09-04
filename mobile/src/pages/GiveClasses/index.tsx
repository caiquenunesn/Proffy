import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './style';

function GiveClasses(){
    const { goBack } = useNavigation();

    function handleGoBack(){
        goBack();
    }
    
    return(
        <View style={styles.container}>
            <ImageBackground resizeMode="contain" source={giveClassesBgImage} style={styles.content}>

            <Text style={styles.title}>Quer ser um proffy?</Text>
            <Text style={styles.description}>
                para começar, você precisa se cadastrar como professor na nossa plataforma web.
            </Text>
            </ImageBackground>

            <RectButton style={styles.okButton} onPress={handleGoBack}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;