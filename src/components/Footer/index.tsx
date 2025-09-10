import styles from './Footer.module.css';
import instagram from '../../assets/ic-instagram.png';
import whatsapp from '../../assets/ic-whatsapp.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2 className={styles.title}>Contact</h2>
        <div className={styles.content}>
          <div className={styles.items}>
            <div className={styles.containerBig}>
              <p className={styles.itemTitle}>Phone</p>
              <a href="tel:+74993506604" className={styles.itemContent}>
                +7 (499) 350-66-04
              </a>
            </div>
            <div className={styles.containerSmall}>
              <p className={styles.itemTitle}>Socials</p>
              <div className={styles.icons}>
                <a href="https://www.instagram.com/" target="_blank">
                  <img
                    className={styles.image}
                    src={instagram}
                    alt="instagram icon"
                  />
                </a>
                <a href="https://www.whatsapp.com/" target="_blank">
                  <img
                    className={styles.image}
                    src={whatsapp}
                    alt="whatsapp icon"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.items}>
            <div className={styles.containerBig}>
              <p className={styles.itemTitle}>Address</p>
              <p className={styles.itemContent}>
                Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
              </p>
            </div>
            <div className={styles.containerSmall}>
              <p className={styles.itemTitle}>Working Hours</p>
              <p className={styles.itemContent}>24 hours a day</p>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.589088659618!2d37.63183989999999!3d55.713513999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b38d2c5cc3d%3A0x661848f54fb4b7ac!2z0JTRg9Cx0LjQvdC40L3RgdC60LDRjyDRg9C7LiwgOTYsINCc0L7RgdC60LLQsCwg0KDQvtGB0YHQuNGPLCAxMTUwOTM!5e0!3m2!1sru!2suk!4v1754384631970!5m2!1sru!2suk"
            width="100%"
            height="350"
            loading="lazy"
            style={{ borderRadius: '10px', border: '0' }}
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
