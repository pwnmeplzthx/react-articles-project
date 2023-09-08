export function capitalizeFirstLetter(value: string) {
    if (value.length !== 0) {
        const firstLetter = value.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = value.slice(1);
        value = firstLetterCap + remainingLetters;
    }

    return value;
}
