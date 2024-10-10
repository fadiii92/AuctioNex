import React from 'react'
import ReactDom from 'react-dom'

function BidsPopup({open, onClose}) {
    if(!open) return null

  return ReactDom.createPortal(
    <div>
        <span>Bids:........</span>
        <button onClick={onClose}></button>
    </div>,
    document.getElementById('show-bid-portal')
  )
}

export default BidsPopup
