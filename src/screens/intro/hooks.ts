import {SocketService} from './../../socket-io/index';
import RNFetchBlob from 'rn-fetch-blob';
import {useCallback, useEffect, useState} from 'react';
import {usePlayer, useSocket} from '../../context';
import {IVideoInfo} from '../../socket-io/models';
import {generateAudioUrl} from '../../utils';
import RNBackgroundDownloader from 'react-native-background-downloader';

const SocketInstance = SocketService.initial().socket;
export const useIntro = () => {
  const socket = useSocket();
  

  const {getFiles}=usePlayer()
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<IVideoInfo | null>(null);

  useEffect(() => {
    //   RNFetchBlob.(`${
    //     RNFetchBlob.fs.dirs.MainBundleDir
    //   }/downloads`)
    // // files will an array contains filenames
    // .then((files) => {
    //     console.log(files)
    // }).catch(err=>console.log(err))
    console.log(RNFetchBlob.fs.dirs);

    socket.pushEvent!({eventName: 'video-info', handler: setVideoInfo});
    socket.pushEvent!({
      eventName: 'file-link',
      handler: _downloadFromServer,
    });
  }, []);

  const _downloadFromServer = useCallback(path => {
    const destinationPath = `${
      RNFetchBlob.fs.dirs.SDCardApplicationDir
    }/downloads/bsh${Date.now()}.mp3`;
    let task = RNBackgroundDownloader.download({
      id: 'file123',
      url: generateAudioUrl(path),
      destination: destinationPath,
    })
      .begin(expectedBytes => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress(percent => {
        console.log(`Downloaded: ${percent * 100}%`);
      })
      .done(() => {
        console.log('Download is done!');
        getFiles!()
      })
      .error(error => {
        console.log('Download canceled due to error: ', error);
      });

    console.log(destinationPath);
    // RNFetchBlob.config({
    //   fileCache: true,
    //   path: destinationPath,
    // })
    //   .fetch('GET', generateAudioUrl(path), {})
    //   .then(res => {
    //     console.log('The file saved to ', res.path());
    //   })
    //   .catch(err => console.log(err));
  }, []);

  const download = useCallback(() => {
    SocketInstance.emit('download-object', videoInfo);
  }, [videoInfo]);

  const getInfo = useCallback(() => {
    SocketInstance.emit('get-info', url);
  }, [url]);

  return {
    url,
    videoInfo,
    setUrl,
    getInfo,
    download,
  };
};
