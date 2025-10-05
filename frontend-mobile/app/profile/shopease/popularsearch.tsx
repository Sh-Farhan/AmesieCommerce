import React, { useState } from "react";
import { View, Text, TextInput, Image, FlatList, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Platform } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const scale = (px: number) => (px / 428) * screenWidth;

const popularSearches = [
  "Dust Jeans",
  "Brielle Jeans",
  "Lots Jeans",
  "Les catino",
  "EVERBEAST",
  "Obermain",
  "Tocco Toscano",
  "Philipe Jourdan",
  "Under Armour",
  "New Era",
  "Adidas Black Edition",
  "Urban State",
];

// Helper to bold matching text
function highlightMatch(text: string, keyword: string) {
  if (!keyword) return <Text style={styles.searchItemText}>{text}</Text>;
  const regex = new RegExp(`(${keyword})`, "i");
  const matchIndex = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (matchIndex === -1) return <Text style={styles.searchItemText}>{text}</Text>;
  return (
    <Text style={styles.searchItemText}>
      <Text style={styles.matchText}>{text.substring(0, matchIndex)}</Text>
      <Text style={styles.matchTextBold}>
        {text.substring(matchIndex, matchIndex + keyword.length)}
      </Text>
      <Text style={styles.matchText}>{text.substring(matchIndex + keyword.length)}</Text>
    </Text>
  );
}

export default function PopularSearch() {
  const [search, setSearch] = useState("");

  // Filter the popular searches for partial (case-insensitive) match on any word start
  const filteredSearches = search
    ? popularSearches.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : popularSearches;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentWrapper}>
        <View style={styles.searchBar}>
          <Image source={require("../assets/images/Search.png")} style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search what you need"
            placeholderTextColor="#969598"
            style={styles.searchInput}
            underlineColorAndroid="transparent"
            selectionColor="#969598"
            autoFocus
          />
          <Image source={require("../assets/images/Group.png")} style={styles.micIcon} />
        </View>
        <View style={styles.popularPanel}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularHeaderText}>Popular search</Text>
          </View>
          <FlatList
            data={filteredSearches}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <View>
                {highlightMatch(item, search)}
                {index < filteredSearches.length - 1 && <View style={styles.separator} />}
              </View>
            )}
            ListEmptyComponent={<Text style={{ color: "#aaa", padding: 18 }}>No results found</Text>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchIcon: {
    width: 17,
    height: 18,
    marginRight: 10,
    tintColor: "#969598",
  },
  micIcon: {
    width: 15,
    height: 20,
    marginLeft: 10,
    tintColor: "#969598",
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: "#4C4C4C",
    backgroundColor: "transparent",
    paddingVertical: 0,
    borderWidth: 0,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  popularPanel: {
    backgroundColor: "#fff",
    marginTop: 4,
    marginBottom: 10,
  },
  popularHeader: {
    backgroundColor: "#aaa",
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  popularHeaderText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  searchItemText: {
    color: "#656565",
    fontSize: 15,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  matchTextBold: {
    color: "#222",
    fontWeight: "bold",
  },
  matchText: {
    color: "#656565",
    fontWeight: "400"
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginLeft: 13,
  },
});
