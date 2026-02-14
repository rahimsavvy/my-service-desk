import { useState, useMemo } from 'react'
import './App.css'

function App() {
  // Articles database
  const articles = [
    // NETWORK CATEGORY
    { id: 1, title: "How to connect to Office WiFi", category: "Network", content: "Select 'Company_Guest' from your WiFi list. Enter the password 'Welcome2024'. If the login page doesn't appear, browse to 'neverssl.com'." },
    { id: 2, title: "VPN Connection Issues", category: "Network", content: "Ensure you are using the GlobalProtect client. If it fails to connect, try switching from 'Automatic' to 'Internal Gateway' in the settings." },
    { id: 3, title: "Slow Internet Troubleshooting", category: "Network", content: "If your connection is slow, try disabling your VPN temporarily to see if speed improves. Otherwise, restart your router and clear your browser cache." },
    
    // ACCOUNTS CATEGORY
    { id: 4, title: "Reset your Email Password", category: "Accounts", content: "Go to identity.company.com. Click 'Forgot Password' and follow the prompts to receive a reset code on your registered mobile device." },
    { id: 5, title: "Requesting Software Access", category: "Accounts", content: "To request access to tools like Jira or Salesforce, please submit an access request ticket via the manager approval portal." },
    { id: 6, title: "Multi-Factor Authentication (MFA) Setup", category: "Accounts", content: "Download the Microsoft Authenticator app. Scan the QR code provided in your security settings to link your account." },
    
    // HARDWARE CATEGORY
    { id: 7, title: "Setting up a New Printer", category: "Hardware", content: "Open Settings > Devices > Printers. Click 'Add a printer'. Search for the printer name labeled on the device (e.g., PRN-FLOOR2)." },
    { id: 8, title: "Monitor Not Detecting Laptop", category: "Hardware", content: "Check the HDMI/DisplayPort cable. Press 'Win + P' on your keyboard and ensure 'Extend' or 'Duplicate' is selected." },
    { id: 9, title: "Ordering a New Keyboard/Mouse", category: "Hardware", content: "Replacement peripherals can be picked up at the IT walk-in desk on the 3rd floor without a ticket. Just bring your employee ID." },
    
    // SOFTWARE CATEGORY
    { id: 10, title: "Zoom/Teams Audio & Sound Issues", category: "Software", content: "Go to Settings > Audio. Ensure the correct 'Output' (Speakers) and 'Input' (Microphone) are selected. Use the 'Test' button to verify you can hear the tone." },
    { id: 11, title: "Slack: Notifications & Channels", category: "Software", content: "If you aren't receiving alerts, check 'Preferences > Notifications'. Ensure 'Do Not Disturb' mode is off and that Slack has permission to send desktop alerts." },
    { id: 12, title: "Camera Not Working in Calls", category: "Software", content: "Check the physical privacy slider on your laptop. Then, go to Windows Settings > Privacy > Camera and ensure 'Allow apps to access your camera' is turned ON." },
    { id: 13, title: "Gmail Chat & Spaces Setup", category: "Software", content: "To enable the sidebar chat, go to Gmail Settings > See all settings > Chat and Meet. Select 'Google Chat' and save changes." }
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filtered articles based on search
  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    const term = searchTerm.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(term) || 
      article.content.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Handle quick search
  const handleQuickSearch = (term) => {
    setSearchTerm(term);
  };

  // Open article modal
  const openArticle = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  // Handle modal background click
  const handleModalBackgroundClick = (e) => {
    if (e.target.id === 'articleModal') {
      closeModal();
    }
  };

  // Categories for the category grid
  const categories = [
    { icon: '🌐', name: 'Network', description: 'WiFi, VPN, and Internet' },
    { icon: '👤', name: 'Accounts', description: 'Passwords and Identity' },
    { icon: '🛠️', name: 'Software', description: 'Apps, Installs, and Licensing' },
    { icon: '💻', name: 'Hardware', description: 'Laptops, Monitors, and Kits' },
    { icon: '🖨️', name: 'Printers', description: 'Setup, Paper Jams, and Scanning' },
    { icon: '💬', name: 'Communications', description: 'Connectivity' }
  ];

  return (
    <>
      {/* Header */}
      <header>
        <h1>IT Knowledge Base</h1>
        <p>How can we help you today?</p>
        
        <div className="search-wrapper">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for articles (e.g., WiFi, Email)..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={handleClearSearch}>
              ×
            </button>
          )}
        </div>

        <div className="quick-links">
          <span>Common Tasks:</span>
          <button onClick={() => handleQuickSearch('WiFi')}>Connect WiFi</button>
          <button onClick={() => handleQuickSearch('Password')}>Reset Password</button>
          <button onClick={() => handleQuickSearch('VPN')}>VPN Help</button>
        </div>
      </header>

      {/* Category Section */}
      <section className="category-grid-container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Browse by Category</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="category-card" 
              onClick={() => handleQuickSearch(category.name)}
            >
              <div className="cat-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content - Articles */}
      <main id="articleContainer">
        {filteredArticles.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No articles found. Try a different keyword!
          </p>
        ) : (
          filteredArticles.map(article => (
            <div
              key={article.id}
              className="article-card"
              onClick={() => openArticle(article)}
              style={{ cursor: 'pointer' }}
            >
              <span className={`badge badge-${article.category.toLowerCase().replace(' ', '-')}`}>
                {article.category}
              </span>
              <h3 style={{ margin: '10px 0' }}>{article.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Click to read instructions...</p>
            </div>
          ))
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div 
          id="articleModal" 
          className="modal" 
          onClick={handleModalBackgroundClick}
          style={{ display: 'block' }}
        >
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              ×
            </span>
            {selectedArticle && (
              <>
                <span className={`badge badge-${selectedArticle.category.toLowerCase().replace(' ', '-')}`}>
                  {selectedArticle.category}
                </span>
                <h2>{selectedArticle.title}</h2>
                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
                <p style={{ lineHeight: '1.8', color: '#444' }}>
                  {selectedArticle.content}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <h3>Still need help?</h3>
          <p>Our IT Support team is available from 7 AM till 8 PM EST to assist you.</p>
          <div className="contact-methods">
            <a href="mailto:support@company.com" className="contact-btn">
              Email Support
            </a>
            <a href="tel:+1234567890" className="contact-btn">
              Call 1-877-660-2041
            </a>
          </div>
          <p className="copyright">© 2024 Company IT Service Desk</p>
        </div>
      </footer>
    </>
  );
}

export default App
