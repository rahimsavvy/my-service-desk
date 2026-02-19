import { useState } from 'react';
import './App.css';

function App() {
  const [articles] = useState([
    { id: 1, title: "How to connect to Office WiFi", category: "Network", content: "Select 'Company_Guest' from your WiFi list. Enter the password 'Welcome2024'." },
    { id: 2, title: "VPN Connection Issues", category: "Network", content: "Ensure you are using the GlobalProtect client. Switch to 'Internal Gateway' if needed." },
    { id: 4, title: "Reset Password / Unlock Windows", category: "Accounts", content: "Go to identity.company.com and click 'Forgot Password' or call the help desk to unlock your Windows profile." },
    { id: 7, title: "Setting up a New Printer", category: "Printers", content: "Open Settings > Devices > Printers. Click 'Add a printer'." },
    { id: 13, title: "OKTA Configuration", category: "Accounts", content: "Download the Okta Verify app on your mobile device and scan your unique QR code." },
    { id: 15, title: "Scanner: Scan to Email", category: "Scanners", content: "Place your document in the feeder and select 'Scan to Email'." },
    { id: 17, title: "Enrolling in Intune", category: "Mobile Devices", content: "Download the Company Portal app from the App Store or Play Store." }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { name: "Network", icon: "🌐", desc: "WiFi, VPN, and Internet" },
    { name: "Accounts", icon: "👤", desc: "Passwords and Identity" },
    { name: "Software", icon: "🛠️", desc: "Apps, Installs, and Licensing" },
    { name: "Hardware", icon: "💻", desc: "Laptops, Monitors, and Kits" },
    { name: "Printers", icon: "🖨️", desc: "Setup, Paper Jams, and Scanning" },
    { name: "Communications", icon: "💬", desc: "Zoom, Slack, Gmail & Audio" },
    { name: "Scanners", icon: "📂", desc: "Document Scanning" },
    { name: "Mobile Devices", icon: "📱", desc: "Smartphones & Tablets" }
  ];

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          
          {/* COMMON TASKS FIRST */}
          <div className="quick-links">
             <span>Common Tasks:</span>
             <button onClick={() => setSearchTerm("WiFi")}>🌐 Connect WiFi</button>
             <button onClick={() => setSearchTerm("Password")}>👤 Reset Password</button>
             <button onClick={() => setSearchTerm("VPN")}>🔒 VPN Help</button>
          </div>

          {/* macOS STYLE DOCK NOW BELOW COMMON TASKS */}
          <div className="it-dock-container">
            <div className="it-dock">
              <div className="dock-item">
                <span className="dock-icon">🔗</span>
                <span className="dock-label">Important Links</span>
              </div>
              <div className="dock-item">
                <span className="dock-icon">🛠️</span>
                <span className="dock-label">Services</span>
              </div>
              <div className="dock-item">
                <span className="dock-icon">🎟️</span>
                <span className="dock-label">Wanted Tickets</span>
              </div>
              <div className="dock-item">
                <span className="dock-icon">🏠</span>
                <span className="dock-label">Self Service</span>
              </div>
              <div className="dock-item">
                <span className="dock-icon">👥</span>
                <span className="dock-label">Our Team</span>
              </div>
              <div className="dock-item">
                <span className="dock-icon">📞</span>
                <span className="dock-label">Contact Us</span>
              </div>
            </div>
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
            <span className="badge-v2">{selectedArticle.category}</span>
            <h2>{selectedArticle.title}</h2>
            <div className="modal-divider"></div>
            <p className="modal-body-text">{selectedArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;