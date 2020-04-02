// Import from libs
import React from 'react';

// declare consts
const menus = [
  {
    name: 'Terms',
    url: '/',
  },
  {
    name: 'Privacy',
    url: '/',
  },
  {
    name: 'Security',
    url: '/',
  },
  {
    name: 'Help',
    url: '/',
  },
];

function Footer() {
  return (
    <footer className="footer-page">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <nav className="footer-nav">
              {menus.map((item) => (
                <a href="/" key={item.name}>
                  {item.name}
                </a>
              ))}
            </nav>
            <br className="d-lg-none" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
