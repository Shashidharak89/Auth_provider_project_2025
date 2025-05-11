import React, { useState } from 'react';
import './styles/ApiInfo.css';
import { Copy, UserLock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ApiInfo = () => {

    const {URL}=useAuth();
  const [baseUrl] = useState('http://localhost:8000');
  const [userapi] = useState('user-api-key-1234');
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const apiBlocks = [
    {
      title: 'Registration',
      method: 'POST',
      url: `${URL}/hive/${userapi}/signup`,
      requestExample: `{
  "userapi": "${userapi}",
  "memberName": "John Doe",
  "email": "johndoe@exampl.com",
  "password": "password123"
}`,
      responseExample: `{
  "token": "eyJhbGciOi...",
  "member": {
    "name": "John Doe",
    "email": "johndoe@exampl.com",
    "password": "password123",
    "token": "eyJhbGciOi...",
    "_id": "6820489526e9fd926a4946b7"
  }
}`
    },
    {
      title: 'Login',
      method: 'POST',
      url: `${URL}/hive/login`,
      requestExample: `{
  "userapi": "${userapi}",
  "memberName": "John Doe",
  "memberEmail": "johndoe@example.com",
  "memberPassword": "password123"
}`,
      responseExample: `{
  "message": "Member added successfully to existing user",
  "member": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "token": "eyJhbGciOi...",
    "_id": "68204a5426e9fd926a4946e7"
  }
}`
    },
    {
      title: 'Token Verification',
      method: 'GET',
      url: `${URL}/hive/:token/tokenverify`,
      requestExample: '',
      responseExample: `{
  "token": "eyJhbGciOi...",
  "member": {
    "name": "John Doe",
    "email": "johndoe@exampl.com",
    "password": "password123",
    "token": "eyJhbGciOi...",
    "_id": "68203cfa724b3a90b1c53734"
  }
}`
    }
  ];

  return (
    <div className="apiinfo-container-xyz789">
      <h2>Your REST APIs</h2>
      {apiBlocks.map((block, index) => (
        <div className="apiinfo-block-xyz789" key={index}>
          <div className="apiinfo-header-xyz789">
            <h3>{block.title}</h3>
            <span className={`apiinfo-method-${block.method.toLowerCase()}-xyz789`}>
              {block.method}
            </span>
          </div>

          <div className="apiinfo-section-xyz789">
            <strong>URL:</strong> {block.url}
            <button
              className="apiinfo-copy-btn-xyz789"
              onClick={() => handleCopy(block.url, `url-${index}`)}
            >
              <Copy size={14} />
            </button>
            {copied === `url-${index}` && <span className="apiinfo-copied-xyz789">Copied!</span>}
          </div>

          {block.requestExample && (
            <div className="apiinfo-section-xyz789">
              <strong>Example Request Body:</strong>
              <pre>{block.requestExample}</pre>
              <button
                className="apiinfo-copy-btn-xyz789"
                onClick={() => handleCopy(block.requestExample, `req-${index}`)}
              >
                <Copy size={14} />
              </button>
              {copied === `req-${index}` && <span className="apiinfo-copied-xyz789">Copied!</span>}
            </div>
          )}

          <div className="apiinfo-section-xyz789">
            <strong>Example Response:</strong>
            <pre>{block.responseExample}</pre>
            <button
              className="apiinfo-copy-btn-xyz789"
              onClick={() => handleCopy(block.responseExample, `res-${index}`)}
            >
              <Copy size={14} />
            </button>
            {copied === `res-${index}` && <span className="apiinfo-copied-xyz789">Copied!</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiInfo;
