import { ILetter } from "./letters";


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

export const getColumn = (rows: (number | ILetter)[][], columnId: number): ILetter[] => {
  const array: ILetter[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const item = row[columnId];

    if (typeof item != "number") {
      array.push(item);
    }
  }

  return array;
};

export const getRow = (rows: (number | ILetter)[][], rowId: number): ILetter[] => {
  const array: ILetter[] = [];

  for (let i = 0; i < rows[rowId].length; i++) {
    const item = rows[rowId][i];

    if (typeof item !== "number") {
      array.push(item);
    }
  }

  return array;
};


export const selectedLetters = (rows: (number | ILetter)[][], selected: {rows: number[], cols: number[]}): ILetter[] => {
  const array: ILetter[] = [];

  for (let i = 0; i < selected.cols.length; i++) {
    const element = selected.cols[i];
    array.push(...getColumn(rows, element));
  }

  for (let i = 0; i < selected.rows.length; i++) {
    const element = selected.rows[i];
    array.push(...getRow(rows, element));
  }

  const uniqueItems = new Map();
  array.forEach((item) => {
    if (!uniqueItems.has(item.id)) {
      uniqueItems.set(item.id, item);
    }
  });

  return Array.from(uniqueItems.values());
};


export const allLetters = (rows: (number | ILetter)[][]): ILetter[] => {
  const array: ILetter[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    for (let j = 0; j < row.length; j++) {
      const item = row[j];

      if (typeof item != "number") {
        array.push(item);
      }
    }
  }

  return array;
};
