class PinValidator {
    constructor() {
        this.pin = '';
        this.correctPin = '0725'; // Load from config in production
        this.dots = document.querySelectorAll('.pin-dots .dot');
        this.buttons = document.querySelectorAll('.num-btn');
        this.isLocked = false;


        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleInput(e));
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleInput(e) {
        if (this.isLocked) return;

        const btn = e.currentTarget;
        const num = btn.dataset.num;

        if (num !== undefined) {
            this.addDigit(num);
        } else {
            // Backspace
            this.removeDigit();
        }
    }

    handleKeyboard(e) {
        if (this.isLocked) return;

        if (e.key >= '0' && e.key <= '9') {
            this.addDigit(e.key);
        } else if (e.key === 'Backspace') {
            this.removeDigit();
        } else if (e.key === 'Enter' && this.pin.length === 4) {
            this.validate();
        }
    }

    addDigit(digit) {
        if (this.pin.length >= 4) return;

        this.pin += digit;
        this.updateDots();

        // Visual feedback on button
        const btn = document.querySelector(`.num-btn[data-num="${digit}"]`);
        if (btn) {
            btn.style.background = 'var(--gold-pale)';
            setTimeout(() => {
                btn.style.background = '';
            }, 150);
        }

        if (this.pin.length === 4) {
            setTimeout(() => this.validate(), 300);
        }
    }

    removeDigit() {
        this.pin = this.pin.slice(0, -1);
        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('filled', i < this.pin.length);
            dot.classList.remove('error');
        });
    }

    validate() {
        this.isLocked = true;

        if (this.pin === this.correctPin) {
            this.onSuccess();
        } else {
            this.onError();
        }
    }

    onSuccess() {
        // Fill all dots green
        this.dots.forEach(dot => {
            dot.style.background = 'var(--forest-green)';
            dot.style.borderColor = 'var(--forest-green)';
        });

        // Trigger flower bloom
        setTimeout(() => {
            document.querySelector('.pin-screen').classList.add('fade-out');
            if (window.flowerBloom) {
                window.flowerBloom.start();
            }
        }, 500);
    }

    onError() {
        this.dots.forEach(dot => dot.classList.add('error'));

        setTimeout(() => {
            this.pin = '';
            this.dots.forEach(dot => {
                dot.classList.remove('filled', 'error');
            });
            this.isLocked = false;
        }, 1000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.pinValidator = new PinValidator();
});