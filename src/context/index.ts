import {useContext} from 'react';
import {PlayerContext, PlayerProvider} from './player-context';
import {SocketContext, SocketProvider} from './socket-context';

const useSocket = () => useContext(SocketContext);
const usePlayer = () => useContext(PlayerContext);

export {useSocket, usePlayer, SocketProvider, PlayerProvider};
