import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Linkedin, Twitter, Upload, Camera, Copy, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import './App.css';

const templates = {
  minimal: {
    font: "'Inter', sans-serif",
    bgColor: 'bg-gradient-to-br from-white to-gray-50',
    textColor: 'text-gray-800',
    accentColor: 'text-primary-600',
    borderColor: 'border-gray-100',
    shadowColor: 'shadow-soft',
    description: 'Clean and professional signature with a focus on readability',
    icon: 'sparkles'
  },
  tech: {
    font: "'JetBrains Mono', monospace",
    bgColor: 'bg-gradient-to-br from-slate-900 to-slate-800',
    textColor: 'text-blue-300',
    accentColor: 'text-accent-400',
    borderColor: 'border-slate-700',
    shadowColor: 'shadow-glow',
    description: 'Modern tech-inspired design with a developer aesthetic',
    icon: 'code'
  },
  creative: {
    font: "'Space Grotesk', sans-serif",
    bgColor: 'bg-gradient-to-br from-secondary-50 via-white to-primary-50',
    textColor: 'text-gray-800',
    accentColor: 'text-secondary-500',
    borderColor: 'border-secondary-100',
    shadowColor: 'shadow-soft',
    description: 'Artistic and expressive signature for creative professionals',
    icon: 'palette'
  }
};

function App() {
  const previewRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    twitter: '',
    photo: null
  });

  const [selectedTemplate, setSelectedTemplate] = useState('minimal');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const copyHTML = async () => {
    if (previewRef.current) {
      try {
        const htmlContent = previewRef.current.outerHTML;
        await navigator.clipboard.writeText(htmlContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        // Create a textarea element to copy the content
        const textarea = document.createElement('textarea');
        textarea.value = previewRef.current.outerHTML;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        document.body.removeChild(textarea);
      }
    }
  };

  const downloadPNG = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
          useCORS: true,
          onclone: (clonedDoc) => {
            const elements = clonedDoc.querySelectorAll('.flex.items-center');
            elements.forEach(el => {
              el.style.display = 'flex';
              el.style.alignItems = 'center';
              el.style.gap = '8px';
            });
          }
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'email-signature.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Failed to generate PNG:', error);
      }
    }
  };

  const SignaturePreview = () => {
    const template = templates[selectedTemplate];
    
    return (
      <motion.div 
        ref={previewRef}
        className={`p-6 rounded-2xl ${template.bgColor} ${template.shadowColor} max-w-2xl border ${template.borderColor}`}
        style={{ fontFamily: template.font }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-6">
          {formData.photo ? (
            <motion.img 
              src={formData.photo} 
              alt="Profile" 
              className="w-24 h-24 rounded-2xl object-cover shadow-soft"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
          ) : (
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${template.borderColor}`}>
              <Upload className={`w-8 h-8 ${template.accentColor} opacity-50`} />
            </div>
          )}
          <div className="flex-1">
            <motion.h2 
              className={`text-2xl font-bold ${template.textColor} tracking-tight`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {formData.name || 'Your Name'}
            </motion.h2>
            <motion.div 
              className="space-y-1 mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className={`text-sm font-medium ${template.accentColor}`}>
                {formData.title || 'Job Title'}
              </p>
              <p className={`text-sm ${template.textColor} opacity-90`}>
                {formData.company || 'Company Name'}
              </p>
            </motion.div>
            
            <motion.div 
              className="mt-4 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formData.email && (
                  <div className="flex items-center mb-1.5">
                      <Mail className={`w-4 h-4 ${template.textColor} my-auto`} />
                      <span className={`ml-2 text-sm ${template.textColor} opacity-80 my-auto`}>{formData.email}</span>
                  </div>
              )}
              {formData.phone && (
                  <div className="flex items-center mb-1.5">
                      <Phone className={`w-4 h-4 ${template.textColor} my-auto`} />
                      <span className={`ml-2 text-sm ${template.textColor} opacity-80 my-auto`}>{formData.phone}</span>
                  </div>
              )}
              {formData.website && (
                <div className="flex items-center mb-1.5">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Globe className={`w-4 h-4 ${template.textColor}`} />
                  </div>
                  <span className={`ml-2 text-sm ${template.textColor} opacity-80`}>{formData.website}</span>
                </div>
              )}
            </motion.div>

            <motion.div 
              className="mt-4 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {formData.linkedin && (
                <a 
                  href={formData.linkedin} 
                  className={`flex items-center gap-1 text-sm ${template.accentColor} hover:opacity-75 transition-opacity`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {formData.twitter && (
                <a 
                  href={formData.twitter} 
                  className={`flex items-center gap-1 text-sm ${template.accentColor} hover:opacity-75 transition-opacity`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✨ Create stunning email signatures in minutes
            </motion.div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
            Email Signature Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create professional email signatures that leave a lasting impression. Choose from our carefully crafted templates and customize them to match your brand identity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Template Selection */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Template</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(templates).map(([key, template]) => (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedTemplate(key)}
                    className={`template-card p-8 relative overflow-hidden ${
                      selectedTemplate === key
                        ? `${template.bgColor} ${template.shadowColor} ring-2 ring-primary-500 ring-offset-2`
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                      {selectedTemplate === key && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-primary-500 text-white p-1 rounded-full"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    <div className="text-left relative z-10">
                      <div className={`w-12 h-12 rounded-2xl mb-5 flex items-center justify-center ${
                        selectedTemplate === key ? template.accentColor : 'bg-gray-100 text-gray-600'
                      } transition-colors duration-300`}>
                        {template.icon === 'sparkles' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        {template.icon === 'code' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        )}
                        {template.icon === 'palette' && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold mb-2 ${
                        selectedTemplate === key ? template.accentColor : 'text-gray-900'
                      }`} style={{ fontFamily: template.font }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        selectedTemplate === key ? template.textColor : 'text-gray-500'
                      }`}>
                        {template.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Senior Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Awesome Tech Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-primary-300 transition-colors">
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="photo-upload" className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                          <span>Upload a file</span>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Media</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="https://twitter.com/johndoe"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyHTML}
                      className="btn btn-secondary flex items-center gap-2"
                      title="Copy HTML version"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy HTML'}
                    </button>
                    <button
                      onClick={downloadPNG}
                      className="btn btn-primary flex items-center gap-2"
                      title="Download as PNG"
                    >
                      <Download className="w-4 h-4" />
                      Download PNG
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden bg-gray-50 p-6">
                <SignaturePreview />
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary-100 p-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  </div>
                  <span>Keep your signature professional and concise</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary-100 p-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  </div>
                  <span>Use a professional photo that clearly shows your face</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary-100 p-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  </div>
                  <span>Include only relevant social media profiles</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
