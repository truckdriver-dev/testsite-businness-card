import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Camera, Download, Home, UserCircle } from 'lucide-react';

function BusinessCard({ image, name, title, email, templateImage }) {
  const cardRef = useRef(null);

  const downloadCard = () => {
    const card = cardRef.current;
    if (!card) return;

    html2canvas(card).then(canvas => {
      const link = document.createElement('a');
      link.download = 'business-card.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="space-y-4">
      <div 
        ref={cardRef}
        className="w-[400px] h-[225px] rounded-xl shadow-lg p-6 flex relative overflow-hidden"
        style={{
          backgroundImage: templateImage ? `url(${templateImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 flex">
          {image ? (
            <img src={image} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="ml-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800">{name || 'Your Name'}</h2>
            <p className="text-gray-600 mt-1">{title || 'Your Title'}</p>
            <p className="text-blue-500 mt-2">{email || 'your@email.com'}</p>
          </div>
        </div>
      </div>
      
      <button
        onClick={downloadCard}
        className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Card
      </button>
    </div>
  );
}

function CardCreator() {
  const [image, setImage] = useState(null);
  const [templateImage, setTemplateImage] = useState(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const fileInputRef = useRef(null);
  const templateInputRef = useRef(null);

  const handleImageUpload = (e, setImageFn) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFn(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
        <Camera className="w-8 h-8 text-blue-500" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800">Business Card Creator</h1>
      
      <BusinessCard
        image={image}
        name={name}
        title={title}
        email={email}
        templateImage={templateImage}
      />
      
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <button
            onClick={() => templateInputRef.current.click()}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Upload Template Background
          </button>
          <input
            ref={templateInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setTemplateImage)}
            className="hidden"
          />
        </div>

        <div>
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upload Profile Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setImage)}
            className="hidden"
          />
        </div>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <Link 
        to="/"
        className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        <Home className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
        <Camera className="w-8 h-8 text-blue-500" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800">Business Card Creator</h1>
      
      <p className="text-xl text-gray-600 font-medium">
        Create your professional business card
      </p>
      
      <div className="w-16 h-1 bg-blue-500 rounded-full my-2"></div>
      
      <p className="text-gray-500">
        Upload your template, photo, and customize your business card in seconds
      </p>

      <Link 
        to="/create"
        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Camera className="w-4 h-4 mr-2" />
        Create Your Card
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CardCreator />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;