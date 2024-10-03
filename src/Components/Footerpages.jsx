import React from 'react';
import { useLocation } from 'react-router-dom';

const FooterPages = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/about':
        return (
          <>
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            <p className="text-gray-700 leading-7">
              AuctioNex is a platform that enables users to list and browse auctions. Our goal is to provide a seamless experience for auction enthusiasts and sellers alike.
            </p>
          </>
        );
      case '/contact':
        return (
          <>
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-gray-700 leading-7">Feel free to reach out to us via email at support@auctionex.com or by phone at +1 234 567 890.</p>
          </>
        );
      case '/privacy-policy':
        return (
          <>
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-700 leading-7">We respect your privacy and are committed to protecting your personal data.</p>
          </>
        );
      case '/terms-and-conditions':
        return (
          <>
            <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-gray-700 leading-7">By using AuctioNex, you agree to our terms and conditions.</p>
          </>
        );
      default:
        return <p>Page not found</p>;
    }
  };

  return (
    <div className="container mx-auto my-10 p-4">
      {renderContent()}
    </div>
  );
};

export default FooterPages;
