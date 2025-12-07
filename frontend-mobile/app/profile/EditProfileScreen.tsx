import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  profileImage: string | null;
}

const EditProfileScreen = ({ navigation }: any) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Full Name',
    email: 'example@gmail.com',
    phoneNumber: '123-456-789',
    bio: 'I love fast food',
    profileImage: null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData(prev => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              // source={
              //   profileData.profileImage
              //     ? { uri: profileData.profileImage }
              //     : require('../../assets/default-avatar.png')
              // }
              source={ { uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
              <Ionicons name="pencil" size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>FULL NAME</Text>
            <TextInput
              style={styles.textInput}
              value={profileData.fullName}
              onChangeText={(text) => updateField('fullName', text)}
              placeholder="Enter your full name"
            />
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>EMAIL</Text>
            <TextInput
              style={styles.textInput}
              value={profileData.email}
              onChangeText={(text) => updateField('email', text)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Number */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
            <TextInput
              style={styles.textInput}
              value={profileData.phoneNumber}
              onChangeText={(text) => updateField('phoneNumber', text)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          {/* Bio */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>BIO</Text>
            <TextInput
              style={[styles.textInput, styles.bioInput]}
              value={profileData.bio}
              onChangeText={(text) => updateField('bio', text)}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Sen'
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ecf0f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Sen',
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f5fa',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12.5,
    elevation: 8,
  },
  formContainer: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    fontWeight: '400',
  },
  textInput: {
    height: 62,
    backgroundColor: '#f0f5fa',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#000',
  },
  bioInput: {
    height: 111,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    height: 67,
    backgroundColor: '#fdc500',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  saveButtonText: {
    fontFamily: 'Sen-Bold',
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
});

export default EditProfileScreen;