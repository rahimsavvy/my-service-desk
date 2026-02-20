import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  /* SCRAPBOOK STATE - STORES YOUR POSTS */
  const [scraps, setScraps] = useState([
    { id: 1, author: "Guest User", text: "Welcome to the new IT Scrapbook! Let's keep the team spirit high. 🚀", time: "2 hours ago" },
    { id: 2, author: "Guest User", text: "Great job on the VPN migration yesterday, everyone!", time: "4 hours ago" }
  ]);
  const [newScrap, setNewScrap] = useState("");

  const [articles] = useState([
    { id: 1, title: "How to connect to Office WiFi", category: "Network", content: "Select 'Company_Guest' from your WiFi list. Enter the password 'Welcome2024'." },
    { id: 4, title: "Reset Password / Unlock Windows", category: "Accounts", content: "Go to identity.company.com and click 'Forgot Password'." },
    { id: 13, title: "OKTA Configuration", category: "Accounts", content: "Follow the prompts to scan your unique QR code in Okta Verify." },
    { id: 17, title: "Enrolling in Intune", category: "Mobile Devices", content: "Download the Company Portal app to enroll your device." }
  ]);

  const teamMembers = [
    { name: "James Rutland", role: "Captain", gender: "male", isManager: true },
    { name: "Neal Hart", role: "Sr. Support Analyst", gender: "male" },
    { name: "Alba De Witt", role: "Sr. Support Analyst", gender: "female" },
    { name: "Jacob Forbes", role: "Support Analyst", gender: "male" },
    { name: "Duaa Abdelall", role: "Support Analyst", gender: "female" },
    { name: "Jonathan Louis", role: "Support Analyst", gender: "male" },
    { name: "Mayyur Gajjar", role: "Support Analyst", gender: "male" },
    { name: "Pinal Patel", role: "Support Analyst", gender: "female" },
    { name: "Rahim Hamza", role: "Support Analyst", gender: "male" }
  ];

  /* HANDLES POSTING A NEW SCRAP */
  const handlePostScrap = () => {
    if (!newScrap.trim()) return;
    const post = {
      id: Date.now(),
      author: "Guest User",
      text: newScrap,
      time: "Just now"
    };
    setScraps([post, ...scraps]);
    setNewScrap("");
  };

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
        <h1 onClick={() => setCurrentPage('home')} style={{cursor: 'pointer'}}>IT Knowledge Base</h1>
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
             <button onClick={() => {setSearchTerm("WiFi"); setCurrentPage('home')}}>🌐 Connect WiFi</button>
             <button onClick={() => {setSearchTerm("Password"); setCurrentPage('home')}}>👤 Reset Password</button>
             <button onClick={() => {setSearchTerm("VPN"); setCurrentPage('home')}}>🔒 VPN Help</button>
          </div>

          <div className="it-dock-container">
            <div className="it-dock">
              <div className="dock-item" onClick={() => setCurrentPage('home')}>
                <span className="dock-icon">🏠</span>
                <span className="dock-label">Home</span>
              </div>
              <div className="dock-item"><span className="dock-icon">🔗</span><span className="dock-label">Links</span></div>
              <div className="dock-item"><span className="dock-icon">🛠️</span><span className="dock-label">Services</span></div>
              <div className="dock-item"><span className="dock-icon">🎟️</span><span className="dock-label">Wanted Tickets</span></div>
              <div className="dock-item"><span className="dock-icon">🚚</span><span className="dock-label">Dispatch</span></div>
              <div className="dock-item"><span className="dock-icon">📈</span><span className="dock-label">Linear</span></div>
              <div className="dock-item"><span className="dock-icon">💼</span><span className="dock-label">Workday</span></div>
              <div className="dock-item"><span className="dock-icon">⚠️</span><span className="dock-label">Outages</span></div>
              <div className="dock-item"><span className="dock-icon">🧩</span><span className="dock-label">Puzzle Zone</span></div>
              <div className="dock-item" onClick={() => setCurrentPage('scrapbook')}>
                <span className="dock-icon">📓</span>
                <span className="dock-label">Scrap Book</span>
              </div>
              <div className="dock-item" onClick={() => setCurrentPage('team')}>
                <span className="dock-icon">👥</span>
                <span className="dock-label">Our Team</span>
              </div>
              <div className="dock-item"><span className="dock-icon">📞</span><span className="dock-label">Contact</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* PAGE ROUTING LOGIC */}
      {currentPage === 'home' && (
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
      )}

      {currentPage === 'team' && (
        <section className="container team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="manager-row">
            {teamMembers.filter(m => m.isManager).map(manager => (
              <div key={manager.name} className="team-card manager-card">
                <div className="avatar">👨‍💼</div>
                <h3>{manager.name}</h3>
                <p className="role">{manager.role}</p>
              </div>
            ))}
          </div>
          <div className="team-grid">
            {teamMembers.filter(m => !m.isManager).map(member => (
              <div key={member.name} className="team-card">
                <div className="avatar">{member.gender === 'male' ? '👨‍💻' : '👩‍💻'}</div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => setCurrentPage('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* SCRAPBOOK PAGE CONTENT */}
      {currentPage === 'scrapbook' && (
        <section className="container scrapbook-section">
          <h2 className="section-title">Team Scrapbook</h2>
          <div className="scrap-input-card">
            <textarea 
              placeholder="Post a scrap to the team..." 
              value={newScrap}
              onChange={(e) => setNewScrap(e.target.value)}
            />
            <button className="post-btn" onClick={handlePostScrap}>Post Scrap</button>
          </div>
          <div className="scrap-feed">
            {scraps.map(scrap => (
              <div key={scrap.id} className="scrap-card">
                <div className="scrap-header">
                  <strong>{scrap.author}</strong>
                  <span className="scrap-time">{scrap.time}</span>
                </div>
                <p className="scrap-text">{scrap.text}</p>
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => setCurrentPage('home')}>← Back to Knowledge Base</button>
        </section>
      )}

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