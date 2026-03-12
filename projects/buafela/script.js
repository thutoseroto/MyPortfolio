// ========================================
// BUAFELA CHAT APP - COMPLETE WORKING VERSION
// ========================================

// Wait for everything to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('BuaFela starting...');
    initializeApp();
});

function initializeApp() {
    // Get all elements
    const welcomeScreen = document.getElementById('welcomeScreen');
    const messageInputContainer = document.getElementById('messageInputContainer');
    const contactModal = document.getElementById('contactModal');
    const shareModal = document.getElementById('shareModal');
    const addContactBtn = document.getElementById('addContactBtn');
    const contactsBtn = document.getElementById('contactsBtn');
    const welcomeAddContact = document.getElementById('welcomeAddContact');
    const closeButtons = document.querySelectorAll('.modal .close');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareLink = document.getElementById('shareLink');
    const contactForm = document.getElementById('contactForm');
    const contactsSidebar = document.getElementById('contactsSidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeContacts = document.getElementById('closeContacts');

    // Set share link value
    if (shareLink) {
        shareLink.value = window.location.href;
    }

    // Load contacts
    loadAndDisplayContacts();

    // ========================================
    // BUTTON HANDLERS
    // ========================================

    // Add Contact button (header)
    if (addContactBtn) {
        addContactBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (contactModal) {
                contactModal.style.display = 'flex';
                contactModal.classList.add('show');
            }
        };
    }

    // Add Contact button (welcome screen)
    if (welcomeAddContact) {
        welcomeAddContact.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (contactModal) {
                contactModal.style.display = 'flex';
                contactModal.classList.add('show');
            }
        };
    }

    // Contacts button
    if (contactsBtn) {
        contactsBtn.onclick = function(e) {
            e.preventDefault();
            if (contactsSidebar) {
                contactsSidebar.classList.add('mobile-show');
            }
        };
    }

    // Mobile menu button
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = function(e) {
            e.preventDefault();
            if (contactsSidebar) {
                contactsSidebar.classList.add('mobile-show');
            }
        };
    }

    // Close contacts sidebar
    if (closeContacts) {
        closeContacts.onclick = function(e) {
            e.preventDefault();
            if (contactsSidebar) {
                contactsSidebar.classList.remove('mobile-show');
            }
        };
    }

    // ========================================
    // MODAL CLOSE HANDLERS
    // ========================================

    // Close buttons
    closeButtons.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('show');
            }
        };
    });

    // Close when clicking outside modal
    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            e.target.classList.remove('show');
        }
    };

    // ========================================
    // COPY LINK HANDLER
    // ========================================

    if (copyLinkBtn && shareLink) {
        copyLinkBtn.onclick = function(e) {
            e.preventDefault();
            shareLink.select();
            navigator.clipboard.writeText(shareLink.value).then(() => {
                alert('Link copied to clipboard!');
            }).catch(() => {
                alert('Failed to copy link');
            });
        };
    }

    // ========================================
    // CONTACT FORM HANDLER
    // ========================================

    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();

            const name = document.getElementById('contactName')?.value;
            const phone = document.getElementById('contactPhone')?.value;
            const language = document.getElementById('contactLanguage')?.value;

            if (name && phone) {
                addNewContact(name, phone, language);
                contactForm.reset();
                if (contactModal) {
                    contactModal.style.display = 'none';
                    contactModal.classList.remove('show');
                }
                alert(`Contact ${name} added successfully!`);
            }
        };
    }

    // ========================================
    // DEMO CONTACTS
    // ========================================

    // Add demo contacts if none exist
    function addDemoContacts() {
        const contacts = getContacts();
        if (contacts.length === 0) {
            const demos = [
                { name: 'Thabo Mokoena', phone: '0812345678', language: 'zulu' },
                { name: 'Maria Ndlovu', phone: '0823456789', language: 'xhosa' },
                { name: 'Johan van der Merwe', phone: '0834567890', language: 'afrikaans' }
            ];

            demos.forEach(demo => addNewContact(demo.name, demo.phone, demo.language));
        }
    }

    addDemoContacts();
}

// ========================================
// CONTACT FUNCTIONS
// ========================================

function getContacts() {
    const saved = localStorage.getItem('buafela_contacts');
    return saved ? JSON.parse(saved) : [];
}

function saveContacts(contacts) {
    localStorage.setItem('buafela_contacts', JSON.stringify(contacts));
}

function addNewContact(name, phone, language = 'english') {
    // Format phone
    phone = phone.replace(/\s/g, '');
    if (!phone.startsWith('0')) {
        phone = '0' + phone;
    }

    const contact = {
        id: Date.now().toString(),
        name: name,
        phone: phone,
        language: language,
        online: Math.random() > 0.5,
        avatar: '🇿🇦'
    };

    const contacts = getContacts();
    contacts.push(contact);
    saveContacts(contacts);
    displayContacts(contacts);
}

function displayContacts(contacts) {
    const contactList = document.getElementById('contactList');
    if (!contactList) return;

    if (contacts.length === 0) {
        contactList.innerHTML = '<div class="empty-state"><p>No contacts yet</p><small>Click + to add contacts</small></div>';
        return;
    }

    contactList.innerHTML = contacts.map(contact => `
        <div class="contact-item" onclick="selectContact('${contact.id}')">
            <div class="contact-avatar">
                🇿🇦
                <span class="contact-status ${contact.online ? 'online' : ''}"></span>
            </div>
            <div class="contact-info">
                <div class="contact-name">
                    <span>${contact.name}</span>
                    <span class="contact-language">${getLanguageName(contact.language)}</span>
                </div>
                <div class="contact-phone">${formatPhone(contact.phone)}</div>
            </div>
        </div>
    `).join('');
}

function loadAndDisplayContacts() {
    const contacts = getContacts();
    displayContacts(contacts);
}

// Make selectContact globally available
window.selectContact = function(contactId) {
    const contacts = getContacts();
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    // Update UI
    const welcomeScreen = document.getElementById('welcomeScreen');
    const messageInputContainer = document.getElementById('messageInputContainer');
    const currentChatName = document.getElementById('currentChatName');
    const chatStatus = document.getElementById('chatStatus');

    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (messageInputContainer) messageInputContainer.style.display = 'flex';
    if (currentChatName) currentChatName.textContent = contact.name;
    if (chatStatus) chatStatus.textContent = contact.online ? '🟢 Online' : '⚪ Offline';

    // Highlight active contact
    document.querySelectorAll('.contact-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Close sidebar on mobile
    const sidebar = document.getElementById('contactsSidebar');
    if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-show');
    }
};

// Helper functions
function getLanguageName(code) {
    const names = {
        english: 'English', zulu: 'isiZulu', xhosa: 'isiXhosa',
        afrikaans: 'Afrikaans', sepedi: 'Sepedi', setswana: 'Setswana',
        sesotho: 'Sesotho', tsonga: 'Xitsonga', swati: 'siSwati',
        venda: 'Tshivenda', ndebele: 'isiNdebele'
    };
    return names[code] || code;
}

function formatPhone(phone) {
    if (phone.length === 10) {
        return `${phone.slice(0,3)} ${phone.slice(3,6)} ${phone.slice(6)}`;
    }
    return phone;
}