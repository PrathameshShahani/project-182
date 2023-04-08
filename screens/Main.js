import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import * as FaceDetector from 'expo-face-detector';
import { StatusBar } from 'expo-status-bar';


export default class Main extends component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermissions: null,
            faces: []
        }

    }
    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermissions)
    }

    onCameraPermissions = (status) => {
        this.setState({ hasCameraPermissions: status.status === "granted" })
    }

    onFacesDetected = (faces) => {
        this.setState({ faces: faces })
    }

    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render() {
        const { hasCameraPermissions } = this.state;
        if (hasCameraPermissions === null) {
            return <View />
        }
        if (hasCameraPermissions === false) {
            return (
                <View style={styles.container}>
                    <Text>No Access!</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}></SafeAreaView>
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>Look Me App</Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFaceDetectionError={this.onFaceDetectionError}


                    ></Camera>
                </View>
                <View style={styles.filterContainer}>

                </View>
                <View style={styles.actionContainer}>

                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});