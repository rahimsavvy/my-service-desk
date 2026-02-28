import { useState, useEffect } from 'react';
import { 
  Home, Link as LinkIcon, Coffee, Newspaper, Ticket, Truck, TrendingUp, 
  IdCard, AlertTriangle, Puzzle, Book, Users, Settings, Globe, User, 
  Lock, Wrench, Laptop, Printer, MessageSquare, Folder, Smartphone, 
  Monitor, ClipboardList, BookOpen, Lightbulb, Cloud, Bug, Key, 
  BarChart, Calendar, MapPin, Flame, Search, AlertOctagon, AlertCircle, 
  FileText, Briefcase, Terminal, Square, Brain, Cpu 
} from 'lucide-react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  /* PUZZLE & QUIZ STATES */
  const [showQuiz, setShowQuiz] = useState(false);
  const [activePuzzle, setActivePuzzle] = useState(null);

  /* 1. CRYPTIC PUZZLE STATE */
  const [newspaperGuess, setNewspaperGuess] = useState(""); 
  const [crypticIndex, setCrypticIndex] = useState(0); 
  const crypticPuzzles = [
    { clue: "Clearing this can often fix stubborn website loading issues.", answer: "CACHE" },
    { clue: "Someone else's computer where your data actually lives.", answer: "CLOUD" },
    { clue: "A software update designed to fix a vulnerability or bug.", answer: "PATCH" },
    { clue: "An open-source operating system represented by a penguin.", answer: "LINUX" },
    { clue: "A physical or digital key used for two-factor authentication.", answer: "TOKEN" },
    { clue: "It modulates and demodulates your internet connection.", answer: "MODEM" }
  ];
  const currentPuzzle = crypticPuzzles[crypticIndex];

  /* 2. SLIDING PUZZLE STATE */
  const [slidingTiles, setSlidingTiles] = useState([8, 2, 3, 1, 6, 4, 7, 5, 9]);

  /* 3. CACHE FLUSH (MEMORY) STATE */
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [memoryLock, setMemoryLock] = useState(false);

  /* 4. BIOS SEQUENCE (SIMON) STATE */
  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const [flashColor, setFlashColor] = useState(null);
  const [biosMessage, setBiosMessage] = useState("Press Start to Boot");

  /* SYSTEM STATUS STATE */
  const [systemStatus, setSystemStatus] = useState("operational"); 

  /* SCRAPBOOK STATE */
  const [scraps, setScraps] = useState([
    { id: 1, author: "Guest User", text: "Welcome to the new IT Scrapbook! Let's keep the team spirit high. 🚀", time: "2 hours ago" },
    { id: 2, author: "Guest User", text: "Great job on the VPN migration yesterday, everyone!", time: "4 hours ago" }
  ]);
  const [newScrap, setNewScrap] = useState("");

  /* ROADMAP PROJECTS DATA */
  const [projects] = useState([
    { id: "IT-402", title: "Windows 11 Fleet Migration", status: "In Progress", progress: 65, priority: "High" },
    { id: "IT-405", title: "Okta SSO Integration for Zendesk", status: "In Review", progress: 90, priority: "Medium" },
    { id: "IT-410", title: "Core Network Switch Upgrade", status: "Planned", progress: 0, priority: "High" },
    { id: "IT-399", title: "Legacy On-Prem Server Decommission", status: "Completed", progress: 100, priority: "Low" }
  ]);

  /* ========================================= */
  /* DYNAMIC ARTICLES (RESTORED ALL CONTENT)   */
  /* ========================================= */
  const defaultArticles = [
    { id: 1, title: "How to connect to Office WiFi", category: "Network", content: "Select 'Company_Guest' from your WiFi list. Enter the password 'Welcome2024'." },
    { id: 4, title: "Reset Password / Unlock Windows", category: "Accounts", content: "Go to identity.company.com and click 'Forgot Password'." },
    { id: 13, title: "OKTA Configuration", category: "Accounts", content: "Follow the prompts to scan your unique QR code in Okta Verify." },
    { id: 17, title: "Enrolling in Intune", category: "Mobile Devices", content: "Download the Company Portal app to enroll your device." },
    { id: 20, title: "MacOS FileVault Encryption", category: "Macintosh HD", content: "Go to System Settings > Privacy & Security > FileVault to ensure your disk is encrypted." },
    { id: 25, title: "HPIA Updates", category: "Software", content: "Run HP Image Assistant (HPIA) to automatically scan and install the latest drivers and BIOS updates for your device. Ensure you are connected to power." },
    { id: 30, title: "Zoom Workspace Configuration", category: "Communications", content: "Guide to setting up Zoom Rooms, pairing controllers, and troubleshooting audio/video sync issues." },
    { id: 31, title: "Zoom Phone Common Issues", category: "Communications", content: "Solutions for call quality drops, voicemail access errors, and headset pairing problems." },
    { id: 32, title: "Slack Configuration", category: "Communications", content: "How to set up channels, customize sidebar themes, and integrate third-party apps like Jira or Google Drive." },
    { id: 33, title: "Slack Notification Errors", category: "Communications", content: "Fixes for delayed alerts, missing banner notifications, and checking your 'Do Not Disturb' schedule." },
    { id: 34, title: "Five9 Basic Troubleshooting", category: "Communications", content: "Resolve softphone station login errors, browser extension connectivity, and audio latency issues." },
    { id: 35, title: "PolyCam Troubleshooting", category: "Communications", content: "Driver updates and lens framing calibration for Poly Studio and EagleEye cameras." },
    { id: 36, title: "Windows Hello Configuration", category: "Communications", content: "Setup facial recognition login using your laptop's IR camera or external certified webcam." },
    { id: 40, title: "Requesting a New Laptop/Peripherals", category: "Hardware", content: "Submit a request via ServiceNow. Manager approval is required for non-standard equipment. Standard lead time is 3-5 business days." },
    { id: 41, title: "Dual Monitor Docking Setup", category: "Hardware", content: "Connect both monitors to the HP/Dell docking station using DisplayPort or HDMI. Go to Windows Display Settings to arrange screen order and resolution." },
    { id: 42, title: "Mapping a Network Printer", category: "Printers", content: "Press Win + R, type '\\\\printserver01', and press Enter. Locate your floor's printer, right-click, and select 'Connect' to install drivers automatically." },
    { id: 43, title: "Clearing a Printer Paper Jam", category: "Printers", content: "Open the front panel. Gently pull the jammed paper in the normal direction of the paper path. Do not pull backwards to avoid damaging the rollers." },
    { id: 44, title: "Scan to Email Configuration", category: "Scanners", content: "On the multifunction device panel, tap 'Scanner', select 'Manual Entry', type your corporate email, load your documents into the top ADF tray, and hit Start." }
  ];

  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('kb_articles_db');
      if (saved && saved !== "undefined" && saved !== "null") {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load DB. Reverting to defaults.", e);
    }
    return defaultArticles;
  });

  useEffect(() => {
    localStorage.setItem('kb_articles_db', JSON.stringify(articles));
  }, [articles]);

  /* ADMIN PANEL STATE */
  const [editingId, setEditingId] = useState(null);
  const [adminForm, setAdminForm] = useState({ title: "", category: "Network", content: "" });

  const handleAdminSave = () => {
    if (!adminForm.title || !adminForm.content) {
      alert("Please fill out both the title and content.");
      return;
    }

    if (editingId) {
      setArticles(articles.map(art => art.id === editingId ? { ...adminForm, id: editingId } : art));
      alert("Article Updated Successfully!");
    } else {
      const newArticle = { ...adminForm, id: Date.now() };
      setArticles([newArticle, ...articles]);
      alert("New Article Created!");
    }
    
    setEditingId(null);
    setAdminForm({ title: "", category: "Network", content: "" });
  };

  const handleAdminEdit = (article) => {
    setEditingId(article.id);
    setAdminForm({ title: article.title, category: article.category, content: article.content });
    window.scrollTo(0, 0); 
  };

  const handleAdminDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article? This cannot be undone.")) {
      setArticles(articles.filter(art => art.id !== id));
    }
  };

  const handleAdminCancel = () => {
    setEditingId(null);
    setAdminForm({ title: "", category: "Network", content: "" });
  };

  /* NEW: Restore Defaults Function */
  const handleRestoreDefaults = () => {
    if (window.confirm("This will erase any new articles you created and restore the original comprehensive IT list. Do you want to proceed?")) {
      setArticles(defaultArticles);
      alert("Database Restored!");
    }
  };

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

  /* --- PUZZLE LOGIC --- */
  const handleTileClick = (index) => {
    const emptyIndex = slidingTiles.indexOf(9);
    const isSameRow = Math.floor(index / 3) === Math.floor(emptyIndex / 3) && Math.abs(index - emptyIndex) === 1;
    const isSameCol = index % 3 === emptyIndex % 3 && Math.abs(index - emptyIndex) === 3;

    if (isSameRow || isSameCol) {
      const newTiles = [...slidingTiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setSlidingTiles(newTiles);
      if (newTiles.join('') === '123456789') {
        setTimeout(() => alert("✅ SECURITY RESTORED! The FIREWALL is back online."), 150);
      }
    }
  };
  const getTileChar = (num) => {
    const chars = { 1: 'F', 2: 'I', 3: 'R', 4: 'E', 5: 'W', 6: 'A', 7: 'L', 8: 'L', 9: '' };
    return chars[num];
  };

  const initMemoryGame = () => {
    const icons = ['💾', '🔌', '🔋', '📡', '💿', '🖥️'];
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, flipped: false, matched: false }));
    setMemoryCards(deck);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMemoryLock(false);
  };

  const handleMemoryClick = (index) => {
    if (memoryLock || memoryCards[index].flipped || memoryCards[index].matched) return;
    
    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);
    
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryLock(true);
      const [first, second] = newFlipped;
      if (memoryCards[first].icon === memoryCards[second].icon) {
        setTimeout(() => {
          const matchedState = [...memoryCards];
          matchedState[first].matched = true;
          matchedState[second].matched = true;
          setMemoryCards(matchedState);
          setMatchedPairs([...matchedPairs, memoryCards[first].icon]);
          setFlippedIndices([]);
          setMemoryLock(false);
          if (matchedPairs.length + 1 === 6) alert("✅ CACHE CLEARED! Memory optimized.");
        }, 500);
      } else {
        setTimeout(() => {
          const resetState = [...memoryCards];
          resetState[first].flipped = false;
          resetState[second].flipped = false;
          setMemoryCards(resetState);
          setFlippedIndices([]);
          setMemoryLock(false);
        }, 1000);
      }
    }
  };

  const colors = ['red', 'green', 'blue', 'yellow'];
  const playFlash = (color) => {
    setFlashColor(color);
    setTimeout(() => setFlashColor(null), 300);
  };
  const playBiosSequence = async (seq) => {
    setIsPlayingSeq(true);
    setBiosMessage("Boot Sequence Loading...");
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      playFlash(seq[i]);
    }
    setIsPlayingSeq(false);
    setBiosMessage("Repeat Sequence");
  };
  const startBiosGame = () => {
    const newSeq = [colors[Math.floor(Math.random() * 4)]];
    setSequence(newSeq);
    setUserStep(0);
    playBiosSequence(newSeq);
  };
  const handleBiosClick = (color) => {
    if (isPlayingSeq) return;
    playFlash(color);
    if (color === sequence[userStep]) {
      if (userStep === sequence.length - 1) {
        setBiosMessage("✅ Sequence Verified. Loading next module...");
        setTimeout(() => {
          const newSeq = [...sequence, colors[Math.floor(Math.random() * 4)]];
          setSequence(newSeq);
          setUserStep(0);
          playBiosSequence(newSeq);
        }, 1000);
      } else {
        setUserStep(userStep + 1);
      }
    } else {
      setBiosMessage("❌ BOOT FAILURE! System Halted.");
      setSequence([]);
    }
  };

  const handlePostScrap = () => {
    if (!newScrap.trim()) return;
    const post = { id: Date.now(), author: "Guest User", text: newScrap, time: "Just now" };
    setScraps([post, ...scraps]);
    setNewScrap("");
  };

  /* DYNAMIC SVG CATEGORIES */
  const categories = [
    { name: "Network", icon: <Globe size={32} />, desc: "WiFi, VPN, and Internet" },
    { name: "Accounts", icon: <User size={32} />, desc: "Passwords and Identity" },
    { name: "Software", icon: <Wrench size={32} />, desc: "Apps, Installs, and Licensing" },
    { name: "Hardware", icon: <Laptop size={32} />, desc: "Laptops, Monitors, and Kits" },
    { name: "Printers", icon: <Printer size={32} />, desc: "Setup, Paper Jams, and Scanning" },
    { name: "Communications", icon: <MessageSquare size={32} />, desc: "Zoom, Slack, Gmail & Audio" },
    { name: "Scanners", icon: <Folder size={32} />, desc: "Document Scanning" },
    { name: "Mobile Devices", icon: <Smartphone size={32} />, desc: "Smartphones & Tablets" },
    { name: "Macintosh HD", icon: <Monitor size={32} />, desc: "MacOS & Apple Support" }
  ];

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateTo = (page) => {
    setCurrentPage(page);
    setShowQuiz(false);
    setActivePuzzle(null);
  };

  return (
    <div className="App">
      <header className="hero-section">
        <div className="status-indicator" onClick={() => navigateTo('outages')}>
          <span className={`status-dot ${systemStatus}`}></span>
          <span className="status-text">{systemStatus === 'operational' ? 'System Operational' : 'Active Outage'}</span>
        </div>

        <h1 onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>IT Knowledge Base</h1>
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
             <button onClick={() => {setSearchTerm("WiFi"); navigateTo('home');}}><Globe size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>Connect WiFi</button>
             <button onClick={() => {setSearchTerm("Password"); navigateTo('home');}}><User size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>Reset Password</button>
             <button onClick={() => {setSearchTerm("VPN"); navigateTo('home');}}><Lock size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>VPN Help</button>
          </div>

          <div className="it-dock-container">
            <div className="it-dock">
              <div className="dock-item" onClick={() => navigateTo('home')}>
                <Home className="dock-icon" size={24} />
                <span className="dock-label">Home</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('links')}>
                <LinkIcon className="dock-icon" size={24} />
                <span className="dock-label">Links</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('refreshment')}>
                <Coffee className="dock-icon" size={24} />
                <span className="dock-label">Refreshment</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('whatsnew')}>
                <Newspaper className="dock-icon" size={24} />
                <span className="dock-label">Whats New</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('wanted')}>
                <Ticket className="dock-icon" size={24} />
                <span className="dock-label">Wanted Tickets</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('dispatch')}>
                <Truck className="dock-icon" size={24} />
                <span className="dock-label">Dispatch</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('linear')}>
                <TrendingUp className="dock-icon" size={24} />
                <span className="dock-label">Linear</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('ess')}>
                <IdCard className="dock-icon" size={24} />
                <span className="dock-label">Self Service</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('outages')}>
                <AlertTriangle className="dock-icon" size={24} />
                <span className="dock-label">Outages</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('puzzle')}>
                <Puzzle className="dock-icon" size={24} />
                <span className="dock-label">Puzzle Zone</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('scrapbook')}>
                <Book className="dock-icon" size={24} />
                <span className="dock-label">Scrap Book</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('team')}>
                <Users className="dock-icon" size={24} />
                <span className="dock-label">Our Team</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('admin')}>
                <Settings className="dock-icon" size={24} />
                <span className="dock-label">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HOME PAGE */}
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
                {filteredArticles.length === 0 ? <p style={{color: '#666'}}>No articles found. Try another search.</p> : null}
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

      {/* ADMIN CONTROL PANEL PAGE */}
      {currentPage === 'admin' && (
        <section className="container admin-container">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #e5e5ea', paddingBottom: '20px'}}>
            <h2 style={{margin: 0, fontSize: '32px', fontWeight: 800, background: 'linear-gradient(135deg, #1d1d1f, #555555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}><Settings size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/> KB Control Panel</h2>
            <button className="clear-link" onClick={handleRestoreDefaults} style={{color: '#d32f2f', borderColor: '#ffcdd2', background: '#ffebee'}}>⚠️ Restore Defaults</button>
          </div>

          <div className="admin-grid">
            <div className="admin-form-card">
              <h3>{editingId ? "Edit Article" : "Create New Article"}</h3>
              <label>Article Title</label>
              <input type="text" value={adminForm.title} onChange={e => setAdminForm({...adminForm, title: e.target.value})} placeholder="e.g. How to install Photoshop"/>
              <label>Category</label>
              <select value={adminForm.category} onChange={e => setAdminForm({...adminForm, category: e.target.value})}>
                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <label>Content / Instructions</label>
              <textarea value={adminForm.content} onChange={e => setAdminForm({...adminForm, content: e.target.value})} placeholder="Write the step-by-step instructions here..." rows="6"/>
              <div className="admin-form-actions">
                {editingId && <button className="clear-link" onClick={handleAdminCancel}>Cancel Edit</button>}
                <button className="post-btn" onClick={handleAdminSave}>{editingId ? "Update Article" : "Publish Article"}</button>
              </div>
            </div>

            <div className="admin-list-card">
              <h3>Manage Existing Articles ({articles.length})</h3>
              <div className="admin-article-list">
                {articles.map(art => (
                  <div key={art.id} className="admin-list-item">
                    <div className="admin-list-info">
                      <span className="badge-v2">{art.category}</span>
                      <h4>{art.title}</h4>
                    </div>
                    <div className="admin-list-actions">
                      <button className="btn-edit" onClick={() => handleAdminEdit(art)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleAdminDelete(art.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Home</button>
        </section>
      )}

      {/* REFRESHMENT PAGE */}
      {currentPage === 'refreshment' && (
        <section className="container">
          <h2 className="section-title"><Coffee size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>Refreshment Corner</h2>
          {!showQuiz ? (
            <div className="category-grid">
              <div className="category-card" onClick={() => setShowQuiz(true)}>
                <div className="category-icon"><ClipboardList size={32} /></div>
                <h3>Weekly Quiz</h3>
                <p>Test your knowledge on this week's system updates!</p>
              </div>
              <div className="category-card">
                <div className="category-icon"><BookOpen size={32} /></div>
                <h3>Skill Up</h3>
                <p>Access the latest certifications and training modules for the team.</p>
              </div>
              <div className="category-card">
                <div className="category-icon"><Wrench size={32} /></div>
                <h3>New Tools</h3>
                <p>Explore recently approved software and IT hardware kits.</p>
              </div>
              <div className="category-card">
                <div className="category-icon"><Lightbulb size={32} /></div>
                <h3>Best Practices</h3>
                <p>Improve your workflow with updated documentation and tips.</p>
              </div>
            </div>
          ) : (
            <div className="puzzle-card">
              <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">weekly_assessment.exe</span>
              </div>
              <div className="terminal-body">
                <p className="terminal-text" style={{color: '#00ff00', fontFamily: 'monospace'}}>>> QUESTION: Which port is typically used for secure web traffic (HTTPS)?</p>
                <div className="puzzle-input-area" style={{marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <span style={{color: '#00ff00'}}>$</span>
                  <input type="text" placeholder="Enter port number..." id="quizInput" autoComplete="off" style={{background: 'transparent', border: 'none', borderBottom: '2px solid #00ff00', color: '#fff', outline: 'none', padding: '5px'}}/>
                  <button className="post-btn" onClick={() => {
                    const val = document.getElementById('quizInput').value.trim();
                    if(val === "443") { alert("✅ Correct! You've mastered secure protocols."); setShowQuiz(false); } 
                    else { alert("❌ Incorrect. Hint: It's the standard for SSL."); }
                  }}>Submit</button>
                </div>
                <button className="clear-link" style={{marginTop: '20px'}} onClick={() => setShowQuiz(false)}>Cancel Quiz</button>
              </div>
            </div>
          )}
          {!showQuiz && <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>}
        </section>
      )}

      {/* LINKS PAGE */}
      {currentPage === 'links' && (
        <section className="container">
          <h2 className="section-title"><LinkIcon size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>Quick Access Links</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => window.open('https://portal.azure.com', '_blank')}><div className="category-icon"><Cloud size={32} /></div><h3>Azure Portal</h3><p>Manage users & cloud resources.</p></div>
            <div className="category-card" onClick={() => window.open('https://admin.google.com', '_blank')}><div className="category-icon"><Wrench size={32} /></div><h3>Google Admin</h3><p>Workspace management.</p></div>
            <div className="category-card" onClick={() => window.open('https://intune.microsoft.com', '_blank')}><div className="category-icon"><Smartphone size={32} /></div><h3>Intune Manager</h3><p>MDM control center.</p></div>
            <div className="category-card" onClick={() => alert("Redirecting to ServiceNow...")}><div className="category-icon"><Ticket size={32} /></div><h3>ServiceNow</h3><p>Incident management system.</p></div>
            <div className="category-card" onClick={() => alert("Redirecting to Jira...")}><div className="category-icon"><Bug size={32} /></div><h3>Jira</h3><p>Bug tracking & dev boards.</p></div>
            <div className="category-card" onClick={() => alert("Opening Password Tool...")}><div className="category-icon"><Key size={32} /></div><h3>LAPS UI</h3><p>Local Admin Passwords lookup.</p></div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* DISPATCH PAGE */}
      {currentPage === 'dispatch' && (
        <section className="container">
          <h2 className="section-title"><Truck size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>Dispatch Command</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => alert("Reports module loading...")}><div className="category-icon"><BarChart size={32} /></div><h3>Reports</h3><p>View daily dispatch logs and performance metrics.</p></div>
            <div className="category-card" onClick={() => alert("Schedule module loading...")}><div className="category-icon"><Calendar size={32} /></div><h3>Schedule</h3><p>View shift rotations, on-call assignments, and availability.</p></div>
            <div className="category-card" onClick={() => alert("Live Map feature coming soon!")}><div className="category-icon"><MapPin size={32} /></div><h3>Live Map</h3><p>Real-time location tracking of field support units.</p></div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* WANTED TICKETS PAGE */}
      {currentPage === 'wanted' && (
        <section className="container">
          <h2 className="section-title"><Ticket size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>Wanted Tickets</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => alert("Loading Top Call Drivers analytics...")}><div className="category-icon"><Flame size={32} /></div><h3>Top Call Drivers</h3><p>Identify the most frequent issues spiking the help desk volume.</p></div>
            <div className="category-card" onClick={() => alert("Opening Investigation Board...")}><div className="category-icon"><Search size={32} /></div><h3>Investigation</h3><p>Deep dive into complex incidents requiring root cause analysis.</p></div>
            <div className="category-card" onClick={() => alert("Filtering Priority Bucket...")}><div className="category-icon"><AlertOctagon size={32} /></div><h3>Priority Bucket</h3><p>Urgent tickets affecting VIPs or critical business operations.</p></div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* LINEAR PAGE */}
      {currentPage === 'linear' && (
        <section className="container" style={{maxWidth: '800px'}}>
          <h2 className="section-title"><TrendingUp size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>IT Project Roadmap</h2>
          <div className="roadmap-list">
            {projects.map(proj => (
              <div key={proj.id} className="project-card">
                <div className="project-header">
                  <div>
                    <span className="project-id">{proj.id}</span>
                    <h3 style={{margin: '5px 0 0 0', color: '#333'}}>{proj.title}</h3>
                  </div>
                  <span className={`status-badge status-${proj.status.replace(/\s+/g, '')}`}>{proj.status}</span>
                </div>
                <div className="progress-container" style={{marginTop: '15px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '5px'}}>
                    <span>Progress</span>
                    <span>{proj.progress}%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill" style={{width: `${proj.progress}%`}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* EMPLOYEE SELF SERVICE PAGE */}
      {currentPage === 'ess' && (
        <section className="container">
          <h2 className="section-title"><IdCard size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>Employee Self Service</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => alert("Redirecting to HR Portal...")}><div className="category-icon"><Users size={32} /></div><h3>HR Portal</h3><p>Access pay stubs, benefits, and time-off requests.</p></div>
            <div className="category-card" onClick={() => alert("Opening My Assets...")}><div className="category-icon"><Laptop size={32} /></div><h3>My Assets</h3><p>View assigned laptops, monitors, and peripherals.</p></div>
            <div className="category-card" onClick={() => alert("Loading Access Rights...")}><div className="category-icon"><Lock size={32} /></div><h3>My Access</h3><p>Review current software permissions and request new access.</p></div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* OUTAGES PAGE */}
      {currentPage === 'outages' && (
        <section className="container">
          <h2 className="section-title"><AlertTriangle size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>System Status & Outages</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => alert("Fetching live status dashboard...")}><div className="category-icon"><AlertCircle size={32} /></div><h3>Current Affected Services</h3><p>Real-time dashboard of active incidents and degraded systems.</p></div>
            <div className="category-card" onClick={() => alert("Opening maintenance calendar...")}><div className="category-icon"><Calendar size={32} /></div><h3>Planned Maintenance</h3><p>Upcoming scheduled downtime and system upgrades.</p></div>
            <div className="category-card" onClick={() => alert("Loading outage history...")}><div className="category-icon"><FileText size={32} /></div><h3>Past Incidents</h3><p>Archive of resolved outages and root cause analysis (RCA).</p></div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* TEAM PAGE */}
      {currentPage === 'team' && (
        <section className="container team-section">
          <h2 className="section-title"><Users size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>Meet Our Team</h2>
          <div className="manager-row">
            {teamMembers.filter(m => m.isManager).map(manager => (
              <div key={manager.name} className="team-card manager-card">
                <div className="avatar"><Briefcase size={48} color="var(--primary)" /></div>
                <h3>{manager.name}</h3>
                <p className="role">{manager.role}</p>
              </div>
            ))}
          </div>
          <div className="team-grid">
            {teamMembers.filter(m => !m.isManager).map(member => (
              <div key={member.name} className="team-card">
                <div className="avatar"><User size={48} color="#666" /></div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* SCRAPBOOK PAGE */}
      {currentPage === 'scrapbook' && (
        <section className="container scrapbook-section">
          <h2 className="section-title"><Book size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>Team Scrapbook</h2>
          <div className="scrap-input-card">
            <textarea placeholder="Post a scrap to the team..." value={newScrap} onChange={(e) => setNewScrap(e.target.value)}/>
            <button className="post-btn" onClick={handlePostScrap}>Post Scrap</button>
          </div>
          <div className="scrap-feed">
            {scraps.map(scrap => (
              <div key={scrap.id} className="scrap-card">
                <div className="scrap-header"><strong>{scrap.author}</strong><span className="scrap-time">{scrap.time}</span></div>
                <p className="scrap-text">{scrap.text}</p>
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* WHATS NEW PAGE */}
      {currentPage === 'whatsnew' && (
        <section className="container">
          <h2 className="section-title"><Newspaper size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>What's New</h2>
          <div className="article-list-v2">
            <div className="article-row-card"><span className="badge-v2">Newsletter</span><h3>Monthly IT Hub Update - Feb 2026</h3><p className="sub-text-v2">Major updates to the knowledge base and upcoming team dinner!</p></div>
            <div className="article-row-card"><span className="badge-v2">Alert</span><h3>System Maintenance Schedule</h3><p className="sub-text-v2">Scheduled downtime for the internal portal this weekend at 12 AM.</p></div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* PUZZLE ZONE PAGE */}
      {currentPage === 'puzzle' && (
        <section className="container puzzle-section">
          <h2 className="section-title"><Puzzle size={28} style={{verticalAlign: 'bottom', marginRight: '10px'}}/>IT Puzzle Zone</h2>
          {!activePuzzle ? (
            <>
              <div className="category-grid" style={{ marginTop: '20px' }}>
                <div className="category-card" onClick={() => setActivePuzzle('terminal')}><div className="category-icon"><Terminal size={32} /></div><h3>Terminal Recovery</h3><p>Decrypt the hex string.</p></div>
                <div className="category-card" onClick={() => setActivePuzzle('cryptic')}><div className="category-icon"><Newspaper size={32} /></div><h3>Daily Cryptic</h3><p>Solve the IT crossword.</p></div>
                <div className="category-card" onClick={() => setActivePuzzle('sliding')}><div className="category-icon"><Square size={32} /></div><h3>Server Rack</h3><p>Restore the Firewall.</p></div>
                <div className="category-card" onClick={() => { setActivePuzzle('memory'); initMemoryGame(); }}><div className="category-icon"><Brain size={32} /></div><h3>Cache Flush</h3><p>Clear memory blocks.</p></div>
                <div className="category-card" onClick={() => setActivePuzzle('bios')}><div className="category-icon"><Cpu size={32} /></div><h3>BIOS Sequence</h3><p>Memorize the boot pattern.</p></div>
              </div>
              <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
            </>
          ) : (
            <div>
              {/* TERMINAL */}
              {activePuzzle === 'terminal' && (
                <div className="puzzle-card"><div className="terminal-body"><p className="terminal-text">>> HEX_STRING: 73 68 75 74 20 64 6f 77 6e</p><input id="puzzleInput" type="text" placeholder="Decrypt..." style={{background:'transparent', color:'white', border:'none', borderBottom:'1px solid lime'}} /><button className="post-btn" onClick={()=>{if(document.getElementById('puzzleInput').value.trim().toLowerCase()==='shut down') alert('Access Granted')}}>Execute</button></div></div>
              )}
              {/* CRYPTIC */}
              {activePuzzle === 'cryptic' && (
                <div className="newspaper-card"><div className="news-header"><h2>Daily Cryptic</h2></div><p>{currentPuzzle.clue} ({currentPuzzle.answer.length} letters)</p><div className="news-input-area"><input className="news-input" value={newspaperGuess} onChange={e=>setNewspaperGuess(e.target.value.toUpperCase())} /><button className="news-btn" onClick={()=>{if(newspaperGuess===currentPuzzle.answer) alert("Correct!")}}>Check</button></div></div>
              )}
              {/* SLIDING */}
              {activePuzzle === 'sliding' && (
                <div className="sliding-puzzle-card"><div className="sliding-grid">{slidingTiles.map((t,i)=><div key={i} className={`slide-tile ${t===9?'empty-tile':''}`} onClick={()=>handleTileClick(i)}>{t!==9 && getTileChar(t)}</div>)}</div></div>
              )}
              {/* MEMORY */}
              {activePuzzle === 'memory' && (
                <div className="memory-wrapper" style={{textAlign: 'center', marginTop: '20px'}}><div className="memory-grid">{memoryCards.map((card, index) => (<div key={index} className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`} onClick={() => handleMemoryClick(index)}><div className="memory-front">❓</div><div className="memory-back">{card.icon}</div></div>))}</div><button className="post-btn" style={{marginTop: '20px'}} onClick={initMemoryGame}>Reset Cache</button></div>
              )}
              {/* BIOS */}
              {activePuzzle === 'bios' && (
                <div className="bios-wrapper" style={{textAlign: 'center', marginTop: '30px', background: '#222', padding: '40px', borderRadius: '12px', border: '2px solid #444'}}><h2 style={{color: '#0f0', fontFamily: 'monospace', marginBottom: '30px'}}>{biosMessage}</h2><div className="bios-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '300px', margin: '0 auto'}}>{colors.map(color => (<div key={color} className={`bios-btn ${color} ${flashColor === color ? 'flash' : ''}`} onClick={() => handleBiosClick(color)} style={{height: '100px', borderRadius: '8px', cursor: 'pointer', opacity: flashColor === color ? 1 : 0.4, border: '2px solid white'}}></div>))}</div>{!sequence.length && <button className="post-btn" style={{marginTop: '30px'}} onClick={startBiosGame}>Start Boot</button>}</div>
              )}
              <button className="back-btn" style={{marginTop: '40px'}} onClick={() => setActivePuzzle(null)}>← Back to Puzzles</button>
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer className="support-footer">
        <div className="footer-content">
          <h2>Still need help?</h2>
          <div className="footer-buttons">
            <a href="mailto:support@company.com" className="footer-btn">Email Support</a>
            <a href="tel:18776602041" className="footer-btn">Call 1-877-660-2041</a>
            <a href="mailto:kb-feedback@company.com" className="footer-btn">Feed your KB</a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Company IT Service Desk</p>
        </div>
      </footer>

      {/* MODAL POPUP FOR ARTICLES */}
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