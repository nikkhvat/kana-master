import { KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";

export const removeElement = <T>(array: Array<T>, element: T): Array<T> => {
  return array.filter(el => el !== element);
};

export const mergeUniqueElements = <T>(originalArray: Array<T>, elementsToAdd: Array<T>): Array<T> => {
  const combinedArray = originalArray.concat(elementsToAdd);
  return combinedArray.filter((element, index, array) => array.indexOf(element) === index);
};

export const removeElements = <T>(array: Array<T>, elementsToRemove: Array<T>): Array<T> => {
  return array.filter(element => !elementsToRemove.includes(element));
};

export const isAllSelected = <T>(sections: Array<T>, targets: Array<T>) => targets.every(t => sections.includes(t));
export const updateSections = <T>(sections: Array<T>, targets: Array<T>, isSelected: boolean) =>
  isSelected ? removeElements(sections, targets) : mergeUniqueElements(sections, targets);

export const countLetters = (sections: Array<KanaSection>) => {
  return sections.reduce((total, section) => total + LETTERS_COUNT[section], 0);
};
