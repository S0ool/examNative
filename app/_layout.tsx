import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthProvider } from "@/app/hooks/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/Home/Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/Search/Search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => <Icon name="search" size={30} color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/MyPosts/MyPosts"
          options={{
            title: "Admin",
            tabBarIcon: ({ color }) => <Icon name="shopping-basket" size={30} color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/Profile/Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <Icon name="user" size={30} color={color} />,
          }}
        />
      </Tabs>
    </AuthProvider>
  );
}
