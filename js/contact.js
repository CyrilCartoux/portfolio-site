document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    // Fonction de sanitization
    const sanitizeInput = (input) => {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    // Validation du formulaire
    const validateForm = (formData) => {
        const errors = [];

        // Validation du prénom
        if (!formData.firstName.match(/^[A-Za-zÀ-ÿ\s-]{2,50}$/)) {
            errors.push('Le prénom doit contenir entre 2 et 50 caractères alphabétiques');
        }

        // Validation du nom
        if (!formData.lastName.match(/^[A-Za-zÀ-ÿ\s-]{2,50}$/)) {
            errors.push('Le nom doit contenir entre 2 et 50 caractères alphabétiques');
        }

        // Validation du téléphone
        if (!formData.phone.match(/^[0-9]{10}$/)) {
            errors.push('Le numéro de téléphone doit contenir exactement 10 chiffres');
        }

        // Validation du message
        if (formData.message.length < 10 || formData.message.length > 1000) {
            errors.push('Le message doit contenir entre 10 et 1000 caractères');
        }

        return errors;
    };

    // Gestion de la soumission du formulaire
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const formData = {
            firstName: sanitizeInput(contactForm.firstName.value.trim()),
            lastName: sanitizeInput(contactForm.lastName.value.trim()),
            phone: sanitizeInput(contactForm.phone.value.trim()),
            message: sanitizeInput(contactForm.message.value.trim())
        };

        // Validation
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        // Ici, vous pouvez ajouter le code pour envoyer les données à votre backend
        // Par exemple :
        try {
            // Simulation d'envoi de données
            console.log('Données du formulaire:', formData);
            
            // Afficher un message de succès
            alert('Votre message a été envoyé avec succès !');
            contactForm.reset();
        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
            alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
        }
    });
}); 