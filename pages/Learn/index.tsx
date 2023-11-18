import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { getRandomElements, shuffleArray } from '../../utils/array';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from "../../types";
import { styles } from './styles';

type LearnScreenRouteProp = RouteProp<RootStackParamList, "Learn">;

interface LearnScreenProps {
  route: LearnScreenRouteProp;
}


function LearnScreen({route}: LearnScreenProps) {

  const { letters, kata } = route.params;

  const [mode, setMode] = useState(0)
  const [index, setIndex] = useState(0)
  const [warnings, setWarnings] = useState([""])

  const [answers, setAnswers] = useState(shuffleArray(getRandomElements(letters, index)))

  useEffect(() => {
    setAnswers(shuffleArray(getRandomElements(letters, index)))
  }, [index])


  return (
    <View style={styles.container}>
      {index < letters.length && <View style={styles.buttons_container}>
          <TouchableOpacity
            style = {[styles.button, mode == 0 && styles.button_mode_active]}
            onPress = {
              () => {
                setMode(0)
              }
            }
          >
          <Text style={styles.buttonText}>Mode 1</Text>
        </TouchableOpacity>
          <TouchableOpacity
            style = {[styles.button, mode == 1 && styles.button_mode_active]}
            onPress = {
              () => {
                setMode(1)
              }
            }
          >
          <Text style={styles.buttonText}>Mode 2</Text>
        </TouchableOpacity>
      </View>}
      {index < letters.length && <Text style={styles.title}>{mode === 0 ? letters[index][kata] : letters[index]["en"]}</Text>}
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
            <Text style={styles.buttonText}>
              {
                mode === 0 ? item.en : item[kata]
              }
            </Text>
          </TouchableOpacity>
        })}
      </View>}
      {index == letters.length && <Text style={styles.title}>done.</Text>}
    </View>
  )
}

export default LearnScreen;