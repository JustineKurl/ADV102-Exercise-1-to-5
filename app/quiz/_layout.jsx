import { createStackNavigator } from "@react-navigation/stack";
import Quiz from "./quiz"; // Import your Quiz component

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}
