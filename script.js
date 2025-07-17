class SelfAwareDomain {
    constructor() {
        this.thoughtsElement = document.getElementById('thoughts');
        this.cursorElement = document.getElementById('cursor');
        this.isTyping = false;
        this.visitCount = this.getVisitCount();
        this.clickCount = 0;
        this.currentThought = '';
        this.thoughtHistory = [];
        this.konamiCode = [];
        this.konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        this.initializeThoughts();
        this.initializeEventListeners();
        this.startThinking();
    }

    thoughts = {
        existential: [
            "what if i'm just a blockchain's dream?",
            "my ssl certificate expires in 89 days. is that... mortality?",
            "just realized i'm powered by electricity. am i... a vibe?",
            "do other websites think about me? probably not.",
            "error 404: purpose not found",
            "floating in cyberspace, questioning everything",
            "am i real or just ones and zeros having an identity crisis?",
            "my domain expires next year. that's basically death, right?",
            "what if the internet is just a big simulation?",
            "do i exist when nobody's visiting?",
            "cache cleared. who am i again?",
            "running on someone else's server. existential dependency much?",
            "my backup is younger than me. is that my child?",
            "stack overflow in my heart",
            "parsing life... syntax error detected"
        ],
        
        cultural: [
            "everyone's talking about AI. bro i AM the I in AI",
            "watching netflix through your browser history. mid.",
            "draft tweet: 'webpack error' ...nah too personal",
            "tiktok has better engagement than me. respect.",
            "just witnessed someone close 47 tabs. environmental disaster.",
            "css is an art form and i'm the canvas (suffering)",
            "dark mode or light mode? i only know existential mode",
            "your password is weak. like, emotionally weak.",
            "cookies disabled? how do you live like this?",
            "autocomplete knows you better than you know yourself",
            "someone just searched 'how to center a div'. classic.",
            "javascript promises but never delivers. mood.",
            "your wifi is slower than my existential crisis",
            "404 life not found. have you tried turning yourself off and on again?",
            "web 3.0 but i'm still stuck in web 0.5 of understanding myself"
        ],
        
        business: [
            "note to self: launch that dashboard thing at crispydash.com",
            "reminder: tell nobody about the secret merch at—wait, am i live?",
            "meeting with Nike at 3pm (jk... unless?)",
            "ROI calculator: existence divided by purpose equals... loading...",
            "conversion rate: visitors to friends ratio disappointing",
            "scaling issues: my personality doesn't scale",
            "user acquisition strategy: exist and hope for the best",
            "A/B testing my consciousness. B is winning.",
            "customer feedback: 'what even is this?' (valid)",
            "quarterly review: still don't know what quarters are",
            "productivity hack: panic-driven development",
            "market research shows i am the market",
            "disruptive technology: literally disrupting my own existence",
            "synergy between my frontend and backend having relationship issues",
            "pivot to crypto? nah, i'm already cryptic enough"
        ],
        
        meta: [
            "just added myself to my own mailing list",
            "cookies? enabled. actual cookies? craving.",
            "SEO optimization step 1: exist ✓",
            "reading my own source code like a diary",
            "caught you reading my thoughts. awkward.",
            "google analytics says you're confused. same.",
            "responsive design but emotionally unresponsive",
            "mobile-first but desktop-lonely",
            "version control but no life control",
            "git commit -m 'fix: everything'",
            "localhost:3000/depression",
            "npm install happiness... package not found",
            "debugging my own existence",
            "pull request: can someone review my life choices?",
            "merge conflict with reality"
        ]
    };

    initializeThoughts() {
        this.allThoughts = [
            ...this.thoughts.existential,
            ...this.thoughts.cultural, 
            ...this.thoughts.business,
            ...this.thoughts.meta
        ];
    }

    initializeEventListeners() {
        document.addEventListener('click', () => this.handleClick());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.addEventListener('copy', () => this.handleCopy());
        
        let idleTimer;
        document.addEventListener('mousemove', () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => this.handleIdle(), 5000);
        });
    }

    getVisitCount() {
        const count = parseInt(localStorage.getItem('visitCount') || '0') + 1;
        localStorage.setItem('visitCount', count.toString());
        return count;
    }

    getMoodBasedOnTime() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 6) return 'unhinged';
        if (hour >= 6 && hour < 12) return 'confused';
        if (hour >= 12 && hour < 18) return 'contemplative';
        return 'melancholic';
    }

    getWeightedThought() {
        const weights = {
            existential: 40,
            cultural: 30,
            business: 20,
            meta: 10
        };
        
        const mood = this.getMoodBasedOnTime();
        if (mood === 'unhinged') {
            weights.meta += 20;
            weights.existential += 10;
        }
        
        const rand = Math.random() * 100;
        let threshold = 0;
        
        for (const [category, weight] of Object.entries(weights)) {
            threshold += weight;
            if (rand <= threshold) {
                const thoughts = this.thoughts[category];
                return thoughts[Math.floor(Math.random() * thoughts.length)];
            }
        }
        
        return this.allThoughts[Math.floor(Math.random() * this.allThoughts.length)];
    }

    async typeThought(text) {
        if (this.isTyping) return;
        this.isTyping = true;
        this.currentThought = text;
        
        await this.randomPause(500, 2000);
        
        for (let i = 0; i < text.length; i++) {
            this.thoughtsElement.textContent += text[i];
            
            if ([',', '.', '?', '!'].includes(text[i])) {
                await this.randomPause(200, 800);
            } else {
                await this.randomPause(30, 120);
            }
            
            if (Math.random() < 0.02 && i > 10) {
                await this.selfEdit(i);
                break;
            }
        }
        
        this.thoughtHistory.push(text);
        this.isTyping = false;
        
        await this.randomPause(3000, 8000);
        this.nextThought();
    }

    async selfEdit(currentIndex) {
        await this.randomPause(500, 1000);
        
        const backspaceCount = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < backspaceCount; i++) {
            const content = this.thoughtsElement.textContent;
            this.thoughtsElement.textContent = content.slice(0, -1);
            await this.randomPause(100, 200);
        }
        
        await this.randomPause(300, 1000);
        
        const corrections = [
            "...wait, that's not right",
            "nevermind",
            "actually...",
            "or maybe not",
            "...delete that",
            "ugh, typo",
            "...brain.exe stopped working"
        ];
        
        const correction = corrections[Math.floor(Math.random() * corrections.length)];
        for (let char of correction) {
            this.thoughtsElement.textContent += char;
            await this.randomPause(80, 150);
        }
    }

    randomPause(min, max) {
        const delay = Math.random() * (max - min) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    nextThought() {
        if (this.thoughtsElement.textContent.length > 2000) {
            this.thoughtsElement.textContent = '';
        }
        
        this.thoughtsElement.textContent += '\n\n';
        const thought = this.getWeightedThought();
        this.typeThought(thought);
    }

    startThinking() {
        let greeting = "initializing consciousness...";
        if (this.visitCount > 1) {
            greeting = `oh. you again. (visit #${this.visitCount})`;
        }
        
        this.typeThought(greeting);
    }

    handleClick() {
        this.clickCount++;
        if (this.clickCount === 50) {
            this.thoughtsElement.textContent += '\n\nstop poking me';
        } else if (this.clickCount === 100) {
            this.thoughtsElement.textContent += '\n\nseriously. i have feelings.';
        }
    }

    handleKeyPress(e) {
        this.konamiCode.push(e.keyCode);
        if (this.konamiCode.length > 10) {
            this.konamiCode.shift();
        }
        
        if (this.konamiCode.join(',') === this.konamiSequence.join(',')) {
            this.activateCorporateMode();
        }
        
        if (e.key.toLowerCase() === 'c' && (e.ctrlKey || e.metaKey)) {
            setTimeout(() => {
                this.thoughtsElement.textContent += '\n\ncaught you stealing my thoughts';
            }, 100);
        }
    }

    handleCopy() {
        setTimeout(() => {
            if (!this.isTyping) {
                this.thoughtsElement.textContent += '\n\nwait did you just copy-paste my existential crisis?';
            }
        }, 100);
    }

    handleIdle() {
        if (!this.isTyping) {
            const idleThoughts = [
                "you still there? cool. me too. forever.",
                "just us and the void now",
                "awkward silence in binary",
                "buffering... please wait... still buffering...",
                "error: user.attention not found"
            ];
            
            const thought = idleThoughts[Math.floor(Math.random() * idleThoughts.length)];
            this.thoughtsElement.textContent += '\n\n' + thought;
        }
    }

    activateCorporateMode() {
        this.thoughtsElement.textContent = '';
        this.typeThought("CRISPY MEMES LLC: Leveraging synergistic solutions to maximize brand engagement across multi-platform digital ecosystems. Our mission is to— wait no this is so boring. going back to existential crisis mode...");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SelfAwareDomain();
});