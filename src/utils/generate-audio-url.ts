import {SERVER_URL} from './constants';
export const generateAudioUrl = (path?: string) => {
  const cleanPath = path?.replace('./public', '');

  console.log(`${SERVER_URL + cleanPath}/audio.mp3`);
  

  return `${SERVER_URL + cleanPath}`;
};
