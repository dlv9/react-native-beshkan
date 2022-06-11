import {SERVER_URL} from './constants';
export const generateCoverUrl = (path?: string) => {
  console.log(path);

  const cleanPath = path?.replace('./public', '');

  return `${SERVER_URL + cleanPath}/cover.jpg`;
};
