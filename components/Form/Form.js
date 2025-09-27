'use client';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './Form.module.css';

export default function Form({ event, rentals }) {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
    rental: '',
    referral: '',
  });
  const [status, setStatus] = useState('');
  const [disableButton, setDisabledButton] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabledButton(true);
    const { firstName, surname, email, phone, message, rental, referral } =
      formData;

    const requestData = {
      firstName,
      surname,
      email,
      phone,
      message,
      rental,
      referral,
      event: event?.name + event?.title,
      sendTo: event?.sendTo || 'karin',
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('Tack! Din förfrågan har skickats.');
      } else {
        setStatus('Något gick fel, försök igen senare.');
      }
    } catch {
      setStatus('Fel vid skickande av formulär.');
    } finally {
      setFormData({
        firstName: '',
        surname: '',
        email: '',
        phone: '',
        message: '',
        referral: '',
      });
      setDisabledButton(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={styles.content}>
      {event && event.freeSeats?.freeSeats === 0 ? (
        'Kursen är för tillfället fullbokad'
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>Intresseanmälan</h2>
          <div className={styles.formBlock}>
            <div>
              <label htmlFor='firstName'>Ange ditt förnamn</label>{' '}
              <label htmlFor='surname'>och efternamn</label>
            </div>
            <div className={styles.nameInputs}>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                id='firstName'
                placeholder='Förnamn'
                required
              />
              <input
                type='text'
                name='surname'
                value={formData.surname}
                onChange={handleChange}
                id='surname'
                placeholder='Efternamn'
                required
              />
            </div>
          </div>
          <div className={styles.formBlock}>
            <label htmlFor='email'>Ange din emailadress</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              id='email'
              placeholder='email@email.com'
              required
            />
          </div>
          <div className={styles.formBlock}>
            <label htmlFor='phone'>Ange ditt telefonnummer</label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              id='phone'
              placeholder='0702000000'
              required
            />
          </div>
          {event && (
            <div>
              Ang. {event.name} {event.title}
            </div>
          )}
          {rentals && (
            <div className={styles.formBlock}>
              <label htmlFor='rental'>Jag är intresserad av</label>
              <select
                name='rental'
                id='rental'
                value={formData.rental}
                onChange={handleChange}
              >
                <option value=''>Välj...</option>{' '}
                {rentals.map((rental, key) => (
                  <option key={key} value={rental.title}>
                    {rental.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={styles.formBlock}>
            <label htmlFor='referral'>Vart hörde du om oss?</label>
            <select
              name='referral'
              id='referral'
              value={formData.referral}
              onChange={handleChange}
            >
              <option value=''>Välj...</option>
              <option value='sociala medier'>Sociala medier</option>
              <option value='bokmässan'>Bokmässan</option>
              <option value='via en vän'>Via en vän</option>
              <option value='google'>Google</option>
              <option value='annat'>Annat</option>
            </select>
          </div>
          <div className={styles.formBlock}>
            <label htmlFor='message'>Meddelande</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              id='message'
              placeholder='Skriv ditt meddelande...'
            ></textarea>
          </div>
          <div className={styles.formBlock}>
            <p>{status}</p>
            <button
              id='#intresseanmalan'
              className={styles.button}
              type='submit'
              disabled={disableButton}
            >
              {disableButton ? (
                <ClipLoader
                  color='rgba(184, 80, 66, 0.5)'
                  size={14}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              ) : (
                'Skicka förfrågan'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
