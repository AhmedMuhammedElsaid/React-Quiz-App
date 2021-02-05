// eslint-disable-next-line import/no-anonymous-default-export
// export default {}
export const shuffleArray = (array: any) =>
  [...array].sort(() => Math.random() - 0.5);
