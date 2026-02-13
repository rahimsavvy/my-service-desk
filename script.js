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
    
    // If no articles found, show a friendly message
    if (results.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#666;">No articles found. Try a different keyword!</p>`;
        return;
    }

    // Map each article into HTML code
    container.innerHTML = results.map(article => `
        <div class="article-card">
            <span style="color: #0056b3; font-size: 12px; font-weight: bold; text-transform: uppercase;">${article.category}</span>
            <h3 style="margin: 10px 0;">${article.title}</h3>
            <p style="color: #666; line-height: 1.5;">${article.content}</p>
        </div>
    `).join('');
}

// 3. Logic for the Search Bar
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearSearch');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    
    // Show/Hide the 'X' button
    clearBtn.style.display = value.length > 0 ? 'block' : 'none';

    // Filter articles based on title or content
    const filtered = articles.filter(article => {
        return article.title.toLowerCase().includes(value) || 
               article.content.toLowerCase().includes(value);
    });

    displayArticles(filtered);
});

// 4. Logic for the 'X' button
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    displayArticles(articles); // Show everything again
    searchInput.focus();
});

// Initial display when the page first loads
displayArticles(articles);