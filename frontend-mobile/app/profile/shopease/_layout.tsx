import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs as the main layout */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* Product Page as a separate screen */}
      <Stack.Screen name="product" options={{ headerShown: false
       }} />

       <Stack.Screen name="discount" options={{ headerShown: false
       }} />

       <Stack.Screen name="popularsearch" options={{ headerShown: false
       }} />

       <Stack.Screen name="searchresult" options={{ headerShown: false
       }} />

       <Stack.Screen name="category" options={{ headerShown: false
       }} />

       <Stack.Screen name="bag" options={{ headerShown: false
       }} />

       <Stack.Screen name="wishlist" options={{ headerShown: false
       }} />
      
      <Stack.Screen name="famousbrand" options={{ headerShown: false
       }} />

    </Stack>
  );
}
