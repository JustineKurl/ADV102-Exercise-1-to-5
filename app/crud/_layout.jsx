import { View } from "react-native";

export default function Layout({ children }) {
  return <View style={{ flex: 1, padding: 20 }}>{children}</View>;
}
