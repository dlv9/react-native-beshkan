import React, { useCallback } from 'react'
import { FC, createContext, useState, ReactNode, useEffect } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import TrackPlayer, { Capability, Event, useTrackPlayerEvents } from 'react-native-track-player';
import RNMusicMetadata from 'react-native-music-metadata';
import { loadAudios } from '../utils/load-audios';

export interface SocketContextInterface {
  files?: RNMusicMetadata.track[];
  play?: (i: number) => void
  getFiles?: () => void
}

const PlayerContext = createContext<SocketContextInterface>({});

const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [files, setFiles] = useState<RNMusicMetadata.track[]>([])

  const [current, setCurrent] = useState({
    title: '',
    cover: '',
    duration: '',
    progressed: ''
  });

  const goNext = () => {
  }

  const goBack = () => {

  }

  const getFiles = () => {
    loadAudios(setFiles)
  }

  const createPlayQueue = useCallback((i: number) => {
    const queue = files.slice(i).map(track => { return { ...track, url: track.uri } })
    TrackPlayer.reset().then(() => {

      TrackPlayer.add(queue).then(() => TrackPlayer.play().then(() => TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
        ],
      })))
    })
  }, [files])

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artwork, } = track || {};
      setCurrent({ ...current, title: title || '', cover: artwork as string || '' });
    }
  });

  useEffect(() => {
    getFiles()
    TrackPlayer.setupPlayer()
  }, [])

  return (
    <PlayerContext.Provider value={{ files, play: createPlayQueue,getFiles }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
