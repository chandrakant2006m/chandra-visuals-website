/* ==========================================================================
   CHANDRA VISUALS - MASTER JAVASCRIPT LOGIC (WRD v1.0 Single-Page App)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initHeroCanvas();
  initScrollAnimations();
  initPortfolioFilter();
  initModals();
  initEstimator();
  initFAQ();
  initContactForm();
});

/* 1. Preloader Dismissal */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.style.display = 'none', 500);
      }, 400);
    });
  }
}

/* 2. Navbar Sticky & Active Section Tracking */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 3. Mobile Navigation Drawer */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  const openDrawer = () => drawer?.classList.add('active');
  const closeDrawer = () => drawer?.classList.remove('active');

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
}

/* 4. Ambient Hero Canvas Particle Backdrop */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.5 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.4 + 0.1
  }));

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 90, 0, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* 5. Scroll Reveal Observer */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.why-card, .service-card, .portfolio-card, .tech-card, .step-card, .trust-card').forEach(el => {
    observer.observe(el);
  });
}

/* 6. Portfolio Category Filter */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

/* 7. Modals (Case Studies & Service Details) */
const caseStudyData = {
  'brand-identity': {
    title: 'Aetheria - AI Brand Identity Concept',
    type: 'Internal Brand Exploration',
    tools: 'Illustrator, Figma, Midjourney v6',
    overview: 'Complete visual identity exploration for an autonomous AI research lab, balancing clinical precision with organic warmth.',
    challenge: 'Translating complex neural architecture concepts into an approachable human-centric brand ecosystem.',
    strategy: 'Build brand trust through minimalism, structured typography, and humanistic color palettes.',
    process: 'Generative prompt exploration → Vector refinement in Illustrator → Design system building in Figma → 3D stationery render.',
    deliverables: ['Brand Guidelines', 'Logo Suite', 'Typography Hierarchy', '3D Asset Library', 'Social Media Kit'],
    lessons: 'AI ideation reduced initial moodboarding time by 70%, allowing 3x more time for vector grid perfection.'
  },
  'ui-ux': {
    title: 'PulseOS - SaaS Dashboard UI Concept',
    type: 'UI/UX Concept & Design System',
    tools: 'Figma, HTML5, CSS3',
    overview: 'High-density telemetry dashboard designed for devops teams monitoring AI model inference latency.',
    challenge: 'Displaying high-frequency real-time metrics without causing visual fatigue or cognitive overload.',
    strategy: 'Component-driven layout with custom color-coded micro-indicators and collapsible widget columns.',
    process: 'Wireframing → User flow mapping → Design system creation → High-fidelity prototype & micro-animations.',
    deliverables: ['Figma UI Library', 'Design Tokens', 'Interactive Prototype', 'React Component Spec'],
    lessons: 'Strict grid alignment and semantic token naming accelerated developer handoff.'
  },
  'motion-vfx': {
    title: 'Quantum Prisms - 3D Motion Experiment',
    type: 'Motion Graphics & VFX Experiment',
    tools: 'Blender, After Effects, Runway Gen-2',
    overview: 'Exploration of refractive glass physics and liquid metallic shaders in zero gravity.',
    challenge: 'Achieving photorealistic light dispersion in 3D while maintaining fast rendering timelines.',
    strategy: 'Combine Cycles path tracing for hero frames with AI frame-interpolation for ultra-smooth 60fps output.',
    process: 'Physics simulation in Blender → Shader node graph setup → AI frame interpolation → Color grading in AE.',
    deliverables: ['4K Video Loop', 'High-Res Hero Stills', 'Alpha Channel Asset Pack'],
    lessons: 'Hybrid rendering using AI frame generation cut total render farm compute time by half.'
  },
  'cgi-archviz': {
    title: 'Horizon One - High-Tech Product CGI',
    type: '3D CGI Visualization',
    tools: 'Cinema 4D, Octane Render, Photoshop',
    overview: 'Studio product render showcasing a flagship acoustic headphone design under warm studio lighting.',
    challenge: 'Capturing tactile material properties like brushed aluminum, soft leather, and gold accents.',
    strategy: 'Single-pedestal focal framing with subtle soft-box reflections and warm accent glows.',
    process: 'High-poly 3D modeling → Texture map painting → Studio lighting setup → Post-processing camera raw.',
    deliverables: ['8K Marketing Images', '360 Interactive Viewer Assets', 'E-commerce Cutouts'],
    lessons: 'Sub-surface scattering settings were crucial for realistic ear-pad leather translucency.'
  }
};

const serviceData = {
  'graphic-design': {
    title: 'Graphic Design Services',
    desc: 'Impactful visual collateral engineered for digital platforms, print media, and modern marketing campaigns.',
    benefits: ['Brand Consistency Across Touchpoints', 'High-Converting Visual Hierarchy', 'Ready for Digital & Commercial Print'],
    deliverables: ['Marketing Banners & Ad Creatives', 'Pitch Decks & Presentations', 'Packaging & Print Materials', 'Vector Graphics & Icons']
  },
  'brand-identity': {
    title: 'Brand Identity & Strategy',
    desc: 'End-to-end branding ecosystems including logos, typography, visual guidelines, and brand positioning.',
    benefits: ['Distinct Positioning in Crowded Markets', 'Comprehensive Brand Style Guide', 'Scalable Asset System'],
    deliverables: ['Primary & Secondary Logo Suite', 'Color Palette & Typography System', 'Brand Book PDF', 'Social Media Templates']
  },
  'web-development': {
    title: 'Modern Web Development',
    desc: 'High-performance, responsive websites built with clean code, lightning-fast load times, and SEO best practices.',
    benefits: ['Lighthouse 95+ Performance Scores', 'Mobile-First Responsive Layouts', 'SEO & Core Web Vitals Optimized'],
    deliverables: ['Custom Front-End Code', 'CMS or Static Build', 'SEO Meta Setup', 'Performance Audit']
  },
  'ui-ux': {
    title: 'UI/UX Interface Design',
    desc: 'User-centered digital product interfaces, dashboard systems, and web applications built for intuitive usability.',
    benefits: ['Reduced User Churn & Friction', 'High-Density Clear Dashboards', 'Complete Figma Component Library'],
    deliverables: ['User Flow Maps', 'Wireframes & Interactive Prototypes', 'Design Tokens & UI Kit', 'Developer Handoff Spec']
  },
  'motion-graphics': {
    title: 'Motion Graphics & Animation',
    desc: 'Engaging animated logos, explainer graphics, UI transitions, and promotional video motion visuals.',
    benefits: ['Higher Engagement on Social Media', 'Clear Visual Storytelling', 'High Frame-Rate Smooth Animation'],
    deliverables: ['Logo Animations', '2D/3D Explainer Videos', 'Lottie JSON Animations for Web', 'Social Video Ads']
  },
  'video-editing': {
    title: 'Professional Video Editing',
    desc: 'Precision video post-production, commercial cuts, sound design, audio enhancement, and cinematic color grading.',
    benefits: ['Cinematic Pacing & Storytelling', 'Professional Color Grading (LUTs)', 'Audio Noise Reduction & Mixing'],
    deliverables: ['Commercial Cuts (16:9 & 9:16)', 'Social Reels & Shorts', 'Audio Enhancement', 'Title Cards & Subtitles']
  },
  '3d-animation': {
    title: '3D Animation & Rendering',
    desc: 'Captivating 3D character, product, and abstract animations designed for immersive visual storytelling.',
    benefits: ['Photorealistic Material Lighting', 'High-Impact Product Visuals', 'Complex Physics Simulations'],
    deliverables: ['3D Product Animations', 'Abstract Motion Clips', 'High-Poly Render Stills', 'Turnable 360 Sequences']
  },
  'cgi': {
    title: 'CGI & Architectural Viz',
    desc: 'Hyper-realistic 3D product visualizations, interior studio scenes, and environment modeling.',
    benefits: ['Showcase Products Before Manufacturing', 'Realistic Lighting & Texturing', 'Ultra High-Resolution Output'],
    deliverables: ['Interior & Exterior Architectural Renders', 'Studio Product Visuals', 'Environment Models']
  },
  'vfx': {
    title: 'Visual Effects (VFX)',
    desc: 'Compositing, green screen keying, rotoscoping, camera tracking, and digital object integration.',
    benefits: ['Seamless CGI Integration', 'Flawless Green Screen Keying', 'Cinematic Polish for Commercials'],
    deliverables: ['VFX Composite Sequences', 'Clean Plates & Wire Removal', '3D Camera Tracking Pass']
  }
};

function initModals() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const closeModal = () => modalOverlay?.classList.remove('active');
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.querySelectorAll('.btn-case-study').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute('data-case');
      const data = caseStudyData[caseId];

      if (data && modalBody) {
        modalBody.innerHTML = `
          <div class="case-study-view">
            <span class="section-tag">${data.type}</span>
            <h2 style="margin-bottom:12px;">${data.title}</h2>
            <p style="color:var(--text-secondary); margin-bottom:24px;"><strong>Tools Used:</strong> ${data.tools}</p>
            
            <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:24px; margin-bottom:28px;">
              <h4 style="margin-bottom:8px;">Project Overview</h4>
              <p style="color:var(--text-secondary); font-size:0.95rem;">${data.overview}</p>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px;">
              <div style="border:1px solid var(--border); border-radius:var(--radius-md); padding:20px;">
                <h5 style="color:var(--primary); margin-bottom:8px;">The Challenge</h5>
                <p style="font-size:0.88rem; color:var(--text-secondary);">${data.challenge}</p>
              </div>
              <div style="border:1px solid var(--border); border-radius:var(--radius-md); padding:20px;">
                <h5 style="color:var(--primary); margin-bottom:8px;">Strategy & Approach</h5>
                <p style="font-size:0.88rem; color:var(--text-secondary);">${data.strategy}</p>
              </div>
            </div>

            <h4 style="margin-bottom:12px;">Final Deliverables</h4>
            <ul style="margin-bottom:28px; padding-left:20px; color:var(--text-secondary);">
              ${data.deliverables.map(item => `<li style="margin-bottom:6px;">${item}</li>`).join('')}
            </ul>

            <div style="text-align:center;">
              <a href="#estimator" onclick="document.getElementById('modalOverlay').classList.remove('active')" class="btn btn-primary">Start a Similar Project</a>
            </div>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  document.querySelectorAll('.service-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      const data = serviceData[serviceId];

      if (data && modalBody) {
        modalBody.innerHTML = `
          <div class="service-detail-view">
            <span class="section-tag">Service Overview</span>
            <h2 style="margin-bottom:12px;">${data.title}</h2>
            <p style="color:var(--text-secondary); font-size:1.05rem; margin-bottom:28px;">${data.desc}</p>
            
            <div style="margin-bottom:28px;">
              <h4 style="margin-bottom:14px;">Key Benefits</h4>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
                ${data.benefits.map(b => `
                  <div style="background:var(--surface); border:1px solid var(--border); padding:14px; border-radius:var(--radius-md); font-size:0.88rem; font-weight:600;">
                    <i class="fas fa-check-circle me-2" style="color:var(--primary);"></i> ${b}
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="margin-bottom:28px;">
              <h4 style="margin-bottom:14px;">What We Deliver</h4>
              <ul style="padding-left:20px; color:var(--text-secondary); font-size:0.92rem;">
                ${data.deliverables.map(d => `<li style="margin-bottom:8px;">${d}</li>`).join('')}
              </ul>
            </div>

            <div style="text-align:center; padding-top:20px; border-top:1px solid var(--border);">
              <a href="#contact" onclick="document.getElementById('modalOverlay').classList.remove('active')" class="btn btn-primary">Request Proposal for ${data.title}</a>
            </div>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });
}

/* 8. Interactive Project Estimator */
function initEstimator() {
  let selectedServices = ['graphic-design'];
  let selectedScale = 1;
  let selectedSpeed = 1;

  const updateEstimate = () => {
    let baseMin = selectedServices.length * 400 * selectedScale * selectedSpeed;
    let baseMax = selectedServices.length * 800 * selectedScale * selectedSpeed;

    const valDisplay = document.getElementById('estimateVal');
    if (valDisplay) {
      valDisplay.textContent = `$${Math.round(baseMin)} - $${Math.round(baseMax)}`;
    }
  };

  document.querySelectorAll('.service-opt').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const val = chip.getAttribute('data-value') || '';
      if (chip.classList.contains('selected')) {
        if (!selectedServices.includes(val)) selectedServices.push(val);
      } else {
        selectedServices = selectedServices.filter(s => s !== val);
      }
      updateEstimate();
    });
  });

  document.querySelectorAll('.scale-opt').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.scale-opt').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedScale = parseFloat(chip.getAttribute('data-multiplier') || '1');
      updateEstimate();
    });
  });

  document.querySelectorAll('.speed-opt').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.speed-opt').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedSpeed = parseFloat(chip.getAttribute('data-multiplier') || '1');
      updateEstimate();
    });
  });
}

/* 9. FAQ Accordion Engine */
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      const isActive = parent?.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive && parent) {
        parent.classList.add('active');
        const answer = parent.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* 10. Contact Form Toast Notification */
function initContactForm() {
  const form = document.getElementById('inquiryForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('nameInput')).value || 'there';
    showToast(`Thank you, ${name}! Your inquiry has been received. We will respond within 2 hours.`);
    form.reset();
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--primary)"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}
