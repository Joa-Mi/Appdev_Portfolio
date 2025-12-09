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

// Theme Switcher - Using window.storage for persistence
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    // Set button icon based on current theme
    async function updateButtonIcon() {
        try {
            const result = await window.storage.get('theme');
            const savedTheme = result ? result.value : 'light';
            const isDark = savedTheme === 'dark';

            // Sync DOM
            if (isDark && !document.documentElement.classList.contains('dark-theme')) {
                document.documentElement.classList.add('dark-theme');
            } else if (!isDark && document.documentElement.classList.contains('dark-theme')) {
                document.documentElement.classList.remove('dark-theme');
            }

            themeToggle.textContent = isDark ? '☀️' : '🌙';
        } catch (error) {
            themeToggle.textContent = '🌙';
        }
    }

    // Initial check
    updateButtonIcon();

    // Poll for changes (Sync across tabs)
    setInterval(updateButtonIcon, 1000);

    themeToggle.addEventListener('click', async () => {
        const isDarkNow = document.documentElement.classList.contains('dark-theme');
        const newTheme = isDarkNow ? 'light' : 'dark'; // Toggle

        // Optimistic update
        document.documentElement.classList.toggle('dark-theme');
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';

        try {
            await window.storage.set('theme', newTheme);
        } catch (error) {
            console.error('Failed to save theme:', error);
            // Revert if failed
            document.documentElement.classList.toggle('dark-theme');
            themeToggle.textContent = isDarkNow ? '☀️' : '🌙';
        }
    });
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        const formGroups = contactForm.querySelectorAll('.form-group');

        // Validate all fields
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
            // Get form data
            const formData = new FormData(contactForm);

            try {
                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thank you for your message! I will get back to you soon at mmik709999@gmail.com');
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem sending your message. Please try again or email me directly at mmik709999@gmail.com');
                }
            } catch (error) {
                alert('There was an error sending your message. Please email me directly at mmik709999@gmail.com');
            }
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