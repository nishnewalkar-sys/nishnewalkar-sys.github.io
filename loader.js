// Loader Script - Syncs Settings to Main Website
// This script loads all custom settings from localStorage and updates the main website

function loadWebsiteSettings() {
    // Load profile data
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
        const data = JSON.parse(profileData);
        document.getElementById('displayName').textContent = data.fullName || 'Nisha Newalkar';
        
        // Update qualifications list
        if (data.qualifications) {
            const quals = data.qualifications.split('\n').filter(q => q.trim());
            const qualList = document.getElementById('qualificationsList');
            qualList.innerHTML = quals.map(q => `<li>${q.trim()}</li>`).join('');
        }
        
        document.getElementById('registrationDisplay').textContent = data.registration || 'EMO Matrix';
        
        // Update experience
        const years = parseInt(data.yearsOfExperience) || 0;
        const expText = years === 0 ? 'Beginner' : years === 1 ? '1 Year' : `${years} Years`;
        document.getElementById('experienceDisplay').textContent = expText;
    }
    
    // Load profile picture
    const profilePic = localStorage.getItem('profilePicture');
    if (profilePic) {
        document.getElementById('profilePictureDisplay').src = profilePic;
    }
    
    // Load contact data
    const contactData = localStorage.getItem('contactData');
    if (contactData) {
        const data = JSON.parse(contactData);
        const location = `${data.city || 'Thane'}, ${data.state || 'Maharashtra'}, ${data.country || 'India'}`;
        document.getElementById('displayLocation').textContent = location;
        document.getElementById('locationDisplay').textContent = `${data.city || 'Thane'}, ${data.state || 'Maharashtra'}`;
        
        document.getElementById('displayEmail').textContent = data.email || 'nisha@nishacounsellor.in';
        document.getElementById('displayEmail').href = `mailto:${data.email || 'nisha@nishacounsellor.in'}`;
        
        document.getElementById('displayPhone').textContent = data.phone || '+91 (XXX) XXXX-XXXX';
        document.getElementById('displayPhone').href = `tel:${data.phone || '+91 9876543210'}`;
        
        // Update FAQ session duration
        const duration = data.sessionDuration || '60';
        document.getElementById('faqSessionDuration').textContent = `Standard sessions are typically ${duration} minutes. The duration can be adjusted based on individual needs and requirements.`;
    }
    
    // Load about data
    const aboutData = localStorage.getItem('aboutData');
    if (aboutData) {
        const data = JSON.parse(aboutData);
        document.getElementById('philosophyDisplay').textContent = `"${data.philosophy || 'I believe in understanding the mindset and behavioral patterns and support the clients by compassion and strict confidentiality with no judgement.'}"`;
        document.getElementById('aboutDescriptionDisplay').textContent = data.aboutDescription || 'With a specialized focus on forensic, adolescent, and criminal psychology, I provide compassionate, evidence-based counselling tailored to each client\'s unique needs.';
        document.getElementById('faqConfidentiality').textContent = data.confidentialityNote || 'All sessions are completely confidential and held with strict privacy standards, except where legally required to disclose (harm to self/others).';
        document.getElementById('confidentialityText').textContent = data.confidentialityNote || 'Our commitment to your privacy and confidential support.';
    }
    
    // Load appearance data (colors)
    const appearanceData = localStorage.getItem('appearanceData');
    if (appearanceData) {
        const data = JSON.parse(appearanceData);
        applyColorScheme(data);
        document.getElementById('footerText').textContent = data.footerText || 'Specializing in Forensic, Adolescent & Criminal Psychology | Based in Thane, Mumbai';
        
        // Update document title
        if (data.websiteTitle) {
            document.title = data.websiteTitle;
        }
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && data.metaDescription) {
            metaDesc.content = data.metaDescription;
        }
    }
    
    // Load services data
    const servicesData = localStorage.getItem('servicesData');
    if (servicesData) {
        const data = JSON.parse(servicesData);
        updateServicesDisplay(data);
    }
}

// Apply color scheme
function applyColorScheme(colors) {
    const root = document.documentElement;
    if (colors.primaryColor) root.style.setProperty('--primary-color', colors.primaryColor);
    if (colors.secondaryColor) root.style.setProperty('--secondary-color', colors.secondaryColor);
    if (colors.accentColor) root.style.setProperty('--accent-color', colors.accentColor);
}

// Update services display
function updateServicesDisplay(servicesData) {
    const services = [
        { id: 'service1', name: 'One-on-One Counselling', desc: 'Personalized therapeutic sessions addressing your unique concerns with confidentiality and professionalism.' },
        { id: 'service2', name: 'Forensic Assessments', desc: 'Professional psychological assessments for legal, court, and investigative purposes.' },
        { id: 'service3', name: 'Adolescent Support Programs', desc: 'Comprehensive counselling programs designed specifically for teenage clients and their families.' },
        { id: 'service4', name: 'Corporate Training', desc: 'Workplace psychology workshops and training sessions for organizational development.' },
        { id: 'service5', name: 'Court Consultancy', desc: 'Expert consultation and testimony for legal proceedings and criminal justice matters.' },
        { id: 'service6', name: 'Behavioral Analysis', desc: 'In-depth analysis of behavioral patterns to support personal growth and psychological well-being.' }
    ];
    
    const servicesGrid = document.getElementById('servicesGrid');
    let html = '';
    
    services.forEach(service => {
        const isChecked = servicesData[service.id] !== false;
        if (isChecked) {
            html += `
                <div class="service-card">
                    <h3>${service.name}</h3>
                    <p>${service.desc}</p>
                </div>
            `;
        }
    });
    
    servicesGrid.innerHTML = html;
}

// Add CSS for profile picture
function addProfilePictureStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .about-profile-pic {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .profile-picture {
            width: 250px;
            height: 250px;
            border-radius: 12px;
            border: 3px solid var(--accent-color);
            object-fit: cover;
            display: block;
            margin: 0 auto;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }
        
        .about-content {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 2rem;
            align-items: start;
        }
        
        @media (max-width: 768px) {
            .about-content {
                grid-template-columns: 1fr;
            }
            
            .about-profile-pic {
                margin-bottom: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize on page load
window.addEventListener('load', () => {
    addProfilePictureStyles();
    loadWebsiteSettings();
});

// Listen for storage changes (when settings are updated in another tab)
window.addEventListener('storage', () => {
    loadWebsiteSettings();
});

console.log('Website loader script initialized!');
