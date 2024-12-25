export const unformatGameName = (formattedName: string) => {
    return formattedName
      .split(' ')
      .map((word: string) => word.charAt(0).toLowerCase() + word.slice(1))
      .join('-');
};
