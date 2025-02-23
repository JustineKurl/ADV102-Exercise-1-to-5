import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HTMLView from "react-native-htmlview";
import { useRouter } from "expo-router";

export default function Exercises() {
  const router = useRouter();
  const [visibleIndex, setVisibleIndex] = useState(null);

  const exercises = [
    { title: "Exercise 1", description: "" },
    { 
      title: "Exercise 2", 
      description: "Create two tabs:<br/>Home – In the Home tab, display your full name.<br/>Exercise – In the Exercises tab, create cards that list the exercises with descriptions rendered in HTML." 
    },
    { 
      title: "Exercise 3", 
      description: `Create a login screen and add a title and description to the card.<br>When the card is clicked, it should redirect to the login screen.
      <ul><li>Email (Text Input)</li><li>Password (Text Input)</li><li>Login (Button)</li></ul>` 
    },
    { 
      title: "Exercise 4", 
      description: `Using the useState and useEffect hooks, create a stopwatch with two buttons:
      <ul><li>Start/Stop</li><li>Reset</li></ul>` 
    },
    { 
      title: "Exercise 5", 
      description: `Create a register screen with the following fields:
      <ul><li>Image Picker</li><li>Name (Text Input)</li><li>Email (Text Input)</li><li>Password (Text Input)</li><li>Register (Button)</li></ul>` 
    },
    { 
      title: "Exercise 6", 
      description: `Create a simple CRUD using useContext and useReducer.` 
    },
    { title: "Exercise 7", description: "Sample description rendered HTML 7" },
    { title: "Exercise 8", description: "Sample description rendered HTML 8" },
    { title: "Exercise 9", description: "Sample description rendered HTML 9" },
    { title: "Exercise 10", description: "Sample description rendered HTML 10" },
  ];

  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => setVisibleIndex(index === visibleIndex ? null : index)}>
            <Text style={styles.title}>{exercise.title}</Text>
          </TouchableOpacity>
          {visibleIndex === index && (
            <View>
              <HTMLView value={exercise.description} stylesheet={htmlStyles} />
              
              {index === 2 && (
                <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                  <Text style={styles.buttonText}>Go To Login Form</Text>
                </TouchableOpacity>
              )}
              
              {index === 3 && (
                <TouchableOpacity style={styles.button} onPress={() => router.push('/stopwatch')}>
                  <Text style={styles.buttonText}>Try Stopwatch</Text>
                </TouchableOpacity>
              )}

              {index === 4 && (
                <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
                  <Text style={styles.buttonText}>Go to Register Form</Text>
                </TouchableOpacity>
              )}

              {index === 5 && (
                <TouchableOpacity style={styles.button} onPress={() => router.push('/crud')}>
                  <Text style={styles.buttonText}>Go to CRUD</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginTop: 5,
    padding: 8,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 16,
    color: "#333",
    lineHeight: 18,
  },
  ul: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 15,
  },
  li: {
    fontSize: 14,
    color: "#555",
    lineHeight: 16,
  },
});
