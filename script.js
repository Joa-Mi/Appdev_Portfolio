// Date and Time Display
function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        datetimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Initialize date/time if element exists
if (document.getElementById('datetime')) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Theme Switcher
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    let isDark = false;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
}

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            group.classList.remove('error');
            
            if (!input.value.trim()) {
                group.classList.add('error');
                isValid = false;
            }
            
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    group.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Add smooth animations to feature cards on home page
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length > 0) {
    featureCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s both`;
    });
}