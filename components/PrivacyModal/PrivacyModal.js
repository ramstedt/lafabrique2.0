'use client';
import { useState } from 'react';
import styles from './PrivacyModal.module.css';

export default function PrivacyModal({
  buttonColor = '#1f1918',
  buttonHoverColor = '#f5f5ef',
  capitalize,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <button
        className={styles.openButton}
        onClick={() => setIsOpen(true)}
        style={{ color: buttonColor }}
        onMouseEnter={(e) => (e.currentTarget.style.color = buttonHoverColor)}
        onMouseLeave={(e) => (e.currentTarget.style.color = buttonColor)}
      >
        {capitalize ? 'I' : 'i'}ntegritetspolicy
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={onClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Integritetspolicy</h3>
              <br />
              <button className={styles.closeButton} onClick={onClose}>
                Stäng
              </button>
            </div>

            <section>
              <h4>Vercel Analytics</h4>
              <p>
                Vi använder Vercel Analytics för att inhämta statistik om
                användningen av vår webbplats. Vercel Analytics använder varken
                cookies eller annan spårningsteknik som kan identifiera enskilda
                besökare. De uppgifter som behandlas är helt anonymiserade och
                kan inte kopplas till någon fysisk person.
              </p>
            </section>

            <section>
              <h4>Syfte</h4>
              <p>
                Syftet med behandlingen är att analysera trafikmönster och
                förbättra webbplatsens funktionalitet och prestanda.
                Behandlingen sker på en rättslig grund av berättigat intresse
                enligt artikel 6.1 f i dataskyddsförordningen (GDPR).
              </p>
            </section>

            <section>
              <h4>Samtycke</h4>
              <p>
                Eftersom inga personuppgifter behandlas krävs inget samtycke för
                denna typ av statistikinsamling.
              </p>
            </section>

            <section>
              <h4>Formulärdata</h4>
              <p>
                När du skickar in ett formulär via oss sparas de uppgifter du
                anger (t.ex. namn, e-post och meddelande) för att vi ska kunna
                hantera din förfrågan. Om du vill att vi tar bort dina uppgifter
                kan du kontakta oss, så raderar vi dem.
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
