import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '40px',
    textAlign: 'center',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
  };

  return (
    <div style={footerStyle}>
      <p>© 2024 Upesi. All rights reserved.</p>
     
    </div>
  );
};

export default Footer;
