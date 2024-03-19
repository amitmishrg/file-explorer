import { useEventContext } from '@/context/EventTypeContext';

export const Console = () => {
  const { event } = useEventContext();

  return (
    <section>
      <h3>Console</h3>

      {event?.type && event.fileName && (
        <div className="event-wrapper">
          <div className="event">
            <span className="label">Event Type: </span>
            <span className={event?.type}>{event?.type}</span>
          </div>
          <div className="event">
            <span className="label">File Name:</span>
            <span>{event?.fileName}</span>
          </div>
        </div>
      )}
    </section>
  );
};
