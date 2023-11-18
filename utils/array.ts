

export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  let arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

export const getRandomElements = <T>(array: Array<T>, currentIndex: number): Array<T> => {
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
