class GiftAnimation {
    constructor() {
        this.giftSection = document.getElementById('giftSection');
        this.burstContainer = document.getElementById('burstFlowers');
        this.giftBox = document.getElementById('giftBox');
        this.flowers = ['rose-yellow', 'rose-pink', 'dahlia-red', 'sunflower', 'lily', 'tulip'];
        this.hasPlayed = false;
    }

    init() {
        if (this.hasPlayed) return;
        this.hasPlayed = true;

        console.log('Gift animation starting...');

        // Phase 1: Show gift box with name (already visible via CSS)
        // Phase 2: Shake box
        setTimeout(() => {
            if (this.giftBox) {
                this.giftBox.style.animation = 'giftShake 0.5s ease-in-out 3';
            }
        }, 500);

        // Phase 3: Lid pops (CSS animation handles this at 2.5s)
        // Phase 4: Flowers burst out (at 3.2s after lid pops)
        setTimeout(() => {
            this.createBurstFlowers();
        }, 3200);

        // Phase 5: Flowers fill screen then transition to letter
        setTimeout(() => {
            this.transitionToLetter();
        }, 8000);
    }

    createBurstFlowers() {
        if (!this.burstContainer) {
            console.error('Burst container not found!');
            return;
        }

        console.log('Creating burst flowers...');

        const count = 80;

        // Clear any existing
        this.burstContainer.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const flower = document.createElement('img');
            const type = this.flowers[Math.floor(Math.random() * this.flowers.length)];

            flower.src = `assets/images/flowers/${type}.png`;
            flower.alt = type;

            // CRITICAL: Force transparent
            flower.style.background = 'transparent';
            flower.style.backgroundColor = 'transparent';

            // Calculate burst from center of box
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 2;
            const distance = 100 + Math.random() * 600;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 200; // Burst upward
            const rot = Math.random() * 720 - 360;
            const sc = 0.5 + Math.random() * 1.2;

            // Start at center (gift box location)
            flower.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: ${50 * sc}px;
                height: auto;
                opacity: 0;
                background: transparent !important;
                pointer-events: none;
                z-index: 25;
                transform: translate(-50%, -50%) scale(0);
            `;

            this.burstContainer.appendChild(flower);

            // Animate outward with delay
            const delay = Math.random() * 500;
            setTimeout(() => {
                flower.style.transition = `all ${1.5 + Math.random() * 1}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                flower.style.opacity = '1';
                flower.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${sc}) rotate(${rot}deg)`;
            }, delay);
        }

        // Second wave for density
        setTimeout(() => {
            this.createSecondWave();
        }, 300);
    }

    createSecondWave() {
        const count = 50;

        for (let i = 0; i < count; i++) {
            const flower = document.createElement('img');
            const type = this.flowers[Math.floor(Math.random() * this.flowers.length)];

            flower.src = `assets/images/flowers/${type}.png`;
            flower.alt = type;
            flower.style.background = 'transparent';
            flower.style.backgroundColor = 'transparent';

            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 500;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 300;
            const rot = Math.random() * 720 - 360;
            const sc = 0.4 + Math.random() * 1.0;

            flower.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: ${45 * sc}px;
                height: auto;
                opacity: 0;
                background: transparent !important;
                pointer-events: none;
                z-index: 20;
                transform: translate(-50%, -50%) scale(0);
            `;

            this.burstContainer.appendChild(flower);

            setTimeout(() => {
                flower.style.transition = `all ${1.8 + Math.random()}s ease-out`;
                flower.style.opacity = '0.9';
                flower.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${sc}) rotate(${rot}deg)`;
            }, Math.random() * 400);
        }
    }

    transitionToLetter() {
        console.log('Transitioning to letter...');

        // Fade out gift section ONLY
        if (this.giftSection) {
            this.giftSection.style.transition = 'opacity 2s ease';
            this.giftSection.style.opacity = '0';

            setTimeout(() => {
                this.giftSection.style.display = 'none';
                this.giftSection.style.visibility = 'hidden';
            }, 2000);
        }

        // Scroll to letter section (but DON'T hide other sections)
        setTimeout(() => {
            const letterSection = document.getElementById('letterSection');
            if (letterSection) {
                letterSection.scrollIntoView({ behavior: 'smooth' });
                letterSection.classList.add('revealed');
            }
        }, 500);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.giftAnimation = new GiftAnimation();

    // Auto-start after short delay to ensure everything loaded
    setTimeout(() => {
        if (window.giftAnimation) {
            window.giftAnimation.init();
        }
    }, 300);
});