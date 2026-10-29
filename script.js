/**
 * CYBER SURVEILLANCE INTELLIGENCE (CSI)
 * Official Interactive Scripts & Functional Engine
 * Target Official Email: director_adfi_csi@secretary.net
 * Hotline: +880 1773-729997 | Location: Dhanmondi, Dhaka, Bangladesh
 */

document.addEventListener('DOMContentLoaded', () => {

    // Target Destination Email for All Dispatches
    const OFFICIAL_EMAIL = 'director_adfi_csi@secretary.net';

    /* ===================================================================
       1. UNIVERSAL GMAIL & EMAIL DISPATCH FUNCTION
       Directly launches Gmail Web Compose or native mailto
       =================================================================== */
    function openEmailDispatch({ to = OFFICIAL_EMAIL, subject = '', body = '' }) {
        const encodedTo = encodeURIComponent(to);
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);

        // Direct Gmail Compose Web URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;

        // Standard Mailto Fallback
        const mailtoUrl = `mailto:${encodedTo}?subject=${encodedSubject}&body=${encodedBody}`;

        // Try opening Gmail Web Compose in a new browser tab
        const win = window.open(gmailUrl, '_blank');

        // If a popup blocker stopped the new tab or on mobile devices, fallback smoothly to mailto
        if (!win || win.closed || typeof win.closed === 'undefined') {
            const fallbackLink = document.createElement('a');
            fallbackLink.href = mailtoUrl;
            fallbackLink.target = '_blank';
            document.body.appendChild(fallbackLink);
            fallbackLink.click();
            document.body.removeChild(fallbackLink);
        }
    }

    // Attach click listener to any Gmail action triggers across the site
    document.querySelectorAll('.gmail-action-link, .gmail-direct-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const customSubject = btn.getAttribute('data-subject') || 'Official Inquiry — Cyber Surveillance Intelligence';
            const defaultBody = `Dear Director (Admin & Finance),\n\nI am contacting Cyber Surveillance Intelligence regarding:\n\n[Please enter your message details here]\n\nFull Name:\nOrganization:\nPhone Number:`;
            
            openEmailDispatch({
                to: OFFICIAL_EMAIL,
                subject: customSubject,
                body: defaultBody
            });
        });
    });

    /* ===================================================================
       2. INTERACTIVE CYBER BACKGROUND CANVAS
       =================================================================== */
    const canvas = document.getElementById('cyberCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        let particles = [];
        const particleCount = Math.min(Math.floor(width / 18), 70);
        const connectionDistance = 120;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 1.8 + 1;
                this.color = Math.random() > 0.65 ? 'rgba(202, 162, 77, ' : 'rgba(0, 229, 255, ';
                this.alpha = Math.random() * 0.6 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function renderNetwork() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const lineAlpha = (1 - dist / connectionDistance) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(renderNetwork);
        }

        initParticles();
        renderNetwork();

        window.addEventListener('resize', () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            initParticles();
        });
    }

    /* ===================================================================
       3. STICKY NAVBAR & FULL MOBILE DRAWER ENGINE
       =================================================================== */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navItems = document.querySelectorAll('.nav-item');

    // Sticky shadow and active section indicator on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });

                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Drawer Open / Close Logic
    function toggleMobileMenu() {
        const isOpen = mobileDrawer.classList.contains('active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        if (!mobileDrawer || !menuToggle) return;
        mobileDrawer.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    }

    function closeMobileMenu() {
        if (!mobileDrawer || !menuToggle) return;
        mobileDrawer.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close when any mobile nav link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on clicking outside the drawer
        document.addEventListener('click', (e) => {
            if (mobileDrawer.classList.contains('active') && !mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    /* ===================================================================
       4. SERVICE CARD BUTTONS (Smooth scroll + Auto-select in form)
       =================================================================== */
    const serviceSelect = document.getElementById('serviceType');
    const fullNameInput = document.getElementById('fullName');
    const messageInput = document.getElementById('messageBody');

    function jumpToContactWithService(serviceValue) {
        closeMobileMenu();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }

        if (serviceSelect && serviceValue) {
            serviceSelect.value = serviceValue;
            serviceSelect.classList.add('highlight-flash');
            setTimeout(() => {
                serviceSelect.classList.remove('highlight-flash');
            }, 1600);
        }

        if (fullNameInput) {
            setTimeout(() => fullNameInput.focus(), 600);
        }
    }

    document.querySelectorAll('.service-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const service = btn.getAttribute('data-service-type');
            jumpToContactWithService(service);
        });
    });

    document.querySelectorAll('[data-jump-service]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const service = el.getAttribute('data-jump-service');
            jumpToContactWithService(service);
        });
    });

    // Navigation CTA Button actions
    const navConsultBtn = document.getElementById('navConsultBtn');
    const mobileConsultBtn = document.getElementById('mobileConsultBtn');
    const partnerCsiBtn = document.getElementById('partnerCsiBtn');

    if (navConsultBtn) {
        navConsultBtn.addEventListener('click', (e) => {
            e.preventDefault();
            jumpToContactWithService('investigation');
        });
    }

    if (mobileConsultBtn) {
        mobileConsultBtn.addEventListener('click', (e) => {
            e.preventDefault();
            jumpToContactWithService('investigation');
        });
    }

    if (partnerCsiBtn) {
        partnerCsiBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            if (messageInput) setTimeout(() => messageInput.focus(), 600);
        });
    }

    /* ===================================================================
       5. 3D CARD INTERACTIVE TILT EFFECT (Desktop Only)
       =================================================================== */
    const emblemCard = document.getElementById('emblemCard');
    if (emblemCard && window.innerWidth > 992) {
        const showcaseContainer = emblemCard.parentElement;

        showcaseContainer.addEventListener('mousemove', (e) => {
            const rect = showcaseContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (-y / rect.height) * 16;
            const rotateY = (x / rect.width) * 16;

            emblemCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        showcaseContainer.addEventListener('mouseleave', () => {
            emblemCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    /* ===================================================================
       6. SCROLL REVEAL & STATS COUNTER ANIMATION
       =================================================================== */
    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-scale');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Counter
    const statCards = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        statCards.forEach(card => {
            const targetVal = parseFloat(card.getAttribute('data-target'));
            let current = 0;
            const stepTime = 25;
            const steps = 50;
            const increment = targetVal / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= targetVal) {
                    current = targetVal;
                    clearInterval(timer);
                }

                if (targetVal === 99.98) {
                    card.textContent = current.toFixed(2) + '%';
                } else if (targetVal === 15000) {
                    card.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (targetVal === 24) {
                    card.textContent = '24/7';
                    clearInterval(timer);
                } else if (targetVal === 100) {
                    card.textContent = Math.floor(current) + '%';
                }
            }, stepTime);
        });
    }

    const statsSection = document.querySelector('.hero-stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.2 });
        statsObserver.observe(statsSection);
    }

    /* ===================================================================
       7. LIVE TELEMETRY CLOCK & LOG STREAM SIMULATOR
       =================================================================== */
    const liveClockEl = document.getElementById('liveClock');
    if (liveClockEl) {
        function updateClock() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            liveClockEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC+6`;
        }
        setInterval(updateClock, 1000);
        updateClock();
    }

    // Dynamic Live Incident Logs
    const terminalLogs = document.getElementById('terminalLogs');
    const mockEvents = [
        { type: 'info', tag: '[MONITOR]', msg: 'BGP routing route prefix validation passed for Dhanmondi gateway node.' },
        { type: 'warn', tag: '[DEFENSE]', msg: 'DDoS flood mitigation applied: 48,000 SYN packets redirected to blackhole.' },
        { type: 'success', tag: '[DFIR]', msg: 'Decrypted ransomware memory key parsed successfully; decryption tool compiled.' },
        { type: 'info', tag: '[INTEL]', msg: 'Geospatial sensor node [BD-DH-02] synchronized with threat exchange.' },
        { type: 'warn', tag: '[THREAT]', msg: 'Spear-phishing domain clone intercepted: bank-portal-login[.]xyz blocked.' },
        { type: 'success', tag: '[FORENSIC]', msg: 'Hard drive sector bit-exact clone validated with SHA-512 match.' }
    ];

    if (terminalLogs) {
        setInterval(() => {
            const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
            const now = new Date();
            const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;

            const newRow = document.createElement('div');
            newRow.className = `log-row ${randomEvent.type}`;
            newRow.innerHTML = `<span class="ts">${timeStr}</span> <span class="tag">${randomEvent.tag}</span> ${randomEvent.msg}`;

            terminalLogs.appendChild(newRow);

            if (terminalLogs.children.length > 7) {
                terminalLogs.removeChild(terminalLogs.children[0]);
            }
        }, 5000);
    }

    // Interactive Dashboard Tabs
    const dashNavTabs = document.querySelectorAll('#dashNavTabs li');
    const statSensors = document.getElementById('statSensors');
    const statAttacks = document.getElementById('statAttacks');
    const statArtifacts = document.getElementById('statArtifacts');

    dashNavTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dashNavTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabKey = tab.getAttribute('data-tab');

            if (tabKey === 'feed') {
                if (statSensors) statSensors.textContent = '4,892 ACTIVE';
                if (statAttacks) statAttacks.textContent = '94,210 TODAY';
                if (statArtifacts) statArtifacts.textContent = '100% INTACT';
            } else if (tabKey === 'zeroday') {
                if (statSensors) statSensors.textContent = '14 CVE TRACKED';
                if (statAttacks) statAttacks.textContent = '0 BREACHES';
                if (statArtifacts) statArtifacts.textContent = '99.9% MITIGATED';
            } else if (tabKey === 'sandbox') {
                if (statSensors) statSensors.textContent = '8 ISOLATED VM';
                if (statAttacks) statAttacks.textContent = '22 PAYLOADS';
                if (statArtifacts) statArtifacts.textContent = 'DISASSEMBLED';
            } else if (tabKey === 'vault') {
                if (statSensors) statSensors.textContent = '1,240 DOSSIERS';
                if (statAttacks) statAttacks.textContent = 'ENCRYPTED';
                if (statArtifacts) statArtifacts.textContent = 'SHA-512 SEALED';
            }
        });
    });

    /* ===================================================================
       8. EMERGENCY INCIDENT REPORT MODAL (Direct to Email)
       =================================================================== */
    const incidentModal = document.getElementById('incidentModal');
    const emergencyReportBtn = document.getElementById('emergencyReportBtn');
    const mobileEmergencyBtn = document.getElementById('mobileEmergencyBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const emergencyReportForm = document.getElementById('emergencyReportForm');

    function openModal() {
        closeMobileMenu();
        if (incidentModal) incidentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (incidentModal) incidentModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (emergencyReportBtn) emergencyReportBtn.addEventListener('click', openModal);
    if (mobileEmergencyBtn) mobileEmergencyBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (incidentModal) {
        incidentModal.addEventListener('click', (e) => {
            if (e.target === incidentModal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && incidentModal && incidentModal.classList.contains('active')) {
            closeModal();
        }
    });

    if (emergencyReportForm) {
        emergencyReportForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const incidentNature = document.getElementById('incidentNatureSelect').value;
            const incidentPhone = document.getElementById('incidentPhoneInput').value;
            const incidentEmail = document.getElementById('incidentEmailInput').value;
            const incidentDesc = document.getElementById('incidentDescInput').value;

            const emailSubject = `[CRITICAL EMERGENCY] Cyber Incident Report — ${incidentNature}`;
            const emailBody = `ATTN: DIRECTORATE OF ADMIN & FINANCE
CYBER SURVEILLANCE INTELLIGENCE (CSI)
EMERGENCY CYBER INCIDENT REPORT
======================================================

INCIDENT CLASSIFICATION: ${incidentNature}
PRIORITY: HIGH-SEVERITY EMERGENCY (15-MIN PROTOCOL)

CONTACT DETAILS:
- Phone / Signal: ${incidentPhone}
- Reporter Email: ${incidentEmail}
- Location of Incident: Bangladesh / Global Network

INCIDENT SUMMARY & INDICATORS:
${incidentDesc}

======================================================
NOTICE: Please retain all RAM state and infected drive images for forensic analysis.
Dispatched via Cyber Surveillance Intelligence Emergency Console.`;

            const submitBtn = document.getElementById('emergencySubmitBtn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Launching Gmail Dispatch...';
            submitBtn.disabled = true;

            setTimeout(() => {
                openEmailDispatch({
                    to: OFFICIAL_EMAIL,
                    subject: emailSubject,
                    body: emailBody
                });

                alert(`🚨 EMERGENCY REPORT GENERATED:\nOpening Gmail addressed to ${OFFICIAL_EMAIL}.\nClick 'Send' in your Gmail window to instantly dispatch the report to the on-duty directorate.`);

                emergencyReportForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                closeModal();
            }, 800);
        });
    }

    /* ===================================================================
       9. CONTACT FORM TRANSMISSION (Direct to director_adfi_csi@secretary.net)
       =================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatusMsg = document.getElementById('formStatusMsg');
    const submitFormBtn = document.getElementById('submitFormBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const emailAddr = document.getElementById('emailAddr').value;
            const orgName = document.getElementById('orgName').value || 'Confidential Enterprise / Private Client';
            const serviceType = document.getElementById('serviceType').value;
            const priority = document.querySelector('input[name="priority"]:checked')?.value || 'Standard Inquiry';
            const messageBody = document.getElementById('messageBody').value;

            const emailSubject = `[CSI CASE DISPATCH] ${serviceType.toUpperCase()} — from ${fullName}`;
            const emailBody = `ATTN: MD. ABU JAKARIYA, DIRECTOR (ADMIN & FINANCE)
CYBER SURVEILLANCE INTELLIGENCE (CSI)
COMMAND & CONTROL CENTER, DHANMONDI, DHAKA
======================================================

CASE CONSULTATION & INQUIRY DETAILS:
- Client Name: ${fullName}
- Contact Email: ${emailAddr}
- Organization / Agency: ${orgName}
- Service Required: ${serviceType.toUpperCase()}
- Priority Classification: ${priority}
- Non-Disclosure Agreement (M-NDA): Required

SCOPE OF INVESTIGATION / THREAT SUMMARY:
${messageBody}

======================================================
Dispatched securely via Cyber Surveillance Intelligence Official Web Portal
Target Official Email: ${OFFICIAL_EMAIL}`;

            const originalBtnHtml = submitFormBtn.innerHTML;
            submitFormBtn.innerHTML = '<i class="fa-solid fa-lock fa-spin"></i> Launching Gmail Dispatch to ' + OFFICIAL_EMAIL + '...';
            submitFormBtn.disabled = true;

            setTimeout(() => {
                openEmailDispatch({
                    to: OFFICIAL_EMAIL,
                    subject: emailSubject,
                    body: emailBody
                });

                submitFormBtn.innerHTML = originalBtnHtml;
                submitFormBtn.disabled = false;

                if (formStatusMsg) {
                    formStatusMsg.className = 'form-status success';
                    formStatusMsg.innerHTML = `<i class="fa-solid fa-shield-check"></i> <strong>Gmail Opened!</strong> Your message has been prepared for <strong>${OFFICIAL_EMAIL}</strong>. Simply click "Send" in Gmail to deliver your dispatch.`;
                    contactForm.reset();

                    setTimeout(() => {
                        formStatusMsg.style.display = 'none';
                        formStatusMsg.className = 'form-status';
                    }, 12000);
                }
            }, 800);
        });
    }

    /* ===================================================================
       10. BACK TO TOP BUTTON
       =================================================================== */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 450) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
