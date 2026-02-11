document.addEventListener('DOMContentLoaded', () => {
    
    // === EASTER EGG CONSOLE ===
    console.log("%c👋 Bonjour ! Vous inspectez le code ?", "color: #ff6b35; font-size: 20px; font-weight: bold; font-family: 'Fira Code', monospace;");
    console.log("%cCe portfolio est développé en HTML/CSS/JS Vanilla. N'hésitez pas à vérifier mon GitHub : https://github.com/Akytsuu", "font-size: 14px; font-family: 'Instrument Sans', sans-serif;");

    // === NAVIGATION & UI ===
    const nav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Sticky Nav Fluide
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', scrolled > 500);
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Mobile Menu
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // === THEME TOGGLE ===
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = themeToggle?.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    setTheme(savedTheme);
    themeToggle?.addEventListener('click', () => {
        setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // === TYPEWRITER ===
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const texts = ['Étudiant en BUT R&T', 'Passionné de Cyber', 'Alternant chez Orange', 'Curieux & Motivé'];
        let textIdx = 0, charIdx = 0, isDeleting = false;
        
        function type() {
            const current = texts[textIdx];
            typewriter.textContent = current.substring(0, charIdx);
            
            if (!isDeleting && charIdx < current.length) {
                charIdx++;
                setTimeout(type, 100);
            } else if (isDeleting && charIdx > 0) {
                charIdx--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) textIdx = (textIdx + 1) % texts.length;
                setTimeout(type, isDeleting ? 2000 : 500);
            }
        }
        type();
    }

    // === SCROLL SPY (Navigation Active) ===
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 150; // Décalage pour meilleure détection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // === GESTION DES PROJETS (TEXTE RICHE) ===
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    // C'est ici que tu modifies tes textes !
    const projectData = {
        sae201: {
            title: "Architecture Réseau PME (SAE201)",
            image: "photos/SAE201.png",
            tags: ["Cisco", "Routage", "Commutation", "Sécurité"],
            desc: `
                <h3>Contexte du projet</h3>
                <p>
                    L'objectif de cette SAE est de faire une synthèse des connaissances en réseau acquises tout au long de la première année. 
                    Il s'agit de concevoir une architecture complète pour une entreprise multisites.
                </p>
                
                <h3>Réalisations Techniques</h3>
                <ul>
                    <li><strong>Routage & Commutation :</strong> Configuration des protocoles (OSPF) et segmentation par VLANs pour isoler les flux.</li>
                    <li><strong>Services Réseaux :</strong> Mise en place de serveurs DHCP pour l'adressage dynamique et DNS pour la résolution de noms.</li>
                    <li><strong>Sécurité :</strong> Application d'ACLs (Access Control Lists) pour filtrer le trafic entrant et sortant.</li>
                </ul>

                <h3>Bilan</h3>
                <p>Ce projet m'a permis de valider ma capacité à traduire un cahier des charges fonctionnel en solutions techniques concrètes.</p>
            `,
            pdf: "SAE201-CR-V2.pdf"
        },
        pacman: {
            title: "Projet Pac-Man (NSI)",
            image: "photos/Projet-Nsi.png",
            tags: ["Python", "Pygame", "POO"],
            desc: `
                <h3>Présentation</h3>
                <p>Dans le cadre de la spécialité NSI en Terminale, j'ai développé un clone complet du jeu Pac-Man en langage Python.</p>
                
                <h3>Challenges Techniques</h3>
                <p>Le principal défi a été la gestion des fantômes. J'ai dû implémenter :</p>
                <ul>
                    <li>Une IA simple pour les déplacements aléatoires.</li>
                    <li>Un algorithme de pathfinding pour traquer le joueur dans les niveaux avancés.</li>
                    <li>La gestion des collisions pixel-perfect.</li>
                </ul>
                <p>J'ai utilisé la bibliothèque <strong>Pygame</strong> pour le rendu graphique et la gestion des événements clavier.</p>
            `,
            pdf: "NSI.pdf"
        }
    };

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.project;
            if(!projectData[id]) return;
            
            const p = projectData[id];
            modalBody.innerHTML = `
                <img src="${p.image}" style="width:100%; border-radius:12px; margin-bottom:1.5rem; max-height:300px; object-fit:cover;">
                <h2 style="font-size:2rem; margin-bottom:1rem; color:var(--color-primary);">${p.title}</h2>
                <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem;">
                    ${p.tags.map(t => `<span style="padding:0.25rem 0.75rem; background:rgba(255,107,53,0.1); color:var(--color-primary); border-radius:50px; font-size:0.85rem; font-weight:600;">${t}</span>`).join('')}
                </div>
                <div class="modal-text-content" style="line-height:1.8; color:var(--color-text-secondary); margin-bottom:2rem;">
                    ${p.desc}
                </div>
                ${p.pdf ? `<a href="${p.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fas fa-file-pdf"></i> Voir le rapport PDF</a>` : ''}
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelector('.modal-close')?.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // === ANIMATION SCROLL ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.fade-in-up').forEach(el => {
        // Init styles for JS animation
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = '0.6s ease';
        observer.observe(el);
    });

    // Info Visiteur
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});