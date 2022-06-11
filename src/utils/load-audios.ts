import RNMusicMetadata from 'react-native-music-metadata';
import {generateFileSystemPath} from './generate-file-system-path';
import RNFetchBlob from 'rn-fetch-blob';

export const loadAudios = async (cb?: (audios: any[]) => void) => {
  console.log('ybyhbjibnb');
  
  try {
    const paths = await RNFetchBlob.fs.ls(
      `${RNFetchBlob.fs.dirs.SDCardApplicationDir}/downloads`,
    );
    

    const fileSystemPaths = await generateFileSystemPath(paths.reverse());
    
    const rawAudios = await RNMusicMetadata.getMetadata(fileSystemPaths);
    
    !!cb && cb(rawAudios);
  } catch (error) {
    console.log(error);
    
  }

//   RNFetchBlob.fs
//     .scanFile([
//       {
//         path: `${RNFetchBlob.fs.dirs.SDCardApplicationDir}/downloads/${file}`,
//         mime: 'audio/mpeg',
//       },
//     ])
//     .then(() => {
//       console.log('is mp3');
//     });
};
