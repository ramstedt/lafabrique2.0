'use client';

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/sv';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import './Calendar.css';

moment.locale('sv');
const localizer = momentLocalizer(moment);

const modalStyles = {
  overlay: {
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '10px',
  },
};

export default function EventsCalendar({ events }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarView, setCalendarView] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (events && events.length > 0) {
      setTimeout(() => {
        setLoading(false);
      });
    }
  }, [events]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  // Adjust calendar height dynamically
  const getCalendarHeight = () => (calendarView === 'day' ? '100%' : '600px');

  return (
    <div>
      <h1>Kalender</h1>

      {loading ? (
        <p className='loading-message'>Laddar kalender...</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          views={['month', 'week', 'day']}
          style={{ height: getCalendarHeight() }}
          messages={{
            today: 'Idag',
            previous: 'Föregående',
            next: 'Nästa',
            month: 'Månad',
            week: 'Vecka',
            day: 'Dag',
            showMore: (total) => `+ ${total} fler`,
          }}
          onSelectEvent={handleEventClick}
          onView={(view) => setCalendarView(view)}
          eventPropGetter={(event) => {
            let eventClass = '';
            if (event.category === 'Akvarell') eventClass = 'Akvarell';
            if (event.category === 'Keramik') eventClass = 'Keramik';
            if (event.category === 'Workshop') eventClass = 'Workshop';

            return {
              className: eventClass,
            };
          }}
        />
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        ariaHideApp={false}
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Starttid:</strong>{' '}
              {moment(selectedEvent.start).format('LLLL')}
            </p>
            <p>
              <strong>Sluttid:</strong>{' '}
              {moment(selectedEvent.end).format('LLLL')}
            </p>
            <button onClick={closeModal} style={{ marginTop: '10px' }}>
              Stäng
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
