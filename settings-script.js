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

// Profile Picture Upload
const profilePicInput = document.getElementById('profilePicInput');
const profilePicPreview = document.getElementById('profilePicPreview');

profilePicInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profilePicPreview.src = event.target.result;
            // Save to localStorage
            localStorage.setItem('profilePicture', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load profile picture from localStorage on page load
window.addEventListener('load', () => {
    const savedProfilePic = localStorage.getItem('profilePicture');
    if (savedProfilePic) {
        profilePicPreview.src = savedProfilePic;
    }
    
    // Load all saved settings
    loadAllSettings();
});

// Profile Form Submission
document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const profileData = {
        fullName: document.getElementById('fullName').value,
        qualifications: document.getElementById('qualifications').value,
        registration: document.getElementById('registration').value,
        yearsOfExperience: document.getElementById('yearsOfExperience').value
    };
    
    localStorage.setItem('profileData', JSON.stringify(profileData));
    showSuccessMessage();\n    updateWebsiteContent(profileData);
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
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

// Services Form Submission
document.getElementById('servicesForm').addEventListener('submit', (e) => {
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

// About Form Submission
document.getElementById('aboutForm').addEventListener('submit', (e) => {
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

// Appearance Form Submission
document.getElementById('appearanceForm').addEventListener('submit', (e) => {
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

// Color Picker Event Listeners
document.getElementById('primaryColor').addEventListener('input', (e) => {
    document.getElementById('primaryColorValue').textContent = e.target.value;
});

document.getElementById('secondaryColor').addEventListener('input', (e) => {
    document.getElementById('secondaryColorValue').textContent = e.target.value;
});

document.getElementById('accentColor').addEventListener('input', (e) => {
    document.getElementById('accentColorValue').textContent = e.target.value;
});

// Show Success Message
function showSuccessMessage() {
    const alert = document.getElementById('successAlert');
    alert.classList.add('show');
    setTimeout(() => {
        alert.classList.remove('show');
    }, 3000);
}

// Load all settings from localStorage
function loadAllSettings() {
    // Load profile data
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
        const data = JSON.parse(profileData);
        document.getElementById('fullName').value = data.fullName || 'Nisha Newalkar';
        document.getElementById('qualifications').value = data.qualifications || '';
        document.getElementById('registration').value = data.registration || 'EMO Matrix';
        document.getElementById('yearsOfExperience').value = data.yearsOfExperience || '0';
    }
    
    // Load contact data
    const contactData = localStorage.getItem('contactData');
    if (contactData) {
        const data = JSON.parse(contactData);
        document.getElementById('email').value = data.email || 'nisha@nishacounsellor.in';
        document.getElementById('phone').value = data.phone || '+91 98765-43210';
        document.getElementById('city').value = data.city || 'Thane';
        document.getElementById('state').value = data.state || 'Maharashtra';
        document.getElementById('country').value = data.country || 'India';
        document.getElementById('address').value = data.address || 'Thane, Mumbai, India';
        document.getElementById('sessionDuration').value = data.sessionDuration || '60';
    }
    
    // Load services data
    const servicesData = localStorage.getItem('servicesData');
    if (servicesData) {
        const data = JSON.parse(servicesData);
        document.getElementById('service1').checked = data.service1 !== false;
        document.getElementById('service2').checked = data.service2 !== false;
        document.getElementById('service3').checked = data.service3 !== false;
        document.getElementById('service4').checked = data.service4 !== false;
        document.getElementById('service5').checked = data.service5 !== false;
        document.getElementById('service6').checked = data.service6 !== false;
        document.getElementById('serviceDescription').value = data.description || '';
    }
    
    // Load about data
    const aboutData = localStorage.getItem('aboutData');
    if (aboutData) {
        const data = JSON.parse(aboutData);
        document.getElementById('philosophy').value = data.philosophy || '';
        document.getElementById('specializations').value = data.specializations || '';
        document.getElementById('aboutDescription').value = data.aboutDescription || '';
        document.getElementById('confidentialityNote').value = data.confidentialityNote || '';
    }
    
    // Load appearance data
    const appearanceData = localStorage.getItem('appearanceData');
    if (appearanceData) {
        const data = JSON.parse(appearanceData);
        document.getElementById('primaryColor').value = data.primaryColor || '#2c5f7f';
        document.getElementById('secondaryColor').value = data.secondaryColor || '#4a90a4';
        document.getElementById('accentColor').value = data.accentColor || '#7cb9d9';
        document.getElementById('websiteTitle').value = data.websiteTitle || 'Nisha Newalkar - Professional Counsellor';
        document.getElementById('metaDescription').value = data.metaDescription || '';
        document.getElementById('footerText').value = data.footerText || '';
        
        // Update color value displays
        document.getElementById('primaryColorValue').textContent = data.primaryColor || '#2c5f7f';
        document.getElementById('secondaryColorValue').textContent = data.secondaryColor || '#4a90a4';
        document.getElementById('accentColorValue').textContent = data.accentColor || '#7cb9d9';
        
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
    // This function can be used to update the main website with new settings
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

console.log('Settings page loaded and ready!');
