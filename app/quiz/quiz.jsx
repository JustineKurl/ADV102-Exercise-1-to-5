import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Quiz({ navigation }) {
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;
    if (isQuizStarted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isQuizStarted, timer]);

  const fetchQuestions = async () => {
    const num = parseInt(numQuestions);
    if (isNaN(num) || num < 10 || num > 30) {
      setError("Please enter a number between 10 and 30.");
      return;
    }
    setError(""); 
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${num}&type=multiple`
      );
      const data = await response.json();
      setQuestions(data.results);
      setScore(0);
      setCurrentQuestion(0);
      setShowScore(false);
      setIsQuizStarted(true);
      setTimer(10); 
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      if (selectedAnswer === questions[currentQuestion]?.correct_answer) {
        setScore((prev) => prev + 1);
      }
      setSelectedAnswer(null);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setTimer(10);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate("(tabs)", { screen: "exercises" })}
      >
        <Ionicons name="arrow-back" size={32} color="blue" />
      </TouchableOpacity>

      {!isQuizStarted ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Number of Questions (10-30)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numQuestions}
            onChangeText={(text) => {
              setNumQuestions(text);
              setError(""); 
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={fetchQuestions}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : showScore ? (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsQuizStarted(false)}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.timer}>Time Left: {timer}s</Text>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              {currentQuestion + 1}. {questions[currentQuestion]?.question}
            </Text>
          </View>
          {questions[currentQuestion]?.incorrect_answers
            .concat(questions[currentQuestion]?.correct_answer)
            .sort()
            .map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedAnswer === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
              onPress={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion}>
              <Text style={styles.buttonText}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: 15,
    borderWidth: 2,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    borderColor: "#007BFF",
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  quizContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "90%",
  },
  timer: {
    fontSize: 24,
    color: "red",
    marginBottom: 20,
    fontWeight: "bold",
  },
  questionBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  option: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 8,
    width: "90%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#0056b3",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 25,
  },
  navButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    width: "45%",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  scoreText: {
    fontSize: 32, 
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF",
    marginBottom: 20,
  },
});

