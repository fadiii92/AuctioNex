import React from 'react';

const ChatWithOwnerButton = ({path, onClick}) => {
  return (
    <div className="fixed bottom-4 right-4">
      <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300" onClick={onClick}>
        Chat with {path.includes('myItems') ? (<span>Buyer</span>):(<span>Seller</span>)}
      </button>
    </div>
  );
};

export default ChatWithOwnerButton;
