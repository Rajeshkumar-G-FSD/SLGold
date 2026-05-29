import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <Image
            src="/images/ssllogo.jpg"
            alt="SLGold"
            width={40}
            height={40}
            className="footer-logo-img"
          />
        </div>
        <p className="footer-copy">
          © 2026 SLGold. All rights reserved. Developed by{' '}
          <a href="https://www.datazync.com" target="_blank" rel="noopener noreferrer">
            www.datazync.com
          </a>
        </p>
      </div>
    </footer>
  );
}
