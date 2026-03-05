import React, { useState, useEffect, useRef } from 'react';
import {
  Home, Link as LinkIcon, Coffee, Newspaper, Ticket, Truck, TrendingUp,
  IdCard, AlertTriangle, Puzzle, Book, Users, Settings, Globe, User,
  Lock, Wrench, Laptop, Printer, MessageSquare, Folder, Smartphone,
  Monitor, ClipboardList, BookOpen, Lightbulb, Cloud, Bug, Key,
  BarChart, Calendar, MapPin, Flame, Search, AlertOctagon, AlertCircle,
  FileText, Briefcase, Terminal, Square, Brain, Cpu, ThumbsUp, Trash2, Activity, Gauge,
  Bot, Sparkles, Send, X
} from 'lucide-react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  /* TICKET MODAL STATE */
  const [showTicketModal, setShowTicketModal] = useState(false);

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

  /* 5. PORT MAPPER STATE */
  const [portGuesses, setPortGuesses] = useState({ ftp: "", ssh: "", dns: "", http: "" });

  /* 6. PACKET SNIFFER STATE */
  const [packetGuess, setPacketGuess] = useState("");

  /* ========================================= */
  /* DESKGURU AI ASSISTANT STATE & LOGIC       */
  /* ========================================= */
  const [isDgOpen, setIsDgOpen] = useState(false);
  const [dgInput, setDgInput] = useState("");
  const [dgMessages, setDgMessages] = useState([
    { sender: 'bot', text: "Hi! I'm DeskGuru, your IT AI Assistant. Ask me anything about our knowledge base, like 'How do I map a printer?' or 'WiFi password'." }
  ]);
  const dgChatEndRef = React.useRef(null);

  const scrollToBottom = () => {
    dgChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [dgMessages]);

  const handleDgSubmit = (e) => {
    if (e && e.key !== 'Enter' && e.type !== 'click') return;
    if (!dgInput.trim()) return;

    const query = dgInput.trim();
    const newChat = [...dgMessages, { sender: 'user', text: query }];
    setDgMessages(newChat);
    setDgInput("");

    // Artificial 'thinking' delay
    setTimeout(() => {
      let bestMatch = null;
      let highestScore = 0;
      const lowerQuery = query.toLowerCase();
      const keywords = lowerQuery.split(' ').filter(w => w.length > 2);

      // --- OMNI-SEARCH DATABASE ---
      // Gathers data from Articles, Team, Projects, PowerShell, and Site Status
      const searchableContent = [
        ...articles.map(a => ({ type: 'Article', title: a.title, content: a.content, category: a.category })),
        ...teamMembers.map(t => ({ type: 'Team', title: t.name, content: `Role: ${t.role}`, category: 'Directory' })),
        ...projects.map(p => ({ type: 'Project', title: p.title, content: `Status: ${p.status}, Progress: ${p.progress}%.`, category: 'Roadmap' })),
        ...(typeof psDatabase !== 'undefined' ? psDatabase.map(ps => ({ type: 'PowerShell', title: ps.title, content: ps.script, category: 'Terminal' })) : []),
        { type: 'Site Info', title: 'System Status', content: `The current system status is: ${systemStatus}.`, category: 'Status' },
        { type: 'Site Info', title: 'Submit a Ticket', content: 'You can submit an IT support ticket using the "Submit a Ticket" button at the top of the page.', category: 'Help' },
        { type: 'Site Info', title: 'Puzzles', content: 'We have IT puzzles like Port Mapper, Packet Sniffer, and Cache Flush in the Puzzle Zone.', category: 'Games' }
      ];

      searchableContent.forEach(item => {
        let score = 0;
        const targetText = (item.title + " " + item.category + " " + item.content).toLowerCase();

        keywords.forEach(kw => {
          if (targetText.includes(kw)) score++;
          if (item.title.toLowerCase().includes(kw)) score += 3; // Weight titles heavily
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      });

      let botReply = "";
      if (bestMatch && highestScore > 0) {
        if (bestMatch.type === 'Article') {
          botReply = `I found a Knowledge Base guide: **"${bestMatch.title}"**.\n\n${bestMatch.content}`;
        } else if (bestMatch.type === 'Team') {
          botReply = `Found in Team Directory: **${bestMatch.title}** is a ${bestMatch.content}.`;
        } else if (bestMatch.type === 'PowerShell') {
          botReply = `Here is the PowerShell script for **${bestMatch.title}**:\n\n${bestMatch.content}`;
        } else if (bestMatch.type === 'Project') {
          botReply = `Project Update for **${bestMatch.title}**:\n${bestMatch.content}`;
        } else {
          botReply = `Here is what I found about **${bestMatch.title}**:\n\n${bestMatch.content}`;
        }
      } else {
        botReply = "I couldn't find an exact match for that anywhere on the Service Desk. Could you try different keywords, or use the 'Submit a Ticket' button?";
      }

      setDgMessages([...newChat, { sender: 'bot', text: botReply }]);
    }, 800);
  };

  /* SYSTEM STATUS STATE */
  const [systemStatus, setSystemStatus] = useState("operational");

  /* NETWORK DIAGNOSTIC STATE */
  const [isScanning, setIsScanning] = useState(false);
  const [scanLogs, setScanLogs] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);

  const runDiagnostics = async () => {
    setIsScanning(true);
    setScanLogs(["Initializing network adapter..."]);
    setScanProgress(10);
    await new Promise(r => setTimeout(r, 800));

    setScanLogs(prev => [...prev, "Pinging default gateway (192.168.1.1)... OK (2ms)"]);
    setScanProgress(35);
    await new Promise(r => setTimeout(r, 1000));

    setScanLogs(prev => [...prev, "Resolving DNS (8.8.8.8)... OK (14ms)"]);
    setScanProgress(60);
    await new Promise(r => setTimeout(r, 1200));

    setScanLogs(prev => [...prev, "Testing outbound traffic on Port 443... OK"]);
    setScanProgress(85);
    await new Promise(r => setTimeout(r, 900));

    setScanLogs(prev => [...prev, "Analyzing packet loss... 0% loss detected."]);
    setScanProgress(100);
    await new Promise(r => setTimeout(r, 500));

    setScanLogs(prev => [...prev, "✅ DIAGNOSTIC COMPLETE: Network connection is optimal."]);
    setIsScanning(false);
  };

  /* POWERSHELL COMMANDS DB & STATE */
  const psDatabase = [
    { keywords: ["flush", "dns", "cache"], title: "Flush DNS Cache", script: "Clear-DnsClientCache; ipconfig /flushdns" },
    { keywords: ["ip", "address", "network"], title: "Get IP Configuration", script: "Get-NetIPConfiguration | Format-Table" },
    { keywords: ["print", "spooler", "jam"], title: "Restart Print Spooler", script: "Restart-Service -Name Spooler -Force" },
    { keywords: ["unlock", "ad", "account"], title: "Unlock AD Account", script: "Unlock-ADAccount -Identity 'username'" },
    { keywords: ["password", "reset", "ad"], title: "Reset AD Password", script: "Set-ADAccountPassword -Identity 'username' -Reset:$true" },
    { keywords: ["gpupdate", "policy", "group"], title: "Force GP Update", script: "gpupdate /force" },
    { keywords: ["gpresult", "policy"], title: "Check Applied Group Policies", script: "gpresult /r /scope computer" },
    { keywords: ["uptime", "boot"], title: "Check System Uptime", script: "(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime" },
    { keywords: ["serial", "bios", "tag"], title: "Get PC Serial Number", script: "Get-WmiObject win32_bios | select Serialnumber" },
    { keywords: ["restart", "reboot"], title: "Remote Restart Computer", script: "Restart-Computer -ComputerName 'PC-NAME' -Force" },
    { keywords: ["clear", "cls"], title: "Clear Screen", script: "CLEAR_SCREEN" },
    { keywords: ["port", "ping", "test", "telnet"], title: "Test Network Port Connection", script: "Test-NetConnection -ComputerName 'SERVER-NAME' -Port 443" },
    { keywords: ["locked", "ad", "users", "search"], title: "Find All Locked AD Accounts", script: "Search-ADAccount -LockedOut | Select-Object Name, SamAccountName" },
    { keywords: ["bitlocker", "encryption", "status"], title: "Check BitLocker Status (C: Drive)", script: "Get-BitLockerVolume -MountPoint 'C:' | Select-Object VolumeStatus, ProtectionStatus" },
    { keywords: ["services", "stopped", "automatic"], title: "Find Stopped 'Automatic' Services", script: "Get-Service | Where-Object {$_.StartType -eq 'Automatic' -and $_.Status -eq 'Stopped'}" },
    { keywords: ["reboot", "event", "logs", "reason"], title: "Get Last 5 Reboot Reasons", script: "Get-WinEvent -FilterHashtable @{LogName='System'; Id=1074} -MaxEvents 5 | Select-Object TimeCreated, Message" },
    { keywords: ["software", "installed", "export"], title: "Export Installed Software to CSV", script: "Get-ItemProperty HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, DisplayVersion | Export-Csv -Path C:\\Temp\\InstalledApps.csv" },
    { keywords: ["wifi", "password", "key"], title: "Reveal Saved Wi-Fi Password", script: "(netsh wlan show profile name='WIFI_NAME' key=clear | Select-String 'Key Content').Line.Split(':')[1].Trim()" },
    { keywords: ["kill", "force", "task", "process"], title: "Force Kill Unresponsive Process", script: "Stop-Process -Name 'WINWORD' -Force" },
    { keywords: ["update", "stuck", "wuauclt"], title: "Clear Stuck Windows Updates", script: "Stop-Service wuauserv; Remove-Item -Path 'C:\\Windows\\SoftwareDistribution\\Download\\*' -Recurse -Force; Start-Service wuauserv" },
    { keywords: ["space", "disk", "storage", "large"], title: "Find Top 10 Largest Files on C:", script: "Get-ChildItem C:\\ -Recurse -ErrorAction SilentlyContinue | Sort-Object Length -Descending | Select-Object Name, Length -First 10" },
    { keywords: ["help"], title: "Help Menu", script: "Try typing: dns, ip, spooler, unlock, reset, gpupdate, uptime, serial, restart, clear, port, locked, bitlocker, services, reboot, software, wifi, kill, update, disk" }
  ];

  const [psInput, setPsInput] = useState("");
  const [psHistory, setPsHistory] = useState([
    { type: 'system', text: "Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nLoading IT Script Database... Done.\nType 'help' for keywords, or 'list' to see all commands." }
  ]);

  const handlePsSubmit = (e) => {
    if (e.key === 'Enter') {
      const query = psInput.toLowerCase().trim();
      if (!query) return;

      const newHistory = [...psHistory, { type: 'input', text: `PS C:\\Users\\Admin> ${psInput}` }];

      if (query === 'clear' || query === 'cls') {
        setPsHistory([{ type: 'system', text: "Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nType 'help' for keywords, or 'list' to see all commands." }]);
        setPsInput("");
        return;
      }

      let results = [];

      // NEW LOGIC: If they type 'list', show everything (except the clear command)
      if (query.includes('list') || query === 'all') {
        results = psDatabase.filter(item => item.script !== 'CLEAR_SCREEN');
      } else {
        // Otherwise, do the normal keyword search
        results = psDatabase.filter(item => item.keywords.some(kw => query.includes(kw)));
      }

      if (results.length > 0) {
        results.forEach(res => {
          if (res.script === 'CLEAR_SCREEN') return;
          newHistory.push({ type: 'output', title: res.title, text: res.script });
        });
      } else {
        newHistory.push({ type: 'error', text: `Term '${psInput}' is not recognized. Type 'help' for valid keywords, or 'list' for all commands.` });
      }

      setPsHistory(newHistory);
      setPsInput("");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Command copied to clipboard!");
  };

  /* SCRAPBOOK STATE */
  const [scraps, setScraps] = useState([
    { id: 1, author: "Guest User", text: "Welcome to the new IT Scrapbook! Let's keep the team spirit high. 🚀", time: "2 hours ago", upvotes: 5 },
    { id: 2, author: "Guest User", text: "Great job on the VPN migration yesterday, everyone!", time: "4 hours ago", upvotes: 2 }
  ]);
  const [newScrap, setNewScrap] = useState("");

  const handleUpvoteScrap = (id) => {
    setScraps(scraps.map(scrap => scrap.id === id ? { ...scrap, upvotes: (scrap.upvotes || 0) + 1 } : scrap));
  };

  const handleDeleteScrap = (id) => {
    if (window.confirm("Are you sure you want to delete this scrap?")) {
      setScraps(scraps.filter(scrap => scrap.id !== id));
    }
  };

  /* TICKETING ACTION */
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    alert("Ticket submitted successfully! IT has been notified.");
    setShowTicketModal(false);
  };

  /* ROADMAP PROJECTS DATA */
  const [projects] = useState([
    { id: "IT-402", title: "Windows 11 Fleet Migration", status: "In Progress", progress: 65, priority: "High" },
    { id: "IT-405", title: "Okta SSO Integration for Zendesk", status: "In Review", progress: 90, priority: "Medium" },
    { id: "IT-410", title: "Core Network Switch Upgrade", status: "Planned", progress: 0, priority: "High" },
    { id: "IT-399", title: "Legacy On-Prem Server Decommission", status: "Completed", progress: 100, priority: "Low" }
  ]);

  /* ========================================= */
  /* DYNAMIC ARTICLES                          */
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

  /* DATABASE EXPORT/IMPORT LOGIC */
  const handleExportDB = () => {
    const dataStr = JSON.stringify(articles, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IT_KB_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportDB = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedArticles = JSON.parse(e.target.result);
        if (Array.isArray(importedArticles)) {
          setArticles(importedArticles);
          alert("✅ Database Imported Successfully!");
        } else {
          alert("❌ Error: Invalid backup file format.");
        }
      } catch (error) {
        alert("❌ Error reading backup file.");
      }
    };
    reader.readAsText(file);
    event.target.value = null;
  };

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
    const post = { id: Date.now(), author: "Guest User", text: newScrap, time: "Just now", upvotes: 0 };
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
        <div className="left-controls">
          <div className="diagnostic-indicator" onClick={() => navigateTo('diagnostic')}>
            <Activity size={14} className="diagnostic-icon" />
            <span className="status-text hide-on-mobile">Run Diagnostics</span>
          </div>
          <div className="powershell-indicator" onClick={() => navigateTo('powershell')}>
            <Terminal size={14} className="powershell-icon" />
            <span className="status-text hide-on-mobile">PowerShell Zone</span>
          </div>
        </div>
        <div className="right-controls">
          <div className="speed-test-indicator" onClick={() => window.open('https://speed.cloudflare.com/', '_blank')}>
            <Gauge size={14} className="speed-icon" />
            <span className="status-text hide-on-mobile">Speed Test</span>
          </div>
          <div className="status-indicator" onClick={() => navigateTo('outages')}>
            <span className={`status-dot ${systemStatus}`}></span>
            <span className="status-text hide-on-mobile">{systemStatus === 'operational' ? 'System Operational' : 'Active Outage'}</span>
          </div>
        </div>

        <h1 onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>IT Knowledge Base</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value;
              if (val.toLowerCase() === "/admin") {
                setSearchTerm("");
                navigateTo('admin');
              } else {
                setSearchTerm(val);
              }
            }}
            className="main-search"
          />

          <div className="quick-links">
            <span className="hide-on-mobile">Common Tasks:</span>
            <button onClick={() => setShowTicketModal(true)}>🎫 Submit a Ticket</button>
            <button onClick={() => { setSearchTerm("WiFi"); navigateTo('home'); }}><Globe size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />Connect WiFi</button>
            <button onClick={() => { setSearchTerm("Password"); navigateTo('home'); }}><User size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />Reset Password</button>
            <button onClick={() => { setSearchTerm("VPN"); navigateTo('home'); }}><Lock size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />VPN Help</button>
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
                {filteredArticles.length === 0 ? <p style={{ color: '#666' }}>No articles found. Try another search.</p> : null}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #e5e5ea', paddingBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 800, background: 'linear-gradient(135deg, #1d1d1f, #555555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <Settings size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} /> KB Control Panel
            </h2>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="file" id="import-db" style={{ display: 'none' }} accept=".json" onChange={handleImportDB} />
              <button className="clear-link" onClick={() => document.getElementById('import-db').click()} style={{ color: '#0056b3', borderColor: '#cce5ff', background: '#e6f2ff' }}>
                📤 Import
              </button>
              <button className="clear-link" onClick={handleExportDB} style={{ color: '#2e7d32', borderColor: '#c8e6c9', background: '#e8f5e9' }}>
                📥 Export
              </button>
              <button className="clear-link" onClick={handleRestoreDefaults} style={{ color: '#d32f2f', borderColor: '#ffcdd2', background: '#ffebee' }}>
                ⚠️ Restore Defaults
              </button>
            </div>
          </div>
          <div className="admin-grid">
            <div className="admin-form-card">
              <h3>{editingId ? "Edit Article" : "Create New Article"}</h3>
              <label>Article Title</label>
              <input type="text" value={adminForm.title} onChange={e => setAdminForm({ ...adminForm, title: e.target.value })} placeholder="e.g. How to install Photoshop" />
              <label>Category</label>
              <select value={adminForm.category} onChange={e => setAdminForm({ ...adminForm, category: e.target.value })}>
                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <label>Content / Instructions</label>
              <textarea value={adminForm.content} onChange={e => setAdminForm({ ...adminForm, content: e.target.value })} placeholder="Write the step-by-step instructions here..." rows="6" />
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
          <h2 className="section-title"><Coffee size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />Refreshment Corner</h2>
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
                <p className="terminal-text" style={{ color: '#00ff00', fontFamily: 'monospace' }}>&gt;&gt; QUESTION: Which port is typically used for secure web traffic (HTTPS)?</p>
                <div className="puzzle-input-area" style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#00ff00' }}>$</span>
                  <input type="text" placeholder="Enter port number..." id="quizInput" autoComplete="off" style={{ background: 'transparent', border: 'none', borderBottom: '2px solid #00ff00', color: '#fff', outline: 'none', padding: '5px' }} />
                  <button className="post-btn" onClick={() => {
                    const val = document.getElementById('quizInput').value.trim();
                    if (val === "443") { alert("✅ Correct! You've mastered secure protocols."); setShowQuiz(false); }
                    else { alert("❌ Incorrect. Hint: It's the standard for SSL."); }
                  }}>Submit</button>
                </div>
                <button className="clear-link" style={{ marginTop: '20px' }} onClick={() => setShowQuiz(false)}>Cancel Quiz</button>
              </div>
            </div>
          )}
          {!showQuiz && <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>}
        </section>
      )}

      {/* LINKS PAGE */}
      {currentPage === 'links' && (
        <section className="container">
          <h2 className="section-title"><LinkIcon size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />Quick Access Links</h2>
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
          <h2 className="section-title"><Truck size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />Dispatch Command</h2>
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
          <h2 className="section-title"><Ticket size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />Wanted Tickets</h2>
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
        <section className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title"><TrendingUp size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />IT Project Roadmap</h2>
          <div className="roadmap-list">
            {projects.map(proj => (
              <div key={proj.id} className="project-card">
                <div className="project-header">
                  <div>
                    <span className="project-id">{proj.id}</span>
                    <h3 style={{ margin: '5px 0 0 0', color: '#333' }}>{proj.title}</h3>
                  </div>
                  <span className={`status-badge status-${proj.status.replace(/\s+/g, '')}`}>{proj.status}</span>
                </div>
                <div className="progress-container" style={{ marginTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    <span>Progress</span>
                    <span>{proj.progress}%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill" style={{ width: `${proj.progress}%` }}></div>
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
          <h2 className="section-title"><IdCard size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />Employee Self Service</h2>
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
          <h2 className="section-title"><AlertTriangle size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />System Status & Outages</h2>
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
          <h2 className="section-title">
            <Users size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />
            Meet Our Team
          </h2>
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
          <h2 className="section-title"><Book size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />Team Scrapbook</h2>
          <div className="scrap-input-card">
            <textarea placeholder="Post a scrap to the team..." value={newScrap} onChange={(e) => setNewScrap(e.target.value)} />
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
                <div className="scrap-actions">
                  <button className="btn-upvote" onClick={() => handleUpvoteScrap(scrap.id)}>
                    <ThumbsUp size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    {scrap.upvotes || 0}
                  </button>
                  <button className="btn-delete-scrap" onClick={() => handleDeleteScrap(scrap.id)}>
                    <Trash2 size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
        </section>
      )}

      {/* WHATS NEW PAGE */}
      {currentPage === 'whatsnew' && (
        <section className="container">
          <h2 className="section-title"><Newspaper size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />What's New</h2>
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
          <h2 className="section-title"><Puzzle size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />IT Puzzle Zone</h2>
          {!activePuzzle ? (
            <>
              <div className="category-grid" style={{ marginTop: '20px' }}>
                <div className="category-card" onClick={() => setActivePuzzle('terminal')}><div className="category-icon"><Terminal size={32} /></div><h3>Terminal Recovery</h3><p>Decrypt the hex string.</p></div>
                <div className="category-card" onClick={() => setActivePuzzle('cryptic')}><div className="category-icon"><Newspaper size={32} /></div><h3>Daily Cryptic</h3><p>Solve the IT crossword.</p></div>
                <div className="category-card" onClick={() => setActivePuzzle('sliding')}><div className="category-icon"><Square size={32} /></div><h3>Server Rack</h3><p>Restore the Firewall.</p></div>
                <div className="category-card" onClick={() => { setActivePuzzle('memory'); initMemoryGame(); }}><div className="category-icon"><Brain size={32} /></div><h3>Cache Flush</h3><p>Clear memory blocks.</p></div>
                <div className="category-card" onClick={() => setActivePuzzle('bios')}><div className="category-icon"><Cpu size={32} /></div><h3>BIOS Sequence</h3><p>Memorize the boot pattern.</p></div>
                <div className="category-card" onClick={() => setActivePuzzle('ports')}>
                  <div className="category-icon"><Globe size={32} /></div>
                  <h3>Port Mapper</h3>
                  <p>Assign default ports.</p>
                </div>
                <div className="category-card" onClick={() => setActivePuzzle('packet')}>
                  <div className="category-icon"><Lock size={32} /></div>
                  <h3>Packet Sniffer</h3>
                  <p>Decode the payload.</p>
                </div>
              </div>
              <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
            </>
          ) : (
            <div>
              {/* TERMINAL */}
              {activePuzzle === 'terminal' && (
                <div className="puzzle-card"><div className="terminal-body"><p className="terminal-text">&gt;&gt; HEX_STRING: 73 68 75 74 20 64 6f 77 6e</p><input id="puzzleInput" type="text" placeholder="Decrypt..." style={{ background: 'transparent', color: 'white', border: 'none', borderBottom: '1px solid lime' }} /><button className="post-btn" onClick={() => { if (document.getElementById('puzzleInput').value.trim().toLowerCase() === 'shut down') alert('Access Granted') }}>Execute</button></div></div>
              )}
              {/* CRYPTIC */}
              {activePuzzle === 'cryptic' && (
                <div className="newspaper-card"><div className="news-header"><h2>Daily Cryptic</h2></div><p>{currentPuzzle.clue} ({currentPuzzle.answer.length} letters)</p><div className="news-input-area"><input className="news-input" value={newspaperGuess} onChange={e => setNewspaperGuess(e.target.value.toUpperCase())} /><button className="news-btn" onClick={() => { if (newspaperGuess === currentPuzzle.answer) alert("Correct!") }}>Check</button></div></div>
              )}
              {/* SLIDING */}
              {activePuzzle === 'sliding' && (
                <div className="sliding-puzzle-card"><div className="sliding-grid">{slidingTiles.map((t, i) => <div key={i} className={`slide-tile ${t === 9 ? 'empty-tile' : ''}`} onClick={() => handleTileClick(i)}>{t !== 9 && getTileChar(t)}</div>)}</div></div>
              )}
              {/* MEMORY */}
              {activePuzzle === 'memory' && (
                <div className="memory-wrapper" style={{ textAlign: 'center', marginTop: '20px' }}><div className="memory-grid">{memoryCards.map((card, index) => (<div key={index} className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`} onClick={() => handleMemoryClick(index)}><div className="memory-front">❓</div><div className="memory-back">{card.icon}</div></div>))}</div><button className="post-btn" style={{ marginTop: '20px' }} onClick={initMemoryGame}>Reset Cache</button></div>
              )}
              {/* BIOS */}
              {activePuzzle === 'bios' && (
                <div className="bios-wrapper" style={{ textAlign: 'center', marginTop: '30px', background: '#222', padding: '40px', borderRadius: '12px', border: '2px solid #444' }}><h2 style={{ color: '#0f0', fontFamily: 'monospace', marginBottom: '30px' }}>{biosMessage}</h2><div className="bios-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '300px', margin: '0 auto' }}>{colors.map(color => (<div key={color} className={`bios-btn ${color} ${flashColor === color ? 'flash' : ''}`} onClick={() => handleBiosClick(color)} style={{ height: '100px', borderRadius: '8px', cursor: 'pointer', opacity: flashColor === color ? 1 : 0.4, border: '2px solid white' }}></div>))}</div>{!sequence.length && <button className="post-btn" style={{ marginTop: '30px' }} onClick={startBiosGame}>Start Boot</button>}</div>
              )}

              {/* PORT MAPPER */}
              {activePuzzle === 'ports' && (
                <div className="newspaper-card">
                  <div className="news-header"><h2>Port Configuration</h2></div>
                  <p style={{ marginBottom: '25px', color: '#666' }}>Assign the correct default ports to restore connectivity.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '250px', margin: '0 auto', textAlign: 'left', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>FTP:</span><input type="number" style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '2px solid #e5e5ea', textAlign: 'center' }} value={portGuesses.ftp} onChange={e => setPortGuesses({ ...portGuesses, ftp: e.target.value })} /></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>SSH:</span><input type="number" style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '2px solid #e5e5ea', textAlign: 'center' }} value={portGuesses.ssh} onChange={e => setPortGuesses({ ...portGuesses, ssh: e.target.value })} /></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>DNS:</span><input type="number" style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '2px solid #e5e5ea', textAlign: 'center' }} value={portGuesses.dns} onChange={e => setPortGuesses({ ...portGuesses, dns: e.target.value })} /></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>HTTP:</span><input type="number" style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '2px solid #e5e5ea', textAlign: 'center' }} value={portGuesses.http} onChange={e => setPortGuesses({ ...portGuesses, http: e.target.value })} /></div>
                  </div>
                  <button className="post-btn" style={{ marginTop: '30px' }} onClick={() => {
                    if (portGuesses.ftp === '21' && portGuesses.ssh === '22' && portGuesses.dns === '53' && portGuesses.http === '80') alert('✅ Ports aligned! Network restored.');
                    else alert('❌ Connection refused. Check your standard ports.');
                  }}>Test Connection</button>
                </div>
              )}

              {/* PACKET SNIFFER */}
              {activePuzzle === 'packet' && (
                <div className="puzzle-card">
                  <div className="terminal-header">
                    <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                    <span className="terminal-title">wireshark_capture.pcap</span>
                  </div>
                  <div className="terminal-body">
                    <p className="terminal-text" style={{ color: '#ffcc00' }}>&gt;&gt; WARNING: ENCRYPTED PAYLOAD INTERCEPTED</p>
                    <p className="terminal-text" style={{ marginTop: '15px' }}>&gt;&gt; ENCODING: Base64</p>
                    <p className="terminal-text" style={{ marginBottom: '30px' }}>&gt;&gt; STRING: U2VjdXJlUEBzc3cwcmQ=</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#00ff00' }}>$</span>
                      <input type="text" placeholder="Enter decoded string..." value={packetGuess} onChange={e => setPacketGuess(e.target.value)} style={{ background: 'transparent', color: 'white', border: 'none', borderBottom: '2px solid lime', outline: 'none', padding: '5px', width: '100%', fontSize: '16px' }} />
                    </div>
                    <button className="post-btn" style={{ marginTop: '30px' }} onClick={() => {
                      if (packetGuess === 'SecureP@ssw0rd') alert('✅ Payload decoded successfully! Threat neutralized.');
                      else alert('❌ Decryption failed. Try converting the Base64 string again.');
                    }}>Decrypt Payload</button>
                  </div>
                </div>
              )}

              <button className="back-btn" style={{ marginTop: '40px' }} onClick={() => setActivePuzzle(null)}>← Back to Puzzles</button>
            </div>
          )}
        </section>
      )}

      {/* DIAGNOSTIC PAGE */}
      {currentPage === 'diagnostic' && (
        <section className="container puzzle-section">
          <h2 className="section-title">
            <Activity size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />
            Network Diagnostics
          </h2>
          <div className="puzzle-card">
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-title">sys_diag.exe</span>
            </div>
            <div className="terminal-body" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', textAlign: 'left' }}>
                <p className="terminal-text" style={{ color: '#86868b' }}>&gt;&gt; Ready to analyze local network conditions...</p>
                {scanLogs.map((log, index) => (
                  <p key={index} className="terminal-text" style={{ color: log.includes('✅') ? '#34c759' : '#00ff00', marginTop: '10px' }}>
                    &gt;&gt; {log}
                  </p>
                ))}
                {isScanning && <p className="terminal-text" style={{ color: '#00ff00', marginTop: '10px', animation: 'pulse 1s infinite' }}>_</p>}
              </div>

              <div className="progress-bg" style={{ marginBottom: '25px', background: '#333' }}>
                <div className="progress-fill" style={{ width: `${scanProgress}%`, background: scanProgress === 100 ? '#34c759' : 'linear-gradient(90deg, #007AFF, #00C6FF)' }}></div>
              </div>

              <button className="post-btn" onClick={runDiagnostics} disabled={isScanning} style={{ opacity: isScanning ? 0.5 : 1 }}>
                {isScanning ? 'Scanning...' : scanProgress === 100 ? 'Run Diagnostics Again' : 'Start Diagnostic Scan'}
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
          </div>
        </section>
      )}

      {/* POWERSHELL ZONE PAGE */}
      {currentPage === 'powershell' && (
        <section className="container powershell-section" style={{ maxWidth: '1000px' }}>
          <h2 className="section-title">
            <Terminal size={28} style={{ verticalAlign: 'bottom', marginRight: '10px' }} />
            PowerShell Command Library
          </h2>
          <div className="ps-window">
            <div className="ps-header">
              <span className="ps-title">Administrator: Windows PowerShell</span>
            </div>
            <div className="ps-body">
              {psHistory.map((line, index) => (
                <div key={index} className={`ps-line ${line.type}`}>
                  {line.type === 'output' ? (
                    <div className="ps-script-block">
                      <span className="ps-comment"># {line.title}</span>
                      <div className="ps-code-row">
                        <span className="ps-code">{line.text}</span>
                        <button className="ps-copy-btn" onClick={() => copyToClipboard(line.text)}>Copy</button>
                      </div>
                    </div>
                  ) : (
                    <span style={{ whiteSpace: 'pre-wrap' }}>{line.text}</span>
                  )}
                </div>
              ))}
              <div className="ps-input-row">
                <span className="ps-prompt">PS C:\Users\Admin&gt;</span>
                <input
                  type="text"
                  className="ps-input-field"
                  value={psInput}
                  onChange={(e) => setPsInput(e.target.value)}
                  onKeyDown={handlePsSubmit}
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button className="back-btn" onClick={() => navigateTo('home')}>← Back to Knowledge Base</button>
          </div>
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

      {/* THE ONLY TICKET SUBMISSION MODAL */}
      {showTicketModal && (
        <div className="modal-overlay" onClick={() => setShowTicketModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowTicketModal(false)}>&times;</button>
            <h2>Submit Support Ticket</h2>
            <div className="modal-divider"></div>

            <form onSubmit={handleTicketSubmit} className="ticket-form">
              <div>
                <label>Issue Title</label>
                <input type="text" placeholder="E.g., Monitor won't turn on" required />
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Category</label>
                  <select required>
                    <option value="">Select an option</option>
                    <option value="network">Network/Wi-Fi</option>
                    <option value="account">Account Access</option>
                    <option value="hardware">Hardware Issue</option>
                    <option value="software">Software Request</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label>Priority</label>
                  <select required>
                    <option value="low">Low - Routine Request</option>
                    <option value="medium">Medium - Hindering Work</option>
                    <option value="high">High - Work Stoppage</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Description</label>
                <textarea rows="4" placeholder="Please describe the issue in detail..." required></textarea>
              </div>

              <button type="submit" className="post-btn" style={{ width: '100%', marginTop: '10px' }}>
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DESKGURU FLOATING WIDGET */}
      <div className="deskguru-container">
        {isDgOpen && (
          <div className="deskguru-window">
            <div className="dg-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={20} color="#00C6FF" />
                <span style={{ fontWeight: 600, color: 'white' }}>DeskGuru AI</span>
              </div>
              <button className="dg-close-btn" onClick={() => setIsDgOpen(false)}><X size={18} /></button>
            </div>

            <div className="dg-body">
              {dgMessages.map((msg, idx) => (
                <div key={idx} className={`dg-message-row ${msg.sender}`}>
                  {msg.sender === 'bot' && <div className="dg-avatar"><Sparkles size={14} /></div>}
                  <div className={`dg-bubble ${msg.sender}`}>
                    {/* Simple markdown parsing for bolding */}
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} style={{ margin: '0 0 5px 0' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </div>
                </div>
              ))}
              <div ref={dgChatEndRef} />
            </div>

            <div className="dg-footer">
              <input
                type="text"
                placeholder="Ask DeskGuru..."
                value={dgInput}
                onChange={(e) => setDgInput(e.target.value)}
                onKeyDown={handleDgSubmit}
              />
              <button onClick={(e) => handleDgSubmit(e)}><Send size={18} /></button>
            </div>
          </div>
        )}

        <button className="deskguru-fab" onClick={() => setIsDgOpen(!isDgOpen)}>
          {isDgOpen ? <X size={24} /> : <Sparkles size={24} />}
        </button>
      </div>

    </div>
  );
}

export default App;