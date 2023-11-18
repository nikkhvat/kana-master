import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';


function LearnScreen({
  route, navigation
}) {

  const {
    letters,
    kata
   } = route.params;

  const [index, setIndex] = useState(0)
  const [warnings, setWarnings] = useState([""])

  function getRandomElements(array, currentIndex) {
    const currentItem = array[currentIndex];

    let tempArray = [...array];
    tempArray.splice(currentIndex, 1);

    let randomItems = [];
    for (let i = 0; i < 4; i++) {
      if (tempArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        randomItems.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
      }
    }

    return [currentItem, ...randomItems];
  }

  
  const shuffleArray = (array) => {
    let arrayCopy = array.slice();

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    return arrayCopy;
  }


  const [answers, setAnswers] = useState(shuffleArray(getRandomElements(letters, index)))

  useEffect(() => {
    setAnswers(shuffleArray(getRandomElements(letters, index)))
  }, [index])

  return (
    <View style={styles.container}>
      {index < letters.length && <Text style={styles.title}>{letters[index]?.[kata]}</Text>}
      {index < letters.length && <View style={styles.buttons_container}>
        {answers.map(item => {
          if (item?.en === undefined) return (<View>/</View>)

          return <TouchableOpacity
            key={`letter:${item.en}:${item.ka}`}
            style = {
              [styles.button, warnings.includes(`${item.en}:${item.ka}-${letters[index].en}`) && styles.wrong_btn]
            }
            onPress = {
              () => {
                if (letters[index].en === item.en) {
                  setIndex(prev => prev + 1)
                } else {
                  setWarnings(prev => [...prev, `${item.en}:${item.ka}-${letters[index].en}`])
                }
              }
            }
          >
            <Text style={styles.buttonText}>{item.en}</Text>
          </TouchableOpacity>
        })}
      </View>}
      {index == letters.length && <Text style={styles.title}>done.</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 146,
    fontWeight: "600"
  },
  buttons_container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 50,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    height: 50,
    width: 50,
    borderRadius: 6,
    marginBottom: 20,
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  buttonText: {
    color: "#6C8CD5",
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  wrong_btn: {
    backgroundColor: "red"
  }
})

export default LearnScreen;
