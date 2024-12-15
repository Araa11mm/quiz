import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const Quiz = () => {
  const questions: Question[] = [
    {
      question: 'Какой цвет не входит в радугу?',
      options: ['Красный', 'Фиолетовый', 'Розовый', 'Синий'],
      correctAnswer: 'Розовый',
    },
    {
      question: 'Сколько планет в солнечной системе?',
      options: ['7', '8', '9', '10'],
      correctAnswer: '8',
    },
    {
      question: 'Какая столица Франции?',
      options: ['Берлин', 'Париж', 'Рим', 'Мадрид'],
      correctAnswer: 'Париж',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Массив для хранения ответов пользователя
  const [userAnswers, setUserAnswers] = useState<
    { question: string; correctAnswer: string; userAnswer: string }[]
  >([]);

  const handleAnswer = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Запоминаем ответ пользователя
    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: selectedOption,
      },
    ]);

    // Проверяем правильность ответа
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Переходим к следующему вопросу или завершаем
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Фильтруем неправильные ответы для отображения по завершении
  const incorrectAnswers = userAnswers.filter(
    (ans) => ans.userAnswer !== ans.correctAnswer
  );

  return (
    <View style={styles.container}>
      <View style={styles.quizBox}>
        {isFinished ? (
          <View>
            <Text style={styles.title}>Викторина завершена!</Text>
            <Text style={styles.score}>Ваш результат: {score} из {questions.length}</Text>
            {incorrectAnswers.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.errorTitle}>Неправильные ответы:</Text>
                {incorrectAnswers.map((item, index) => (
                  <Text key={index} style={styles.errorText}>
                    Вопрос: {item.question}{'\n'}
                    Ваш ответ: {item.userAnswer}{'\n'}
                    Правильный ответ: {item.correctAnswer}{'\n'}
                  </Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setIsFinished(false);
                setUserAnswers([]);
              }}
            >
              <Text style={styles.buttonText}>Начать заново</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{questions[currentQuestionIndex].question}</Text>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a5be2',
    paddingHorizontal: 20,
  },
  quizBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '30%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#F00067',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F00067',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C00',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
});

export default Quiz;
