import React, { useState } from 'react';

const MessageList = () => {
  const [activeContact, setActiveContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const contacts = [
    { id: 1, name: 'Flen ben flen' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jasmine Nguyen' },
    { id: 4, name: 'Declan Thompson' },
    { id: 5, name: 'Isabella Patel' },
    { id: 6, name: 'Xavier Mendez' },
    { id: 7, name: 'Savannah Johnson' },
    { id: 8, name: 'Amir Khan' },
    { id: 9, name: 'Malik Williams' },
  ];

  const messages = [
    { id: 1, contactId: 2, text: 'Hello' },
    { id: 2, contactId: 2, text: 'How are you?' },
    { id: 3, contactId: 2, text: 'I am doing well.' },
    { id: 4, contactId: 2, text: 'That\'s good to hear.' },
  ];

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSend = () => {
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div style={{ display: 'flex', height: '500px' }}>
      <div style={{ width: '200px', backgroundColor: '#333', color: '#fff', padding: '10px' }}>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            style={{ marginBottom: '10px', cursor: 'pointer' }}
            onClick={() => handleContactClick(contact)}
          >
            {contact.name}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, backgroundColor: '#eee', padding: '10px', position: 'relative' }}>
        <div style={{ height: '400px', overflow: 'auto' }}>
          {activeContact &&
            messages
              .filter((message) => message.contactId === activeContact.id)
              .map((message) => (
                <div key={message.id} style={{ marginBottom: '10px', display: 'flex' }}>
                  <div
                    style={{
                      backgroundColor: '#ccc',
                      borderRadius: '10px',
                      padding: '10px',
                      marginRight: '10px',
                    }}
                  >
                    {activeContact.name}
                  </div>
                  <div style={{ backgroundColor: '#3f3', borderRadius: '10px', padding: '10px' }}>
                    {message.text}
                  </div>
                </div>
              ))}
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px' }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleMessageChange}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none' }}
          />
          <button onClick={handleMessageSend} style={{ marginLeft: '10px' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageList;