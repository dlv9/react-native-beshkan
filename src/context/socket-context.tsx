import React from 'react'
import { FC, createContext, useState, ReactNode, useEffect } from 'react';
import { SocketService } from '../utils';

export interface SocketContextInterface {
  status?: boolean;
  pushEvent?: (e: EventsQueue) => void
}

export type SocketEvents = 'connect' | 'disconnect' | 'file-link' | 'video-info'

export type EventsQueue = {
  eventName: SocketEvents
  handler: (req?: any) => void
}


const SocketContext = createContext<SocketContextInterface>({});

const SocketInstance = SocketService.initial().socket;

const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const registeredEvents: SocketEvents[] = []
  const eventsRepo: EventsQueue[] = [];

  const [status, setStatus] = useState<boolean>(false);

  const [events, setEvents] = useState<EventsQueue[]>([]);

  useEffect(() => {
    pushEvent({
      eventName: 'connect', handler: () => {
        setStatus(true)
        console.log('fghjkl;')
      }
    })
    pushEvent({
      eventName: 'disconnect', handler: () => {
        setStatus(false)
      }
    })
  }, [])

  useEffect(() => {
    events.forEach(e => {
      if (!registeredEvents.includes(e.eventName)) {
        console.log(e);

        SocketInstance.on(e.eventName, e.handler);
        registeredEvents.push(e.eventName)
      }
    })
  }, [events])

  const pushEvent = (e: EventsQueue) => {

    eventsRepo.push(e)
    setEvents([...eventsRepo])
  }

  return (
    <SocketContext.Provider value={{ status, pushEvent }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
