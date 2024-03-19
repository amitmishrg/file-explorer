import { Dispatch, ReactElement, SetStateAction, createContext } from 'react';
import { useContext, useState } from 'react';

import { EventType } from '@/types/file';

const EventContext = createContext(
  {} as {
    event: EventType | undefined;
    setEvent: Dispatch<SetStateAction<EventType | undefined>>;
  }
);

export const EventContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [event, setEvent] = useState<EventType>();

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
