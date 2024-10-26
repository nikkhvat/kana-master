import { ILetter } from "@/shared/data/lettersTable";

export function getLettersWithStatuses(
  letters: (ILetter)[][] | undefined,
  selectedLetters: string[]
) {
  if (!letters) return [];

  const selectedLettersSet = new Set(selectedLetters);

  const isActiveColumn = (index: number): boolean => {
    return letters.every(row => {
      const item = row[index];
      
      if (!item) return true;
      
      return selectedLettersSet.has(item?.id);
    });
  };

  const columns = letters[0]?.length || 0;
  const columnsList = Array.from({ length: columns }, (_, i) => isActiveColumn(i));

  const isActiveRow = (items: (ILetter)[]) => items.every(item => selectedLettersSet.has(item.id)
  );

  return letters.map(group => {
    const items = group.map((item, index) => {
      const commonFields = { data: item, column: columnsList[index], active: isActiveColumn(index) };
      return {
        ...commonFields,
        active: selectedLettersSet.has(item.id)
      };
    });

    return { activeInRow: isActiveRow(group), items };
  });
}
