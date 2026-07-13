// Tab Switching
const tabs = document.querySelectorAll('.settings-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
    });
});

// Profile Picture Upload - Fixed to work with actual HTML elements
function setupProfilePicUpload() {
    // Try multiple possible IDs
    const uploadBtn = document.querySelector('.file-input-label') || 
                     document.getElementById('uploadProfilePicBtn') ||
                     document.querySelector('[for="profilePicInput"]');
    
    const picInput = document.getElementById('profilePicInput');
    const picPreview = document.getElementById('profilePicPreview');
    
    if (!picInput || !picPreview) {
        console.warn('Profile picture elements not found. Creating them...');
        return;
    }
    
    // Handle file selection
    picInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result;
                picPreview.src = imageData;
                // Save to localStorage
                localStorage.setItem('profilePicture', imageData);
                showSuccessMessage();
            };
            reader.onerror = () => {
                alert('Error reading file');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Make label trigger file input
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            picInput.click();
        });
    }
}

// Load profile picture from localStorage on page load
window.addEventListener('load', () => {
    setupProfilePicUpload();
    
    const savedProfilePic = localStorage.getItem('profilePicture');
    const picPreview = document.getElementById('profilePicPreview');
    if (savedProfilePic && picPreview) {
        picPreview.src = savedProfilePic;
    }
    
    // Load all saved settings
    loadAllSettings();
});

// Profile Form Submission
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const profileData = {
            fullName: document.getElementById('fullName').value,
            qualifications: document.getElementById('qualifications').value,
            registration: document.getElementById('registration').value,
            yearsOfExperience: document.getElementById('yearsOfExperience').value
        };
        
        localStorage.setItem('profileData', JSON.stringify(profileData));
        showSuccessMessage();
        updateWebsiteContent(profileData);
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const contactData = {
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            address: document.getElementById('address').value,
            sessionDuration: document.getElementById('sessionDuration').value
        };
        
        localStorage.setItem('contactData', JSON.stringify(contactData));
        showSuccessMessage();
        updateWebsiteContent(contactData);
    });
}

// Services Form Submission
const servicesForm = document.getElementById('servicesForm');
if (servicesForm) {
    servicesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const servicesData = {
            service1: document.getElementById('service1').checked,
            service2: document.getElementById('service2').checked,
            service3: document.getElementById('service3').checked,
            service4: document.getElementById('service4').checked,
            service5: document.getElementById('service5').checked,
            service6: document.getElementById('service6').checked,
            description: document.getElementById('serviceDescription').value
        };
        
        localStorage.setItem('servicesData', JSON.stringify(servicesData));
        showSuccessMessage();
        updateWebsiteContent(servicesData);
    });
}

// About Form Submission
const aboutForm = document.getElementById('aboutForm');
if (aboutForm) {
    aboutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const aboutData = {
            philosophy: document.getElementById('philosophy').value,
            specializations: document.getElementById('specializations').value,
            aboutDescription: document.getElementById('aboutDescription').value,
            confidentialityNote: document.getElementById('confidentialityNote').value
        };
        
        localStorage.setItem('aboutData', JSON.stringify(aboutData));
        showSuccessMessage();
        updateWebsiteContent(aboutData);
    });
}

// Appearance Form Submission
const appearanceForm = document.getElementById('appearanceForm');
if (appearanceForm) {
    appearanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const appearanceData = {
            primaryColor: document.getElementById('primaryColor').value,
            secondaryColor: document.getElementById('secondaryColor').value,
            accentColor: document.getElementById('accentColor').value,
            websiteTitle: document.getElementById('websiteTitle').value,
            metaDescription: document.getElementById('metaDescription').value,
            footerText: document.getElementById('footerText').value
        };
        
        localStorage.setItem('appearanceData', JSON.stringify(appearanceData));
        showSuccessMessage();
        applyColorScheme(appearanceData);
    });
}

// Color Picker Event Listeners
const primaryColorInput = document.getElementById('primaryColor');
if (primaryColorInput) {
    primaryColorInput.addEventListener('input', (e) => {
        const displayEl = document.getElementById('primaryColorValue');
        if (displayEl) displayEl.textContent = e.target.value;
    });
}

const secondaryColorInput = document.getElementById('secondaryColor');
if (secondaryColorInput) {
    secondaryColorInput.addEventListener('input', (e) => {
        const displayEl = document.getElementById('secondaryColorValue');
        if (displayEl) displayEl.textContent = e.target.value;
    });
}

const accentColorInput = document.getElementById('accentColor');
if (accentColorInput) {
    accentColorInput.addEventListener('input', (e) => {
        const displayEl = document.getElementById('accentColorValue');
        if (displayEl) displayEl.textContent = e.target.value;
    });
}

// Show Success Message
function showSuccessMessage() {
    const alert = document.getElementById('successAlert');
    if (alert) {
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    }
}

// Load all settings from localStorage
function loadAllSettings() {
    // Load profile data
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
        const data = JSON.parse(profileData);
        const fullNameEl = document.getElementById('fullName');
        if (fullNameEl) fullNameEl.value = data.fullName || 'Nisha Newalkar';
        
        const qualsEl = document.getElementById('qualifications');
        if (qualsEl) qualsEl.value = data.qualifications || '';
        
        const regEl = document.getElementById('registration');
        if (regEl) regEl.value = data.registration || 'EMO Matrix';
        
        const expEl = document.getElementById('yearsOfExperience');
        if (expEl) expEl.value = data.yearsOfExperience || '0';
    }
    
    // Load contact data
    const contactData = localStorage.getItem('contactData');
    if (contactData) {
        const data = JSON.parse(contactData);
        const emailEl = document.getElementById('email');
        if (emailEl) emailEl.value = data.email || 'nisha@nishacounsellor.in';
        
        const phoneEl = document.getElementById('phone');
        if (phoneEl) phoneEl.value = data.phone || '+91 98765-43210';
        
        const cityEl = document.getElementById('city');
        if (cityEl) cityEl.value = data.city || 'Thane';
        
        const stateEl = document.getElementById('state');
        if (stateEl) stateEl.value = data.state || 'Maharashtra';
        
        const countryEl = document.getElementById('country');
        if (countryEl) countryEl.value = data.country || 'India';
        
        const addressEl = document.getElementById('address');
        if (addressEl) addressEl.value = data.address || 'Thane, Mumbai, India';
        
        const durationEl = document.getElementById('sessionDuration');
        if (durationEl) durationEl.value = data.sessionDuration || '60';
    }
    
    // Load services data
    const servicesData = localStorage.getItem('servicesData');
    if (servicesData) {
        const data = JSON.parse(servicesData);
        for (let i = 1; i <= 6; i++) {
            const checkbox = document.getElementById('service' + i);
            if (checkbox) checkbox.checked = data['service' + i] !== false;
        }
        
        const descEl = document.getElementById('serviceDescription');
        if (descEl) descEl.value = data.description || '';
    }
    
    // Load about data
    const aboutData = localStorage.getItem('aboutData');
    if (aboutData) {
        const data = JSON.parse(aboutData);
        const philEl = document.getElementById('philosophy');
        if (philEl) philEl.value = data.philosophy || '';
        
        const specEl = document.getElementById('specializations');
        if (specEl) specEl.value = data.specializations || '';
        
        const descEl = document.getElementById('aboutDescription');
        if (descEl) descEl.value = data.aboutDescription || '';
        
        const confEl = document.getElementById('confidentialityNote');
        if (confEl) confEl.value = data.confidentialityNote || '';
    }
    
    // Load appearance data
    const appearanceData = localStorage.getItem('appearanceData');
    if (appearanceData) {
        const data = JSON.parse(appearanceData);
        
        const primaryEl = document.getElementById('primaryColor');
        if (primaryEl) primaryEl.value = data.primaryColor || '#2c5f7f';
        
        const secondaryEl = document.getElementById('secondaryColor');
        if (secondaryEl) secondaryEl.value = data.secondaryColor || '#4a90a4';
        
        const accentEl = document.getElementById('accentColor');
        if (accentEl) accentEl.value = data.accentColor || '#7cb9d9';
        
        const titleEl = document.getElementById('websiteTitle');
        if (titleEl) titleEl.value = data.websiteTitle || 'Nisha Newalkar - Professional Counsellor';
        
        const metaEl = document.getElementById('metaDescription');
        if (metaEl) metaEl.value = data.metaDescription || '';
        
        const footerEl = document.getElementById('footerText');
        if (footerEl) footerEl.value = data.footerText || '';
        
        // Update color value displays
        const primaryValEl = document.getElementById('primaryColorValue');
        if (primaryValEl) primaryValEl.textContent = data.primaryColor || '#2c5f7f';
        
        const secondaryValEl = document.getElementById('secondaryColorValue');
        if (secondaryValEl) secondaryValEl.textContent = data.secondaryColor || '#4a90a4';
        
        const accentValEl = document.getElementById('accentColorValue');
        if (accentValEl) accentValEl.textContent = data.accentColor || '#7cb9d9';
        
        // Apply color scheme
        applyColorScheme(data);
    }
}

// Apply color scheme
function applyColorScheme(colors) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors.primaryColor || '#2c5f7f');
    root.style.setProperty('--secondary-color', colors.secondaryColor || '#4a90a4');
    root.style.setProperty('--accent-color', colors.accentColor || '#7cb9d9');
}

// Update website content dynamically
function updateWebsiteContent(data) {
    // Store all data in localStorage for main website to read
    const allSettings = {
        profile: localStorage.getItem('profileData'),
        contact: localStorage.getItem('contactData'),
        services: localStorage.getItem('servicesData'),
        about: localStorage.getItem('aboutData'),
        appearance: localStorage.getItem('appearanceData'),
        profilePicture: localStorage.getItem('profilePicture')
    };
    
    localStorage.setItem('allWebsiteSettings', JSON.stringify(allSettings));
}

// Export settings as JSON (for backup)
function exportSettings() {
    const settings = {
        profileData: localStorage.getItem('profileData'),
        contactData: localStorage.getItem('contactData'),
        servicesData: localStorage.getItem('servicesData'),
        aboutData: localStorage.getItem('aboutData'),
        appearanceData: localStorage.getItem('appearanceData')
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-settings-backup.json';
    link.click();
}

// Clear all settings
function clearAllSettings() {
    if (confirm('Are you sure you want to clear all settings? This action cannot be undone.')) {
        localStorage.clear();
        location.reload();
    }
}

console.log('Settings page loaded and ready! File upload feature enabled.');
