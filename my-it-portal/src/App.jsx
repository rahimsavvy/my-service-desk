import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  /* PUZZLE & QUIZ STATES */
  const [showQuiz, setShowQuiz] = useState(false);
  const [activePuzzle, setActivePuzzle] = useState(null);

  /* DYNAMIC CRYPTIC PUZZLE STATE */
  const [newspaperGuess, setNewspaperGuess] = useState(""); 
  const [crypticIndex, setCrypticIndex] = useState(0); 

  /* Array of 10 IT-related puzzles */
  const crypticPuzzles = [
    { clue: "Clearing this can often fix stubborn website loading issues.", answer: "CACHE" },
    { clue: "Someone else's computer where your data actually lives.", answer: "CLOUD" },
    { clue: "A software update designed to fix a vulnerability or bug.", answer: "PATCH" },
    { clue: "An open-source operating system represented by a penguin.", answer: "LINUX" },
    { clue: "A physical or digital key used for two-factor authentication.", answer: "TOKEN" },
    { clue: "It modulates and demodulates your internet connection.", answer: "MODEM" },
    { clue: "Malicious code designed to spread from host to host.", answer: "VIRUS" },
    { clue: "A single tiny dot of color on your monitor.", answer: "PIXEL" },
    { clue: "A recorded series of keystrokes to automate repetitive tasks.", answer: "MACRO" },
    { clue: "A request for data or information from a database.", answer: "QUERY" }
  ];
  
  const currentPuzzle = crypticPuzzles[crypticIndex];

  /* SLIDING TILE PUZZLE STATE */
  const [slidingTiles, setSlidingTiles] = useState([8, 2, 3, 1, 6, 4, 7, 5, 9]);

  /* SCRAPBOOK STATE */
  const [scraps, setScraps] = useState([
    { id: 1, author: "Guest User", text: "Welcome to the new IT Scrapbook! Let's keep the team spirit high. 🚀", time: "2 hours ago" },
    { id: 2, author: "Guest User", text: "Great job on the VPN migration yesterday, everyone!", time: "4 hours ago" }
  ]);
  const [newScrap, setNewScrap] = useState("");

  const [articles] = useState([
    { id: 1, title: "How to connect to Office WiFi", category: "Network", content: "Select 'Company_Guest' from your WiFi list. Enter the password 'Welcome2024'." },
    { id: 4, title: "Reset Password / Unlock Windows", category: "Accounts", content: "Go to identity.company.com and click 'Forgot Password'." },
    { id: 13, title: "OKTA Configuration", category: "Accounts", content: "Follow the prompts to scan your unique QR code in Okta Verify." },
    { id: 17, title: "Enrolling in Intune", category: "Mobile Devices", content: "Download the Company Portal app to enroll your device." },
    { id: 20, title: "MacOS FileVault Encryption", category: "Macintosh HD", content: "Go to System Settings > Privacy & Security > FileVault to ensure your disk is encrypted." }
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
    { name: "Mobile Devices", icon: "📱", desc: "Smartphones & Tablets" },
    { name: "Macintosh HD", icon: "🍎", desc: "MacOS & Apple Support" }
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

  return (
    <div className="App">
      <header className="hero-section">
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
             <button onClick={() => {setSearchTerm("WiFi"); navigateTo('home');}}>🌐 Connect WiFi</button>
             <button onClick={() => {setSearchTerm("Password"); navigateTo('home');}}>👤 Reset Password</button>
             <button onClick={() => {setSearchTerm("VPN"); navigateTo('home');}}>🔒 VPN Help</button>
          </div>

          <div className="it-dock-container">
            <div className="it-dock">
              <div className="dock-item" onClick={() => navigateTo('home')}>
                <span className="dock-icon">🏠</span>
                <span className="dock-label">Home</span>
              </div>
              <div className="dock-item"><span className="dock-icon">🔗</span><span className="dock-label">Links</span></div>
              <div className="dock-item" onClick={() => navigateTo('refreshment')}>
                <span className="dock-icon">☕</span>
                <span className="dock-label">Refreshment</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('whatsnew')}>
                <span className="dock-icon">🗞️</span>
                <span className="dock-label">Whats New</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('wanted')}>
                <span className="dock-icon">🎟️</span>
                <span className="dock-label">Wanted Tickets</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('dispatch')}>
                <span className="dock-icon">🚚</span>
                <span className="dock-label">Dispatch</span>
              </div>
              <div className="dock-item"><span className="dock-icon">📈</span><span className="dock-label">Linear</span></div>
              <div className="dock-item" onClick={() => navigateTo('ess')}>
                <span className="dock-icon">🪪</span>
                <span className="dock-label">Self Service</span>
              </div>
              
              {/* OUTAGES ICON - NOW ACTIVE */}
              <div className="dock-item" onClick={() => navigateTo('outages')}>
                <span className="dock-icon">⚠️</span>
                <span className="dock-label">Outages</span>
              </div>
              
              <div className="dock-item" onClick={() => navigateTo('puzzle')}>
                <span className="dock-icon">🧩</span>
                <span className="dock-label">Puzzle Zone</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('scrapbook')}>
                <span className="dock-icon">📓</span>
                <span className="dock-label">Scrap Book</span>
              </div>
              <div className="dock-item" onClick={() => navigateTo('team')}>
                <span className="dock-icon">👥</span>
                <span className="dock-label">Our Team</span>
              </div>
              <div className="dock-item"><span className="dock-icon">📞</span><span className="dock-label">Contact</span></div>
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

      {/* REFRESHMENT PAGE */}
      {currentPage === 'refreshment' && (
        <section className="container">
          <h2 className="section-title">☕ Refreshment Corner</h2>
          {!showQuiz ? (
            <div className="category-grid">
              <div className="category-card" onClick={() => setShowQuiz(true)}>
                <div className="category-icon">📝</div>
                <h3>Weekly Quiz</h3>
                <p>Test your knowledge on this week's system updates!</p>
              </div>
              <div className="category-card">
                <div className="category-icon">📚</div>
                <h3>Skill Up</h3>
                <p>Access the latest certifications and training modules for the team.</p>
              </div>
              <div className="category-card">
                <div className="category-icon">🛠️</div>
                <h3>New Tools</h3>
                <p>Explore recently approved software and IT hardware kits.</p>
              </div>
              <div className="category-card">
                <div className="category-icon">💡</div>
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
                  <input 
                    type="text" 
                    placeholder="Enter port number..." 
                    id="quizInput" 
                    autoComplete="off"
                    style={{background: 'transparent', border: 'none', borderBottom: '2px solid #00ff00', color: '#fff', outline: 'none', padding: '5px'}}
                  />
                  <button className="post-btn" onClick={() => {
                    const val = document.getElementById('quizInput').value.trim();
                    if(val === "443") {
                      alert("✅ Correct! You've mastered secure protocols.");
                      setShowQuiz(false);
                    } else {
                      alert("❌ Incorrect. Hint: It's the standard for SSL.");
                    }
                  }}>Submit</button>
                </div>
                <button className="clear-link" style={{marginTop: '20px'}} onClick={() => setShowQuiz(false)}>Cancel Quiz</button>
              </div>
            </div>
          )}
          {!showQuiz && <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>}
        </section>
      )}

      {/* DISPATCH PAGE */}
      {currentPage === 'dispatch' && (
        <section className="container">
          <h2 className="section-title">🚚 Dispatch Command</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => alert("Reports module loading...")}>
              <div className="category-icon">📊</div>
              <h3>Reports</h3>
              <p>View daily dispatch logs and performance metrics.</p>
            </div>
            <div className="category-card" onClick={() => alert("Schedule module loading...")}>
              <div className="category-icon">📅</div>
              <h3>Schedule</h3>
              <p>View shift rotations, on-call assignments, and availability.</p>
            </div>
            <div className="category-card" onClick={() => alert("Live Map feature coming soon!")}>
              <div className="category-icon">📍</div>
              <h3>Live Map</h3>
              <p>Real-time location tracking of field support units.</p>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* WANTED TICKETS PAGE */}
      {currentPage === 'wanted' && (
        <section className="container">
          <h2 className="section-title">🎟️ Wanted Tickets</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => alert("Loading Top Call Drivers analytics...")}>
              <div className="category-icon">🔥</div>
              <h3>Top Call Drivers</h3>
              <p>Identify the most frequent issues spiking the help desk volume.</p>
            </div>
            <div className="category-card" onClick={() => alert("Opening Investigation Board...")}>
              <div className="category-icon">🕵️‍♂️</div>
              <h3>Investigation</h3>
              <p>Deep dive into complex incidents requiring root cause analysis.</p>
            </div>
            <div className="category-card" onClick={() => alert("Filtering Priority Bucket...")}>
              <div className="category-icon">🚨</div>
              <h3>Priority Bucket</h3>
              <p>Urgent tickets affecting VIPs or critical business operations.</p>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* EMPLOYEE SELF SERVICE PAGE */}
      {currentPage === 'ess' && (
        <section className="container">
          <h2 className="section-title">🪪 Employee Self Service</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => alert("Redirecting to HR Portal...")}>
              <div className="category-icon">👥</div>
              <h3>HR Portal</h3>
              <p>Access pay stubs, benefits, and time-off requests.</p>
            </div>
            <div className="category-card" onClick={() => alert("Opening My Assets...")}>
              <div className="category-icon">💻</div>
              <h3>My Assets</h3>
              <p>View assigned laptops, monitors, and peripherals.</p>
            </div>
            <div className="category-card" onClick={() => alert("Loading Access Rights...")}>
              <div className="category-icon">🔐</div>
              <h3>My Access</h3>
              <p>Review current software permissions and request new access.</p>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* OUTAGES PAGE - NEW */}
      {currentPage === 'outages' && (
        <section className="container">
          <h2 className="section-title">⚠️ System Status & Outages</h2>
          <div className="category-grid">
            {/* REQUESTED TOPIC */}
            <div className="category-card" onClick={() => alert("Fetching live status dashboard...")}>
              <div className="category-icon">🔴</div>
              <h3>Current Affected Services</h3>
              <p>Real-time dashboard of active incidents and degraded systems.</p>
            </div>
            
            {/* PLACEHOLDER 1 */}
            <div className="category-card" onClick={() => alert("Opening maintenance calendar...")}>
              <div className="category-icon">🗓️</div>
              <h3>Planned Maintenance</h3>
              <p>Upcoming scheduled downtime and system upgrades.</p>
            </div>

            {/* PLACEHOLDER 2 */}
            <div className="category-card" onClick={() => alert("Loading outage history...")}>
              <div className="category-icon">📜</div>
              <h3>Past Incidents</h3>
              <p>Archive of resolved outages and root cause analysis (RCA).</p>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* TEAM PAGE */}
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
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* SCRAPBOOK PAGE */}
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
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* WHATS NEW PAGE */}
      {currentPage === 'whatsnew' && (
        <section className="container">
          <h2 className="section-title">🗞️ What's New</h2>
          <div className="article-list-v2">
            <div className="article-row-card">
              <span className="badge-v2">Newsletter</span>
              <h3>Monthly IT Hub Update - Feb 2026</h3>
              <p className="sub-text-v2">Major updates to the knowledge base and upcoming team dinner!</p>
            </div>
            <div className="article-row-card">
              <span className="badge-v2">Alert</span>
              <h3>System Maintenance Schedule</h3>
              <p className="sub-text-v2">Scheduled downtime for the internal portal this weekend at 12 AM.</p>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* PUZZLE ZONE PAGE */}
      {currentPage === 'puzzle' && (
        <section className="container puzzle-section">
          <h2 className="section-title">🧩 IT Puzzle Zone</h2>
          
          {!activePuzzle ? (
            <>
              <div className="category-grid" style={{ marginTop: '20px' }}>
                <div className="category-card" onClick={() => setActivePuzzle('terminal')}>
                  <div className="category-icon">🖥️</div>
                  <h3>Terminal Recovery</h3>
                  <p>Decrypt the hex string to restore the system.</p>
                </div>
                <div className="category-card" onClick={() => setActivePuzzle('cryptic')}>
                  <div className="category-icon">🗞️</div>
                  <h3>Daily Cryptic</h3>
                  <p>Solve the {crypticPuzzles.length}-level crossword challenge.</p>
                </div>
                <div className="category-card" onClick={() => setActivePuzzle('sliding')}>
                  <div className="category-icon">🔲</div>
                  <h3>Server Rack</h3>
                  <p>Slide the blocks to rebuild the FIREWALL.</p>
                </div>
              </div>
              <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
            </>
          ) : (
            <div>
              {/* PUZZLE 1: TERMINAL */}
              {activePuzzle === 'terminal' && (
                <div className="puzzle-card" style={{ marginTop: '0' }}>
                  <div className="terminal-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="terminal-title">system_recovery.sh</span>
                  </div>
                  <div className="terminal-body">
                    <p className="terminal-text" style={{color: '#00ff00', fontFamily: 'monospace'}}>>> ERROR: Critical IT term encrypted.</p>
                    <p className="terminal-text" style={{color: '#00ff00', fontFamily: 'monospace'}}>>> HEX_STRING: <span style={{color: '#fff', background: '#333', padding: '2px 5px'}}>73 68 75 74 20 64 6f 77 6e</span></p>
                    <div className="puzzle-input-area" style={{marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center'}}>
                      <span style={{color: '#00ff00'}}>$</span>
                      <input 
                        type="text" 
                        placeholder="Enter decrypted string..." 
                        id="puzzleInput" 
                        autoComplete="off"
                        style={{background: 'transparent', border: 'none', borderBottom: '2px solid #00ff00', color: '#fff', outline: 'none', padding: '5px'}}
                      />
                      <button className="post-btn" onClick={() => {
                        const val = document.getElementById('puzzleInput').value.toLowerCase().trim();
                        if(val === "shut down") {
                          alert("✅ Access Granted. Terminal Restored.");
                        } else {
                          alert("❌ Invalid Credentials. Hint: What you do at 5:00 PM.");
                        }
                      }}>Execute</button>
                    </div>
                  </div>
                </div>
              )}

              {/* PUZZLE 2: DYNAMIC NEWSPAPER CRYPTIC */}
              {activePuzzle === 'cryptic' && (
                <div className="newspaper-card" style={{ marginTop: '0' }}>
                  <div className="news-header">
                    <h2>The Daily IT Cryptic</h2>
                    <p>Vol. 1 - Level {crypticIndex + 1} of {crypticPuzzles.length}</p>
                  </div>
                  <div className="news-body">
                    <p className="clue-text">
                      <strong>Clue:</strong> {currentPuzzle.clue} <br/>
                      <span style={{fontSize: '14px', color: '#666'}}>({currentPuzzle.answer.length} Letters)</span>
                    </p>
                    
                    <div className="block-row">
                      {Array.from({ length: currentPuzzle.answer.length }).map((_, index) => (
                        <div key={index} className="letter-block">
                          {newspaperGuess[index] || ""}
                        </div>
                      ))}
                    </div>

                    <div className="news-input-area">
                      <input 
                        type="text" 
                        maxLength={currentPuzzle.answer.length} 
                        className="news-input" 
                        placeholder="Type answer..."
                        value={newspaperGuess}
                        onChange={(e) => setNewspaperGuess(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                      />
                      <button className="news-btn" onClick={() => {
                        if(newspaperGuess === currentPuzzle.answer) {
                          if (crypticIndex < crypticPuzzles.length - 1) {
                            alert("📰 Correct! Moving to the next clue.");
                            setCrypticIndex(crypticIndex + 1);
                            setNewspaperGuess("");
                          } else {
                            alert("🏆 Amazing! You have solved all 10 IT Cryptics!");
                            setCrypticIndex(0); 
                            setNewspaperGuess("");
                          }
                        } else {
                          alert("❌ Not quite! Double check your spelling.");
                        }
                      }}>Check Answer</button>
                    </div>
                  </div>
                </div>
              )}

              {/* PUZZLE 3: SLIDING TILE PUZZLE */}
              {activePuzzle === 'sliding' && (
                <div className="sliding-puzzle-card">
                  <div className="sliding-header">
                    <h2>FIREWALL INTEGRITY: COMPROMISED</h2>
                    <p>Slide the sectors (1-8) in order to restore the firewall.</p>
                  </div>
                  
                  <div className="sliding-grid">
                    {slidingTiles.map((tileNum, index) => (
                      <div 
                        key={index} 
                        className={`slide-tile ${tileNum === 9 ? 'empty-tile' : ''}`}
                        onClick={() => handleTileClick(index)}
                      >
                        {tileNum !== 9 && (
                          <>
                            <span className="tile-num">{tileNum}</span>
                            <span className="tile-char">{getTileChar(tileNum)}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <button className="post-btn" style={{marginTop: '20px', background: '#444'}} onClick={() => setSlidingTiles([8, 2, 3, 1, 6, 4, 7, 5, 9])}>
                    Reset Blocks
                  </button>
                </div>
              )}

              <button className="back-btn" style={{marginTop: '40px'}} onClick={() => setActivePuzzle(null)}>← Back to Puzzles</button>
            </div>
          )}
        </section>
      )}

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