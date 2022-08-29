export const Capitalize = (value, perWord = false) => {
  const words = value.split(" ");

  const capitalized = perWord
    ? words.map((word) => {
        const lower = word.toLowerCase();
        const firstLetter = word.charAt(0).toUpperCase();

        return firstLetter + word.slice(1) + " ";
      })
    : value[0].toUpperCase() + value.slice(1);

  return capitalized;
};
