/* ============================================================
   Thuto Seroto — Instagram Portfolio
   script.js
   ============================================================ */

// ─── PROJECT DATA ───────────────────────────────────────────
const projects = [
  {
    title: "Currency Calculator",
    tech: "HTML5 · CSS3 · JavaScript · REST API",
    desc: "A real-time currency converter supporting USD, ZAR, and BWP using live exchange rates pulled from a public API. Clean, responsive interface with error handling for network failures.",
    skills: ["API Integration", "DOM Manipulation", "Event Handling", "Error Handling", "Responsive Layout"],
    demo: "https://thutoseroto.github.io/MyPortfolio/projects/currency-calculator/",
    github: "https://github.com/thutoseroto/MyPortfolio/tree/master/projects/currency-calculator"
  },
  {
    title: "Recipe Finder",
    tech: "HTML5 · CSS3 · JavaScript · Spoonacular API",
    desc: "Search recipes by ingredient with a thoughtful fallback to traditional South African dishes like Umqombothi and Chakalaka when API results are limited. Includes modal windows and rich data parsing.",
    skills: ["Search Algorithms", "Modal Windows", "Data Parsing", "Fallback Strategy", "Cultural Content"],
    demo: "https://thutoseroto.github.io/MyPortfolio/projects/recipe-finder/",
    github: "https://github.com/thutoseroto/MyPortfolio/tree/master/projects/recipe-finder"
  },
  {
    title: "Meme Generator",
    tech: "HTML5 · CSS3 · JavaScript · Canvas API",
    desc: "Upload any image, add custom top/bottom text, and export your meme. Built on the Canvas API with FileReader for image handling and dynamic text styling.",
    skills: ["Canvas API", "FileReader API", "Image Manipulation", "Dynamic Styling", "Export Functionality"],
    demo: "https://thutoseroto.github.io/MyPortfolio/projects/meme-generator/",
    github: "https://github.com/thutoseroto/MyPortfolio/tree/master/projects/meme-generator"
  },
  {
    title: "MaNyasa Store",
    tech: "HTML5 · CSS3 · JavaScript · localStorage",
    desc: "Full e-commerce platform for Malawian clothing, crafts, kitchenware, and traditional tools. Includes product filtering & sorting, cart management, and persistent storage.",
    skills: ["State Management", "localStorage", "Filtering & Sorting", "E-commerce Logic", "Product Modeling"],
    demo: "https://thutoseroto.github.io/MyPortfolio/projects/manyasa-store/",
    github: "https://github.com/thutoseroto/MyPortfolio/tree/master/projects/manyasa-store"
  },
  {
    title: "BuaFela Chat App",
    tech: "HTML5 · CSS3 · JavaScript · PWA · Service Workers",
    desc: "Real-time chat application supporting all 9 South African official languages plus more. Features PWA support, offline functionality via Service Workers, contact management, and daily message limits.",
    skills: ["PWA Development", "Service Workers", "Offline Support", "Multilingual UI", "Contact Management"],
    demo: "https://thutoseroto.github.io/MyPortfolio/projects/buafela/",
    github: "https://github.com/thutoseroto/MyPortfolio/tree/master/projects/buafela"
  },
  {
    title: "Portfolio Website",
    tech: "HTML5 · CSS3 · JavaScript · Formspree",
    desc: "Personal portfolio built from scratch showcasing all projects, skills, and certifications. Includes animation, responsive design, SEO fundamentals, and Formspree for contact form submissions.",
    skills: ["Responsive Design", "Formspree Integration", "CSS Animations", "SEO Fundamentals", "Project Showcasing"],
    demo: "https://thutoseroto.github.io/MyPortfolio/",
    github: "https://github.com/thutoseroto/MyPortfolio"
  }
];

// ─── STORY / SKILL DATA ─────────────────────────────────────
const stories = {
  python: {
    emoji: "🐍",
    title: "Python",
    body: "Intermediate proficiency — data manipulation, scripting, and exploring data engineering pipelines. Currently deepening Python skills at WeThinkCode_."
  },
  web: {
    emoji: "🌐",
    title: "Web Development",
    body: "HTML5, CSS3, and JavaScript are my strongest area. Built 6 live projects using DOM manipulation, APIs, Canvas, and PWA patterns."
  },
  azure: {
    emoji: "☁️",
    title: "Microsoft Azure",
    body: "Certified in Azure Fundamentals, DevOps Engineer Expert, AZ-700 Networking, and DP-600 Fabric Analytics — all achieved in 2025."
  },
  data: {
    emoji: "📊",
    title: "Data Engineering",
    body: "Current main focus at WeThinkCode_. Studying ETL pipelines, data warehousing, and analytics engineering with Microsoft Fabric."
  },
  sql: {
    emoji: "🗄️",
    title: "SQL & Databases",
    body: "Intermediate in PostgreSQL, MySQL, and general SQL. Working knowledge of Firebase. Database design is a growing area of focus."
  },
  java: {
    emoji: "☕",
    title: "Java",
    body: "Intermediate Java with IntelliJ IDEA as the primary IDE. Used in coursework including OOP principles and Thymeleaf-based web apps."
  },
  git: {
    emoji: "🔧",
    title: "Git & Tools",
    body: "All 6 projects version-controlled on GitHub. Daily use of VS Code and Git for branching, commits, and collaboration workflows."
  }
};

// ─── TAB SWITCHING (top icon tabs) ──────────────────────────
function switchTab(tab, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + tab).classList.add('active');
  btn.classList.add('active');
}

// ─── BOTTOM NAV SWITCHING ───────────────────────────────────
const tabMap   = { home: 'grid', search: 'feed', profile: 'about', dm: 'contact', certs: 'certs' };
const tabOrder = ['grid', 'feed', 'about', 'contact', 'certs'];

function switchBottomNav(section) {
  // Update bottom nav active state
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('bnav-' + section).classList.add('active');

  // Sync tab bar + show correct panel
  const targetTab = tabMap[section];
  const idx = tabOrder.indexOf(targetTab);
  const tabBtns = document.querySelectorAll('.tab-btn');

  if (idx >= 0) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + targetTab).classList.add('active');
    if (tabBtns[idx]) tabBtns[idx].classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── PROJECT MODAL ──────────────────────────────────────────
function openProject(idx) {
  const p = projects[idx];
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-tech').textContent  = p.tech;
  document.getElementById('modal-desc').textContent  = p.desc;

  document.getElementById('modal-skills').innerHTML =
    p.skills.map(s => `<span class="modal-skill">${s}</span>`).join('');

  document.getElementById('modal-links').innerHTML = `
    <a class="modal-link-btn modal-link-primary"   href="${p.demo}"   target="_blank">🔗 Live Demo</a>
    <a class="modal-link-btn modal-link-secondary" href="${p.github}" target="_blank">⌨️ GitHub</a>
  `;

  document.getElementById('project-modal').classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('project-modal')) {
    document.getElementById('project-modal').classList.remove('open');
  }
}

// ─── STORY MODAL ────────────────────────────────────────────
function openStory(key) {
  const s = stories[key];
  document.getElementById('story-emoji').textContent = s.emoji;
  document.getElementById('story-title').textContent = s.title;
  document.getElementById('story-body').textContent  = s.body;
  document.getElementById('story-modal').classList.add('open');
}

function closeStory() {
  document.getElementById('story-modal').classList.remove('open');
}

// ─── CLIPBOARD UTILITIES ─────────────────────────────────────
function copyContact() {
  const info = 'Email: thutoseroto@gmail.com | Phone: 062 278 7446 | GitHub: https://github.com/Thuto-Seroto';
  navigator.clipboard.writeText(info).then(() => {
    alert('Contact info copied to clipboard!');
  }).catch(() => {
    alert('Could not copy — please copy manually: thutoseroto@gmail.com');
  });
}

function copyPhone() {
  navigator.clipboard.writeText('062 278 7446').then(() => {
    alert('Phone number copied to clipboard!');
  }).catch(() => {
    alert('Could not copy — please copy manually: 062 278 7446');
  });
}

// ─── KEYBOARD ACCESSIBILITY ──────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('project-modal').classList.remove('open');
    document.getElementById('story-modal').classList.remove('open');
  }
});