import React from 'react'
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'


import Icon from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';


const CameraModal = ({ navigation, modalVisible, setModalVisible, setImage }) => {

    const [
        { cameraRef,   autoFocus, autoFocusPoint,flash },
        {
            takePicture,
            setFlash,

        },
    ] = useCamera(null);

    const [type, setType] = React.useState(RNCamera.Constants.Type.back);


    const takePictureHandler = async () => {
        const options = { quality: 0.7, base64: true };
        try {

            const data = await takePicture(options)
            console.log(data.uri);

            // RNFS.moveFile(data.uri,);
            // setImage(data)
            // setModalVisible(false)
            navigation.navigate({
                name: 'Student',
                params: { image: data.base64 },
                merge: true,
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    return (<View style={styles.centeredView}>
        <RNCamera
            ref={cameraRef}
            type={type}
            onDoubleTap={() => takePictureHandler()}
            autoFocusPointOfInterest={autoFocusPoint.normalized}
            autoFocus={autoFocus}
            // flashMode={flash}
            style={styles.camera}
        >
            <View style={styles.buttoncontainer}>
                <TouchableOpacity
                    style={{
                        flex: 0,
                        backgroundColor: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15,
                        alignSelf: 'center',
                        marginBottom: 20,
        
                    }}
                    onPress={() => {
                        setType(
                            type === RNCamera.Constants.Type.back
                                ? RNCamera.Constants.Type.front
                                : RNCamera.Constants.Type.back,
                        );
                    }}
                >
                    <Icon name="camera-reverse-outline" size={30} color="white" />
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        takePictureHandler()
                    }}
                >
                    <Icon name="camera" size={30} color="white" />
                    <Text style={styles.textStyle}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 0,
                        backgroundColor: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15,
                        alignSelf: 'center',
                        marginBottom: 20,
        
                    }}
                    onPress={() => {
                        setFlash(
                            flash === RNCamera.Constants.FlashMode.off
                                ? RNCamera.Constants.FlashMode.on
                                : RNCamera.Constants.FlashMode.off,
                        );
                    }}
                >
                    <Icon name="flashlight-outline" size={25} color={
                        flash === RNCamera.Constants.FlashMode.off
                            ? 'white'
                            : 'blue'
                    } />
                    {/* <Text style={styles.textStyle}>Gallery</Text> */}
                </TouchableOpacity>

            </View>

        </RNCamera>
    </View>)

}

export default CameraModal
// create a above stylesheet

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttoncontainer: {
        flex: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    button: {
        flex: 0,
        backgroundColor: 'transparent',
        borderRadius: 20,
        display: 'flex',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'purple',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        alignSelf: 'center',
        marginBottom: 20,
        // marginLeft: 120,
    },
    textStyle: {
        color: 'white',
        fontSize: 14,
    },
})

