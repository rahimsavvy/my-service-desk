// 1. Our "Database" of articles
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

    // REMOTE WORK CATEGORY
    { id: 10, title: "Zoom/Teams Audio Issues", category: "Remote Work", content: "Check your 'Input Device' in the app settings. Ensure the correct microphone is selected and that you aren't muted by system-level settings." },
    { id: 11, title: "Home Office Ergonomics Guide", category: "Remote Work", content: "Keep your monitor at eye level. Use an external keyboard and mouse to avoid wrist strain. Take a 5-minute break every hour." },
    { id: 12, title: "Accessing Shared Network Drives", category: "Remote Work", content: "You must be connected to the VPN. Open File Explorer and type '\\storage-server\department' into the address bar." }
];

// 2. Function to show articles on the screen
function displayArticles(results) {
    const container = document.getElementById('articleContainer');
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#666;">No articles found. Try a different keyword!</p>`;
        return;
    }

    container.innerHTML = results.map(article => `
        <div class="article-card" onclick="openArticle(${article.id})" style="cursor: pointer;">
            <span class="badge badge-${article.category.toLowerCase().replace(' ', '-')}">
                ${article.category}
            </span>
            <h3 style="margin: 10px 0;">${article.title}</h3>
            <p style="color: #666; font-size: 14px;">Click to read instructions...</p>
        </div>
    `).join('');
}

// 3. Logic for the Search Bar
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearSearch');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        clearBtn.style.display = value.length > 0 ? 'block' : 'none';

        const filtered = articles.filter(article => {
            return article.title.toLowerCase().includes(value) || 
                   article.content.toLowerCase().includes(value);
        });
        displayArticles(filtered);
    });
}

// 4. Logic for the 'X' inside the Search Bar
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        displayArticles(articles);
        searchInput.focus();
    });
}

// 5. Modal Logic (Open/Close)
function openArticle(id) {
    const article = articles.find(a => a.id === id);
    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modalBody');

    if (article && modal && body) {
        body.innerHTML = `
            <span class="badge badge-${article.category.toLowerCase().replace(' ', '-')}">${article.category}</span>
            <h2>${article.title}</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="line-height: 1.8; color: #444;">${article.content}</p>
        `;
        modal.style.display = "block";
    }
}

function closeArticle() {
    const modal = document.getElementById('articleModal');
    if (modal) {
        modal.style.display = "none";
    }
}

// Master Listener for clicks (The Fix)
document.addEventListener('click', function(event) {
    // If clicked the 'X' in the modal
    if (event.target.classList.contains('close-modal')) {
        closeArticle();
    }
    
    // If clicked the dark background
    const modal = document.getElementById('articleModal');
    if (event.target === modal) {
        closeArticle();
    }
});

// Initial load
displayArticles(articles);
function quickSearch(term) {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    
    searchInput.value = term;
    clearBtn.style.display = 'block';
    
    const filtered = articles.filter(article => {
        return article.title.toLowerCase().includes(term.toLowerCase()) || 
               article.content.toLowerCase().includes(term.toLowerCase()) ||
               article.category.toLowerCase().includes(term.toLowerCase());
    });
    
    displayArticles(filtered);

    // This makes the page slide down to the results automatically!
    document.getElementById('articleContainer').scrollIntoView({ behavior: 'smooth' });
}