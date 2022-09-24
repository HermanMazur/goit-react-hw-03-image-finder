
export const mapper = array => {
  return array.map(
    ({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,      
    })
  );
};