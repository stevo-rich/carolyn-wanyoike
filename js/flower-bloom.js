class FlowerBloom {
    constructor() {
        this.container = document.getElementById('flowerExplosion');
        this.flowers = [
            'sunflower', 'rose-yellow', 'rose-pink',
            'dahlia-red', 'lily', 'tulip'
        ];
        this.flowerCount = 120;
    }

    start() {
        this.container.classList.add('active');
        this.createFlowers();

        // Wait for flowers to fill screen, THEN show gift
        setTimeout(() => {
            this.showGiftBox();
        }, 4000); // 4 seconds of flower bloom
    }

    createFlowers() {
        for (let i = 0; i < this.flowerCount; i++) {
            const flower = document.createElement('img');
            const type = this.flowers[Math.floor(Math.random() * this.flowers.length)];

            flower.src = `assets/images/flowers/${type}.png`;
            flower.className = 'bloom-flower';
            flower.style.background = 'transparent';
            flower.style.backgroundColor = 'transparent';

            // Start from center-bottom (where gift box will be)
            const startX = 50 + (Math.random() - 0.5) * 10;
            const startY = 60 + Math.random() * 10;

            // Spread to fill entire screen
            const endX = (Math.random() - 0.5) * 120;
            const endY = (Math.random() - 0.5) * 120;
            const rotation = Math.random() * 360;
            const scale = 0.8 + Math.random() * 2;
            const delay = Math.random() * 1.5;

            flower.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: ${startY}%;
                width: ${50 * scale}px;
                opacity: 0;
                background: transparent !important;
                pointer-events: none;
                z-index: 100;
            `;

            this.container.appendChild(flower);

            // Animate outward
            setTimeout(() => {
                flower.style.transition = `all ${2 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                flower.style.opacity = '1';
                flower.style.left = `${50 + endX}%`;
                flower.style.top = `${50 + endY}%`;
                flower.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
            }, delay * 100);
        }
    }

    showGiftBox() {
        // Fade out flower explosion
        this.container.style.transition = 'opacity 1.5s ease';
        this.container.style.opacity = '0';

        // Show gift section underneath
        const giftSection = document.createElement('div');
        giftSection.id = 'tempGiftSection';
        giftSection.innerHTML = `
            <div style="
                position: fixed;
                inset: 0;
                background: radial-gradient(ellipse at center, #d4a843 0%, #b8941f 40%, #8b6914 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 90;
                opacity: 0;
                transition: opacity 1s ease;
            ">
                <h1 style="
                    font-family: 'Dancing Script', cursive;
                    font-size: 3rem;
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 30px;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
                ">For carolyne</h1>
                <div id="miniGiftBox" style="
                    width: 120px;
                    height: 100px;
                    background: linear-gradient(145deg, #faf8f5 0%, #f0ebe3 100%);
                    border-radius: 4px;
                    position: relative;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                ">
                    <div style="
                        position: absolute;
                        top: -10px;
                        left: -5px;
                        width: 130px;
                        height: 25px;
                        background: linear-gradient(145deg, #faf8f5 0%, #f0ebe3 100%);
                        border-radius: 4px;
                        animation: miniLidPop 0.6s 1s forwards;
                    "></div>
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 100%;
                        height: 20px;
                        background: #800020;
                        transform: translateY(-50%);
                    "></div>
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 50%;
                        width: 20px;
                        height: 100%;
                        background: #800020;
                        transform: translateX(-50%);
                    "></div>
                </div>
                <div id="miniBurst" style="position: absolute; width: 100%; height: 100%; pointer-events: none;"></div>
            </div>
        `;

        document.body.appendChild(giftSection);

        // Fade in gift
        setTimeout(() => {
            giftSection.querySelector('div').style.opacity = '1';
        }, 100);

        // Mini burst from box
        setTimeout(() => {
            this.miniBurst(giftSection.querySelector('#miniBurst'));
        }, 1800);

        // Then go to full bouquet page
        setTimeout(() => {
            window.location.href = 'bouquet.html?from=gift';
        }, 5000);
    }

    miniBurst(container) {
        const miniFlowers = ['rose-yellow', 'rose-pink', 'dahlia-red', 'sunflower'];

        for (let i = 0; i < 30; i++) {
            const f = document.createElement('img');
            f.src = `assets/images/flowers/${miniFlowers[Math.floor(Math.random() * miniFlowers.length)]}.png`;
            f.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: ${30 + Math.random() * 40}px;
                opacity: 0;
                background: transparent !important;
                transition: all 1.5s ease-out;
            `;
            container.appendChild(f);

            const angle = (Math.PI * 2 * i) / 30;
            const dist = 100 + Math.random() * 300;

            setTimeout(() => {
                f.style.opacity = '1';
                f.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 100}px) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;
            }, i * 30);
        }
    }
}

// Add mini lid animation
const style = document.createElement('style');
style.textContent = `
    @keyframes miniLidPop {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-60px) rotate(-20deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.flowerBloom = new FlowerBloom();
});
