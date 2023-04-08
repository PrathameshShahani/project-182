import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, PlatformMacOSStatic, Image } from 'react-native';


const Filter1 = ({
    face: {
        bounds: {
            size: {
                width: faceWidth,
                height: faceHeight,

            },
            leftEyePosition,
            rightEyePosition
        }
    }
})=>{

const transformAngle = (
    angleRad = Math.atan(
        (rightEyePosition.y - leftEyePosition.y) /
        (rightEyePosition.x - leftEyePosition.x)
    )
) => (angleRad * 180) / Math.PI;

return(
<Image 
    source={require("../assets/crown-pic1.png")}
    style={{
        width:faceWidth,
        height:faceHeight,
        resizeMode:"contain",
        transform:[{rotate:`${transformAngle()}deg`}]
    }}
/>
)
}

export default Filter1
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