import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  icon: string;
  label: string;
  color: string;
}

const personalItems: MenuItem[] = [
  { icon: 'person-outline', label: 'Personal Info', color: '#3B82F6' },
  { icon: 'location-outline', label: 'Addresses', color: '#6366F1' },
];

const accountItems: MenuItem[] = [
  { icon: 'cart-outline', label: 'Cart', color: '#3B82F6' },
  { icon: 'heart-outline', label: 'Favourite', color: '#EC4899' },
  { icon: 'notifications-outline', label: 'Notifications', color: '#F59E0B' },
  { icon: 'card-outline', label: 'Payment Method', color: '#06B6D4' },
];

const supportItems: MenuItem[] = [
  { icon: 'help-circle-outline', label: 'FAQs', color: '#F97316' },
  { icon: 'star-outline', label: 'User Reviews', color: '#14B8A6' },
  { icon: 'settings-outline', label: 'Settings', color: '#3B82F6' },
];

const MenuScreen: React.FC = () => {
  const renderMenuItem = (item: MenuItem, index: number, section: string) => (
    <TouchableOpacity
      key={`${section}-${index}`}
      style={styles.menuItem}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon as any} size={20} color={item.color} />
        </View>
        <Text style={styles.menuItemText}>{item.label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Profile</Text>
          
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }}
              style={styles.avatar}
            />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Full Name</Text>
            <Text style={styles.profileBio}>I love fast food</Text>
          </View>
        </View>

        {/* Personal Info Section */}
        <View style={styles.menuSection}>
          {personalItems.map((item, index) => 
            renderMenuItem(item, index, 'personal')
          )}
        </View>

        {/* Account Section */}
        <View style={styles.menuSection}>
          {accountItems.map((item, index) => 
            renderMenuItem(item, index, 'account')
          )}
        </View>

        {/* Support Section */}
        <View style={styles.menuSection}>
          {supportItems.map((item, index) => 
            renderMenuItem(item, index, 'support')
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ECF0F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 70,
    marginBottom: 28,
  },
  avatarContainer: {
    marginRight: 48,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
    marginTop: 7,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A0A5BA',
    lineHeight: 24,
  },
  menuSection: {
    marginHorizontal: 34,
    marginBottom: 23,
    backgroundColor: '#F6F8FA',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
  },
});

export default MenuScreen;