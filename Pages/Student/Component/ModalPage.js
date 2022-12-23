import React from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons';
import {
    launchImageLibrary
} from 'react-native-image-picker'

const ModalPage = ({ navigation, modalVisible, setModalVisible, setImage }) => {
    return (
        <Modal
            animationType="slide"

            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Choose Image</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate('Camera')
                                }}
                            >
                                <Icon name="camera" size={30} color="black" />
                                <Text style={styles.textStyle}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    launchImageLibrary({
                                        mediaType: 'photo',
                                        includeBase64: true,
                                        maxHeight: 1080,
                                        maxWidth: 1920,
                                        quality: 0.7,
                                    }, (response) => {
                                        if (response.didCancel) {
                                            console.log('User cancelled image picker');
                                            return;
                                        } else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                            return;
                                        } else {
                                            setImage(response.assets.map((item) => item.base64))
                                            setModalVisible(!modalVisible);

                                        }
                                    }
                                    )
                                }}
                            >
                                <Icon name="image" size={30} color="black" />
                                <Text style={styles.textStyle}>Gallery</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Icon name="close" size={30} color="black" />
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>


    )
}

export default ModalPage

const styles = StyleSheet.create({
    centeredView: {
        bottom: 1,
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        backgroundColor: "white",
        width: 80,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        color: "black",
    },

    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 12,
    },

});    