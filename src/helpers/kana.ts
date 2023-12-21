import { ILetter } from "@/data/letters";

export function getLettersWithStatuses(
  letters: (ILetter | number)[][] | undefined,
  selectedLetters: string[]
) {
  if (!letters) return [];

  const selectedLettersSet = new Set(selectedLetters);

  const isActiveColumn = (index: number): boolean => {
    return letters.every(row => {
      const item = row[index];
      return typeof item === "number" || selectedLettersSet.has(item.en);
    });
  };

  const columns = letters[0]?.length || 0;
  const columnsList = Array.from({ length: columns }, (_, i) => isActiveColumn(i));

  const isActiveRow = (items: (number | ILetter)[]) => items.every(item =>
    typeof item === "number" || selectedLettersSet.has(item.en)
  );

  return letters.map(group => {
    const items = group.map((item, index) => {
      const commonFields = { data: item, column: columnsList[index], active: false };
      return typeof item === "number" ? commonFields : {
        ...commonFields,
        active: selectedLettersSet.has(item.en)
      };
    });

    return { activeInRow: isActiveRow(group), items };
  });
}
