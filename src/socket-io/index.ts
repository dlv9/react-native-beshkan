import {SERVER_URL} from './../utils';
import io, {Socket} from 'socket.io-client';

export class SocketService {
  private static instance: SocketService;
  readonly socket: Socket;

  private constructor() {
    this.socket = io(SERVER_URL);
  }

  static initial() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new this();

    return this.instance;
  }
}
