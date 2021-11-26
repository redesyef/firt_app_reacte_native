import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
//import {NavigationContainer } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
//import uploadToAnonymousFilesAsync from "anonymous-files";

const App = () => {
  const [selectedImage, setselectedImage] = useState(null);

  const photos = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permiso de la librería de imagenes es requerido");
      return;
    }
    const PickerResult = await ImagePicker.launchImageLibraryAsync();
    if (PickerResult.cancelled === true) {
      return;
    }

    setselectedImage({ localUri: PickerResult.uri });
  };
  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("No está disponible");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={photos}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://muons.com.co/soft/images/softlogo1.png",
          }}
          style={styles.logo}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Hola Yef</Text>
      {selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text>Compartir</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffde00",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "sans-serif",
    fontSize: 22,
  },

  logo: {
    width: 300,
    height: 50,
    display: "flex",
    justifyContent: "center",
    resizeMode: "contain",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default App;
