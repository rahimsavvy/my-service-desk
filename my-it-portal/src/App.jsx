import { useState } from 'react';
import './App.css';

function App() {
  const [articles] = useState([
    { id: 1, title: "How to connect to Office WiFi", category: "Network", content: "Select 'Company_Guest' from your WiFi list. Enter the password 'Welcome2024'." },
    { id: 2, title: "VPN Connection Issues", category: "Network", content: "Ensure you are using the GlobalProtect client. Switch to 'Internal Gateway' if needed." },
    { id: 4, title: "Reset your Email Password", category: "Accounts", content: "Go to identity.company.com and click 'Forgot Password'." },
    { id: 7, title: "Setting up a New Printer", category: "Printers", content: "Open Settings > Devices > Printers. Click 'Add a printer'." },
    { id: 10, title: "Zoom/Teams Audio Issues", category: "Communications", content: "Check Settings > Audio. Ensure correct Input/Output devices are selected." },
    { id: 11, title: "Slack: Notifications", category: "Communications", content: "Check Preferences > Notifications and ensure DND mode is off." },
    { id: 12, title: "Camera Not Working", category: "Communications", content: "Check the physical privacy slider and Windows Privacy settings." },
    { id: 13, title: "Multi-Factor Authentication (MFA) Setup", category: "Accounts", content: "Download the Microsoft Authenticator app and scan the QR code in your Security settings." }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { name: "Network", icon: "🌐", desc: "WiFi, VPN, and Internet" },
    { name: "Accounts", icon: "👤", desc: "Passwords and Identity" },
    { name: "Software", icon: "🛠️", desc: "Apps, Installs, and Licensing" },
    { name: "Hardware", icon: "💻", desc: "Laptops, Monitors, and Kits" },
    { name: "Printers", icon: "🖨️", desc: "Setup, Paper Jams, and Scanning" },
    { name: "Communications", icon: "💬", desc: "Zoom, Slack, Gmail & Audio" }
  ];

  return (
    <div className="App">
      <header className="hero-section">
        <h1>IT Knowledge Base</h1>
        <p>How can we help you today?</p>
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Search for help..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="main-search"
          />
          <div className="quick-links">
             <span>Common Tasks:</span>
             <button onClick={() => setSearchTerm("WiFi")}>🌐 Connect WiFi</button>
             <button onClick={() => setSearchTerm("Password")}>👤 Reset Password</button>
             <button onClick={() => setSearchTerm("VPN")}>🔒 VPN Help</button>
          </div>
        </div>
      </header>

      <section className="container">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <div key={cat.name} className="category-card" onClick={() => setSearchTerm(cat.name)}>
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>

        {searchTerm && (
          <div className="results-section">
            <div className="results-header">
              <h2>Results for "{searchTerm}"</h2>
              <button onClick={() => setSearchTerm("")} className="clear-link">✕ Clear Search</button>
            </div>
            <div className="article-list-v2">
              {filteredArticles.map(article => (
                <div key={article.id} className="article-row-card" onClick={() => setSelectedArticle(article)}>
                  <span className="badge-v2">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p className="sub-text-v2">Click to read instructions...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="support-footer">
        <div className="footer-content">
          <h2>Still need help?</h2>
          <p>Our IT Support team is available from 7 AM till 8 PM EST to assist you.</p>
          <div className="footer-buttons">
            <a href="mailto:support@company.com" className="footer-btn">Email Support</a>
            <a href="tel:18776602041" className="footer-btn">Call 1-877-660-2041</a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Company IT Service Desk</p>
        </div>
      </footer>

      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedArticle(null)}>&times;</button>
            <div className="modal-inner">
               <span className="badge-v2 modal-badge">{selectedArticle.category}</span>
               <h2>{selectedArticle.title}</h2>
               <div className="modal-divider"></div>
               <p className="modal-body-text">{selectedArticle.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;