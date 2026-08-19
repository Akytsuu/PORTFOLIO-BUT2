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

  
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    const projectData = {
        // NOUVEAU : Bloc Alternance Orange avec les compétences du B.U.T
        orange: {
            title: "Missions & Compétences - Alternance Orange",
            image: "photos/orangelogo.png", // Image par défaut pour la modale
            tags: ["Fibre FTTH", "Réseau Cuivre", "Analyse", "BUT2"],
            desc: `
                <p style="margin-bottom: 1rem;">Lors de ma première année d'alternance à la Direction Intervention Centre-Val de Loire d'Orange (équipe E GP 37), mon objectif quotidien est d'assurer le déploiement et la maintenance des réseaux cuivre et fibre optique pour une clientèle grand public et entreprise.</p>
                
                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Mes réalisations techniques :</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 1.6;">
                    <li><strong>Déploiement et configuration :</strong> Raccordement fibre et installation de routeurs pour des clients professionnels (ex: agence MAAF), incluant la préparation de la Prise Terminale Optique (PTO), la réalisation de soudures optiques et la configuration via l'application interne <em>Visibility</em>.</li>
                    <li><strong>Diagnostic et Dépannage FTTH :</strong> Utilisation d'appareils de mesure de précision (réflectomètre OTDR, photomètre OLP) pour caractériser les liaisons optiques, analyser les courbes d'atténuation, localiser précisément les coupures et effectuer les réparations matérielles (raccordement en portefeuille).</li>
                    <li><strong>Veille technologique :</strong> Analyse critique de l'intelligence artificielle interne d'Orange (Dinootoo AI) et présentation de ses capacités et limites techniques à mon équipe lors d'une réunion mensuelle.</li>
                </ul>

                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Lien avec le référentiel du B.U.T R&T :</h3>
                <p style="margin-bottom: 1rem;">Si je dois faire un lien avec le référentiel de mon B.U.T R&T (parcours Cybersécurité), je dirais que j'ai pu approfondir et valider les compétences suivantes :</p>
                
                <p style="margin-bottom: 1rem;"><strong>Connecter :</strong> La <strong>CE2.02</strong> ("en faisant preuve d'une démarche scientifique") s'illustre lors de mes diagnostics complexes sur le réseau FTTH, où je dois déduire l'emplacement d'une panne à partir de courbes réflectométriques (OTDR). Ces interventions m'ont permis de développer l'<strong>AC22.01</strong> ("Déployer et caractériser des systèmes de transmissions complexes") et l'<strong>AC22.04</strong> ("Déployer des réseaux d'accès des opérateurs"). Cela est justifié concrètement par les interventions de production que j'ai pu mené tout au long de l'année. Par ailleurs, la <strong>CE2.01</strong> ("en communiquant avec le client et les différents acteurs impliqués") est mobilisée quotidiennement pour adapter mon discours technique face aux abonnés lors des dépannages.</p>

                <p style="margin-bottom: 1.5rem;"><strong>Administrer :</strong> L'installation d'équipements pour les professionnels m'a permis de valider l'<strong>AC21.04</strong> ("Déployer des services réseaux avancés") et l'<strong>AC21.05</strong> ("Identifier les réseaux opérateurs et l'architecture d'internet"). Enfin, la <strong>CE1.05</strong> ("en assurant une veille technologique") a été démontrée par ma présentation de l'IA Dinootoo à mes collègues. Cette présentation inclus aussi l'<strong>AC21.06</strong> ("Travailler en équipe pour développer ses compétences professionnelles").</p>

                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Bilan :</h3>
                <p style="margin-bottom: 1.5rem;">Si la constitution de cette section du portfolio relève d'une expérience en entreprise, l'exercice d'analyse et de prise de recul s'inscrit parfaitement dans les attentes de la formation. J'ai pu identifier mes réussites  mais aussi mes axes de progression pour ma deuxième année : approfondir mes compétences sur les technologies Cuivre (xDSL), renforcer mes capacités sur le réseau fibre ainsi que l'amélioration des compétences de communication</p>
            `,
            pdf: "Rapport S4.pdf"
        },
        sae201: {
            title: "Architecture Réseau PME (SAE 201)",
            image: "photos/SAE201.png",
            tags: ["Cisco", "Routage & VLANs", "Services & DMZ", "Sécurité"],
            desc: `
                <p style="margin-bottom: 1rem;">L'objectif de cette SAE était de concevoir, déployer et sécuriser l'architecture réseau complète d'une petite entreprise multisites sur Cisco Packet Tracer, en intégrant des services fondamentaux et une connexion à un Fournisseur d'Accès Internet (FAI).</p>
                
                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Mes réalisations techniques :</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 1.6;">
                    <li><strong>Architecture et Commutation :</strong> Mise en place d'une topologie redondante avec segmentation en 8 VLANs par service (Direction, R&D, Accueil, etc.) et adressage optimisé en IPv4 (VLSM) et IPv6.</li>
                    <li><strong>Services Réseaux :</strong> Déploiement et configuration de serveurs internes (DHCPv4/v6, DNS, Mail SMTP/POP3, serveur Web Intranet codé en HTML/CSS).</li>
                    <li><strong>Routage et Interconnexion :</strong> Configuration du routage inter-VLAN (sous-interfaces), de routes statiques et de la traduction d'adresses (NAT/PAT) pour l'accès Internet via la liaison fibre du FAI.</li>
                    <li><strong>Sécurisation de l'infrastructure :</strong> Création d'une DMZ pour les services publics (Web/DNS public), restriction des flux par listes de contrôle d'accès (ACLs) et sécurisation des équipements via SSH (clés RSA 4096 bits, VLAN de management dédié).</li>
                </ul>

                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Lien avec le référentiel du B.U.T R&T :</h3>
                <p style="margin-bottom: 1rem;">Si je dois faire un lien avec le référentiel, ce projet m'a permis de valider concrètement les compétences suivantes :</p>
                
                <p style="margin-bottom: 1rem;"><strong>Administrer :</strong> La conception de l'adressage (VLSM) et la segmentation du trafic m'ont permis de valider l'<strong>AC11.03</strong> ("Configurer les fonctions de base du réseau local"). Le déploiement des serveurs privés (DHCP, DNS, Mail, Intranet) et la configuration du routeur de bordure (NAT/PAT, routage inter-VLAN) justifient pleinement l'acquisition de l'<strong>AC21.04</strong> ("Déployer des services réseaux avancés"). Ces éléments sont documentés pas à pas dans mon compte-rendu (Figures 12 à 25).</p>

                <p style="margin-bottom: 1.5rem;"><strong>Sécuriser :</strong> Le durcissement des équipements d'interconnexion correspond à la <strong>CE4.01</strong> ("en visant un juste compromis entre exigences de sécurité et contraintes d'utilisation"). J'ai pu valider l'<strong>AC24.02Cyber</strong> ("Mettre en œuvre les outils fondamentaux de sécurisation d'une infrastructure du réseau") et l'<strong>AC24.03Cyber</strong> ("Sécuriser les services") en créant un VLAN de management isolé, en imposant des accès SSH chiffrés sur les lignes VTY et en déployant des ACLs de contrôle de flux pour protéger le réseau LAN (Figures 57 et 63).</p>

                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Bilan :</h3>
                <p style="margin-bottom: 1.5rem;">Cette SAE a été un excellent moyen de synthétiser les concepts théoriques pour construire un réseau de A à Z. Définir le cahier des charges, configurer les équipements en CLI, et élaborer une méthode de test rigoureuse pour prouver le bon fonctionnement de chaque service m'a donné une vision globale et très concrète des missions d'un administrateur réseaux et sécurité.</p>
            `,
            pdf: "SAE201-CR-RIGALLAUD.pdf"
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
        },
        sae204: {
            title: "Projet Intégratif : La nocivité des ondes électromagnétiques liées aux smartphones(SAE 204)",
            image: "photos/ondes.png", 
            tags: ["Recherche Scientifique", "Normes & DAS", "Santé Publique", "Communication"],
            desc: `
                <p style="margin-bottom: 1rem;">L’objectif de cette SAE était de mettre en pratique nos compétences de recherche, d’analyse et de communication en menant une étude bibliographique approfondie sur la nocivité potentielle des ondes électromagnétiques liées à l’usage des smartphones.</p>
                
                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Mes réalisations et contributions :</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 1.6;">
                    <li><strong>Recherche documentaire rigoureuse :</strong> Analyse de sources académiques, techniques et institutionnelles (OMS, ANFR, ANSES) en français et en anglais.</li>
                    <li><strong>Analyse critique et sanitaire :</strong> Synthèse des différentes positions scientifiques autour des effets biologiques des radiofréquences et des limites des études actuelles. J'ai particulièrement pris en charge l'analyse des impacts sanitaires potentiels.</li>
                    <li><strong>Étude normative :</strong> Synthèse des normes en vigueur, notamment le Débit d'Absorption Spécifique (DAS), et des perspectives technologiques d'atténuation.</li>
                    <li><strong>Communication professionnelle :</strong> Mise en forme d'un rapport structuré de 30 pages et conception d'un diaporama pour une soutenance orale face à un jury.</li>
                </ul>

                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Lien avec le référentiel du B.U.T R&T :</h3>
                <p style="margin-bottom: 1rem;">Si je dois faire un lien avec le référentiel de mon B.U.T R&T, ce projet m'a permis d'approfondir les compétences suivantes :</p>
                
                <p style="margin-bottom: 1rem;"><strong>Connecter :</strong> La recherche d'informations contradictoires et l'analyse des impacts environnementaux et sanitaires m'ont demandé d'appliquer la <strong>CE2.02</strong> ("en faisant preuve d'une démarche scientifique") et la <strong>CE2.04</strong> ("en proposant des solutions respectueuses de l'environnement"). L'étude théorique des différentes fréquences, des ondes radio aux bandes millimétriques de la 5G (illustrée par la Figure 4 de mon rapport), a renforcé ma compréhension théorique nécessaire à l'<strong>AC22.01</strong> ("Déployer et caractériser des systèmes de transmissions complexes").</p>

                <p style="margin-bottom: 1.5rem;"><strong>Sécuriser (et Normes) :</strong> L'analyse approfondie de la réglementation européenne 1999/519/CE et des limites d'exposition au DAS (détaillée dans la Figure 9 de notre rapport) fait directement appel à la <strong>CE4.02</strong> ("en respectant les normes et le cadre juridique").</p>

                <h3 style="margin-top: 1.5rem; color: var(--color-primary);">Bilan :</h3>
                <p style="margin-bottom: 1.5rem;">Ce projet a été particulièrement enrichissant car il m'a permis de développer mes capacités d'organisation de l'information et d'esprit de synthèse. Rédiger un rapport complet de 30 pages et le vulgariser en 10 minutes à l'oral m'a exercé à la communication claire sur un sujet extrêmement complexe, mêlant technologie de pointe, santé publique et responsabilité sociétale.</p>
            `,
            pdf: "SAE204-RAPPORT-FINAL.pdf"
        },
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
