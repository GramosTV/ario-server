export const unformatGameName = (formattedName: string) => {
    return formattedName
      .split(' ')
      .map((word: string) => word.charAt(0).toLowerCase() + word.slice(1))
      .join('-');
};
export const formatGameName = (game: string) => { return game.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }