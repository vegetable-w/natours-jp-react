import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/img/logo-green.png" alt="Natour logo" />
      </div>
      <ul className="footer__nav">
        <li>About us</li>
        <li>Download apps</li>
        <li>Become a guide</li>
        <li>Careers</li>
        <li>Contact</li>
      </ul>
      <p className="footer__copyright">
        &copy; by vegetable-w. This project is for personal learning use only.
      </p>
    </footer>
  );
}

export default Footer;
