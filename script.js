// 1. Our "Database" of articles
const articles = [
    { id: 1, title: "How to connect to Office WiFi", category: "Network", content: "Select 'Company_Guest', enter the password provided at the front desk..." },
    { id: 2, title: "Reset your Email Password", category: "Accounts", content: "Go to the portal at identity.company.com and click 'Forgot Password'..." },
    { id: 3, title: "Setting up a New Printer", category: "Hardware", content: "Open Settings > Devices > Printers. Click 'Add a printer' and select the floor model..." },
    { id: 4, title: "VPN Connection Issues", category: "Remote Work", content: "Ensure you are using the GlobalProtect client and your internet is stable..." }
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