import { ILetter } from "@/data/lettersTable";

export function getLettersWithStatuses(
  letters: (ILetter)[][] | undefined,
  selectedLetters: string[]
) {
  if (!letters) return [];

  const selectedLettersSet = new Set(selectedLetters);

  const isActiveColumn = (index: number): boolean => {
    return letters.every(row => {
      const item = row[index];
      
      console.log(item);
      
      return typeof selectedLettersSet.has(item?.en);
    });
  };

  const columns = letters[0]?.length || 0;
  const columnsList = Array.from({ length: columns }, (_, i) => isActiveColumn(i));

  const isActiveRow = (items: (ILetter)[]) => items.every(item =>
    typeof selectedLettersSet.has(item.en)
  );

  return letters.map(group => {
    const items = group.map((item, index) => {
      const commonFields = { data: item, column: columnsList[index], active: false };
      return {
        ...commonFields,
        active: selectedLettersSet.has(item.en)
      };
    });

    return { activeInRow: isActiveRow(group), items };
  });
}
