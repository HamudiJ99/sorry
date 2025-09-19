document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    let isOpened = false;
    
    // Klick-Event für die Karte
    card.addEventListener('click', function() {
        if (!isOpened) {
            openCard();
        } else {
            closeCard();
        }
    });
    
    function openCard() {
        card.classList.add('opened');
        isOpened = true;
        
        // Konfetti-Effekt beim Öffnen
        createConfetti();
        
        // Sound-Effekt (optional, falls du später einen hinzufügen möchtest)
        // playOpenSound();
    }
    
    function closeCard() {
        card.classList.remove('opened');
        isOpened = false;
    }
    
    // Konfetti-Effekt
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }
    
    function createConfettiPiece(color) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'confettiFall 3s linear forwards';
        
        document.body.appendChild(confetti);
        
        // Konfetti nach Animation entfernen
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 3000);
    }
    
    // CSS-Animation für Konfetti hinzufügen
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Zusätzliche Hover-Effekte
    card.addEventListener('mouseenter', function() {
        if (!isOpened) {
            card.style.transform = 'scale(1.05) rotateY(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!isOpened) {
            card.style.transform = 'scale(1) rotateY(0deg)';
        }
    });
    
    // Easter Egg: Doppelklick für Überraschungseffekt
    let clickCount = 0;
    card.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            surpriseEffect();
            clickCount = 0;
        }
        
        setTimeout(() => {
            if (clickCount > 0) clickCount--;
        }, 2000);
    });
    
    function surpriseEffect() {
        // Temporärer Regenbogen-Hintergrund
        const background = document.querySelector('.background');
        const originalBackground = background.style.background;
        
        background.style.background = 'linear-gradient(45deg, #ff0000, #ff7700, #ffff00, #00ff00, #0077ff, #7700ff, #ff0077)';
        background.style.backgroundSize = '400% 400%';
        
        // Extra Herzen
        for (let i = 0; i < 20; i++) {
            createFloatingHeart();
        }
        
        // Nach 3 Sekunden zurücksetzen
        setTimeout(() => {
            background.style.background = originalBackground;
        }, 3000);
    }
    
    function createFloatingHeart() {
        const hearts = ['💖', '💕', '💗', '💝', '💓', '💘'];
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartFloat 4s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }
    
    // CSS für schwebende Herzen
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        @keyframes heartFloat {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartStyle);
    
    // Keyboard-Unterstützung
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (!isOpened) {
                openCard();
            } else {
                closeCard();
            }
        }
        
        if (e.key === 'Escape' && isOpened) {
            closeCard();
        }
    });
    
    // Mache die Karte fokussierbar für Tastaturnavigation
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Entschuldigungskarte öffnen');
});

// Smooth loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
