// Effet de frappe pour les commandes
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = ''; // Vide le contenu initial
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Ajoute le curseur uniquement une fois le texte complet
            let cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            element.appendChild(cursor);
            
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }
    
    type();
}

// Animation du curseur
function blinkCursor(element) {
    let cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
    
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

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

    // Effet de frappe pour les commandes
    const typingElements = document.querySelectorAll('.typing-text');
    let delay = 0;
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = ''; // Vide le contenu initial
        
        setTimeout(() => {
            typeWriter(element, text);
        }, delay);
        
        delay += 1000; // Délai de 1 seconde entre chaque commande
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