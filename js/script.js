document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Animation du menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav') && 
            !e.target.closest('.menu-toggle')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Ajouter un effet de glitch aléatoire sur les liens
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const glitchText = link.textContent;
            const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            let glitchInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * glitchText.length);
                const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                const newText = glitchText.substring(0, randomIndex) + 
                               randomChar + 
                               glitchText.substring(randomIndex + 1);
                link.textContent = newText;
            }, 50);

            setTimeout(() => {
                clearInterval(glitchInterval);
                link.textContent = glitchText;
            }, 300);
        });
    });
}); 