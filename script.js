/* ==========================================================================
   GURU CHARAN REDDY - PORTFOLIO INTERACTIVITY SCRIPT
   Pure Vanilla JavaScript (No External Dependencies)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Typing Animation in Hero Section ---
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Aspiring AI / ML Engineer',
    'B.Tech CSE Student @ SR University',
    'Python & Machine Learning Enthusiast',
    'Unity & C# Game Developer',
    'Problem Solver & Software Builder'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at full string
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // --- 2. Theme Toggle (Dark / Light) with LocalStorage ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      themeToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }

  // --- 3. Mobile Navigation Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // --- 4. Active Nav Item Highlighting on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });

  // --- 5. Skill Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // --- 6. Clipboard Copy Helper with Toast Notification ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy to clipboard.');
        });
      }
    });
  });

  // --- 7. Toast Notification Handler ---
  const toast = document.getElementById('toast-notice');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --- 8. Interactive Project Modals ---
  const projectDetails = {
    'zombie-runner': {
      title: 'Zombie-Runner — 3D Endless Runner',
      badge: 'Unity & C# Game Project',
      tech: ['Unity 3D', 'C#', 'CharacterController', 'AI Zombie Follow', 'Procedural Generation', 'Physics Engine'],
      github: 'https://github.com/2303A51740/Zombie-Runner',
      description: `
        <p><strong>Zombie-Runner</strong> is an action-packed 3D endless runner developed in Unity using C#. Players sprint through dynamically generated procedural environments while evading intelligent pursuing zombies and navigating complex obstacles.</p>
        <h4 style="margin-top:1.25rem; margin-bottom:0.5rem; color:var(--accent-cyan);">Key Architecture & Engineering Highlights:</h4>
        <ul style="padding-left:1.2rem; line-height:1.7; color:var(--text-secondary); list-style-type:disc;">
          <li><strong>Player Controller (PlayerMovement.cs):</strong> Fluid 3-lane horizontal lane switching with configurable transition physics, variable jump heights, and ground-sliding collision mechanics.</li>
          <li><strong>AI Chase Behavior (ZombieFollow.cs):</strong> Smart zombie pursuit logic utilizing real-time distance tracking, velocity catch-up mechanics, dynamic turning rotations, and distance-triggered 3D spatial audio (growls and footsteps).</li>
          <li><strong>Procedural Endless Tracks (EndlessTrack.cs & ObstacleSpawner.cs):</strong> Dynamic pooling and spawning of endless track segments and randomized hazards to ensure stutter-free performance.</li>
          <li><strong>Inventory & Pickups (UVInventory.cs & UVLightPickup.cs):</strong> UV light collectibles system providing offensive / defensive tools against approaching zombies.</li>
          <li><strong>Game State & Score Loop (GameManager.cs):</strong> Singleton-based state machine managing Home Panels, Live Gameplay HUD, real-time score counters, high score tracking, and Game Over restarts.</li>
        </ul>
        <div style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap;">
          <a href="https://github.com/2303A51740/Zombie-Runner" target="_blank" class="btn btn-primary btn-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View Repository on GitHub
          </a>
        </div>
      `
    },
    'recommendation-system': {
      title: 'Smart Product Recommendation System',
      badge: 'Machine Learning & Data Science',
      tech: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Cosine Similarity', 'Feature Engineering'],
      github: 'https://github.com/2303A51740',
      description: `
        <p>A machine learning recommendation engine designed to tackle user cold-start and discoverability issues across e-commerce catalogs using hybrid collaborative and content-based filtering algorithms.</p>
        <h4 style="margin-top:1.25rem; margin-bottom:0.5rem; color:var(--accent-cyan);">Implementation Details:</h4>
        <ul style="padding-left:1.2rem; line-height:1.7; color:var(--text-secondary); list-style-type:disc;">
          <li><strong>Data Cleaning & Pipeline:</strong> Handled missing attributes, normalized interaction metrics, and vectorized product metadata using Pandas and NumPy.</li>
          <li><strong>Dual-Model Architecture:</strong> Integrated Content-Based Filtering (TF-IDF on product descriptions & category tags) and Collaborative Filtering (User-Item interaction matrix factorization).</li>
          <li><strong>Similarity Computation:</strong> Applied cosine similarity matrices to retrieve top-N closest product candidates in sub-second response times.</li>
          <li><strong>Evaluation:</strong> Evaluated recommendation relevance using precision@k, recall@k, and Mean Average Precision (MAP), iteratively optimizing feature weighting.</li>
        </ul>
      `
    },
    'nlp-classifier': {
      title: 'NLP-Based Text Classifier',
      badge: 'Natural Language Processing',
      tech: ['Python', 'scikit-learn', 'NLTK', 'TF-IDF', 'Naive Bayes', 'Logistic Regression', 'SVM'],
      github: 'https://github.com/2303A51740',
      description: `
        <p>An end-to-end NLP classification pipeline capable of categorizing text documents into target classifications (such as spam vs. ham or sentiment classes) with high benchmark accuracy.</p>
        <h4 style="margin-top:1.25rem; margin-bottom:0.5rem; color:var(--accent-cyan);">Implementation Details:</h4>
        <ul style="padding-left:1.2rem; line-height:1.7; color:var(--text-secondary); list-style-type:disc;">
          <li><strong>Text Preprocessing Pipeline:</strong> Implemented tokenization, lowercasing, regex cleaning, stopword removal, and WordNet lemmatization using NLTK.</li>
          <li><strong>Vectorization:</strong> Converted textual corpora into high-dimensional numerical vectors using TF-IDF (Term Frequency-Inverse Document Frequency) with n-gram extraction (unigrams + bigrams).</li>
          <li><strong>Algorithm Benchmark:</strong> Trained Multinomial Naive Bayes, Logistic Regression, and Support Vector Machines (LinearSVC) with cross-validation.</li>
          <li><strong>Validation & Documentation:</strong> Generated confusion matrices, precision, recall, and F1-score comparisons, achieving reliable classification generalization on unseen test data.</li>
        </ul>
      `
    }
  };

  const projectModalBackdrop = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('modal-project-title');
  const projectModalBody = document.getElementById('modal-project-body');
  const modalCloseBtns = document.querySelectorAll('.modal-close-trigger');

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (data && projectModalBackdrop) {
        projectModalTitle.textContent = data.title;
        projectModalBody.innerHTML = data.description;
        projectModalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // --- 9. ATS Resume Modal & Print Trigger ---
  const resumeModalBackdrop = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModalBackdrop) {
        resumeModalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modals
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });

  // --- 10. Interactive Developer Terminal CLI ---
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  const cliCommands = {
    help: () => `
Available commands:
  <span style="color:#38bdf8;">help</span>         - List all available terminal commands
  <span style="color:#38bdf8;">whoami</span>       - Display candidate overview & bio
  <span style="color:#38bdf8;">skills</span>       - List technical skill stack & proficiencies
  <span style="color:#38bdf8;">projects</span>     - Show featured projects & repositories
  <span style="color:#38bdf8;">zombie</span>       - Run deep info on the Zombie-Runner game project
  <span style="color:#38bdf8;">education</span>    - View degree, university & graduation timeline
  <span style="color:#38bdf8;">contact</span>      - Show phone, email, and LinkedIn details
  <span style="color:#38bdf8;">clear</span>        - Clear terminal history
`,
    whoami: () => `
Candidate: <strong>Guru Charan Reddy</strong>
Role: B.Tech Computer Science and Engineering @ SR University (Expected 2027)
Objective: Final-year B.Tech CSE student with strong foundation in Python, Java, and C++, seeking an AI/ML internship to apply problem-solving skills to real-world impact.
Location: Hyderabad, Telangana, India
`,
    skills: () => `
<strong>Languages:</strong> Python, Java, C++, C#
<strong>AI/ML & Data:</strong> scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, NLTK
<strong>Core Concepts:</strong> Machine Learning, Natural Language Processing, Data Preprocessing, SDLC, Agile Methodologies, OOP, DSA
<strong>Tools:</strong> Git, GitHub, VS Code, Jupyter Notebook, Unity Engine
`,
    projects: () => `
1. <a href="https://github.com/2303A51740/Zombie-Runner" target="_blank" style="color:#38bdf8; text-decoration:underline;">Zombie-Runner</a> (Unity, C#) - 3D Endless runner with AI zombie chase & procedural tracks.
2. <strong>Smart Product Recommendation System</strong> (Python, scikit-learn, Pandas) - Content-based & collaborative filtering.
3. <strong>NLP-Based Text Classifier</strong> (Python, scikit-learn, NLTK) - Multi-model text categorization pipeline.
`,
    zombie: () => `
<strong style="color:#10b981;">[Zombie-Runner Project Details]</strong>
Repo: https://github.com/2303A51740/Zombie-Runner
Tech: Unity 3D, C#, Physics, AI Steering
Features: 3-Lane runner physics, dynamic UV inventory pickups, procedural tracks, and adaptive zombie chase audio.
Status: Active repository!
`,
    education: () => `
Degree: <strong>Bachelor of Technology (B.Tech)</strong>
Major: Computer Science and Engineering
Institution: <strong>SR University</strong>
Expected Graduation: <strong>2027</strong>
CGPA: <strong>7.0 / 10</strong>
Key Coursework: DSA, Machine Learning, DBMS, OOP, Software Engineering, AI
`,
    contact: () => `
Phone: <strong>+91 6303496394</strong>
Email: <strong>2303a51738@sru.edu.in</strong>
LinkedIn: <a href="https://www.linkedin.com/in/guru-charan-reddy-2754a0356" target="_blank" style="color:#38bdf8; text-decoration:underline;">linkedin.com/in/guru-charan-reddy-2754a0356</a>
GitHub: <a href="https://github.com/2303A51740" target="_blank" style="color:#38bdf8; text-decoration:underline;">github.com/2303A51740</a>
Location: Hyderabad, Telangana, India
`,
    clear: () => {
      if (termOutput) termOutput.innerHTML = '';
      return '';
    }
  };

  function executeTerminalCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Append command call
    const promptLine = document.createElement('div');
    promptLine.className = 'term-output-line';
    promptLine.innerHTML = `<span style="color:#38bdf8;">guest@gurucharan:~$</span> ${escapeHTML(cmdRaw)}`;
    termOutput.appendChild(promptLine);

    if (cmd === 'clear') {
      cliCommands.clear();
      return;
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'term-output-line';

    if (cliCommands[cmd]) {
      responseLine.innerHTML = cliCommands[cmd]();
    } else {
      responseLine.innerHTML = `<span style="color:#ef4444;">Command not found: "${escapeHTML(cmdRaw)}". Type <strong style="color:#38bdf8;">help</strong> to see valid commands.</span>`;
    }

    termOutput.appendChild(responseLine);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeTerminalCommand(termInput.value);
        termInput.value = '';
      }
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeTerminalCommand(cmd);
      }
    });
  });

  // --- 11. Contact Form Simulation ---
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const subject = document.getElementById('sender-subject').value.trim();
      const message = document.getElementById('sender-message').value.trim();

      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill out all required fields.';
        return;
      }

      // Simulate sending and provide a direct mailto action fallback
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        Thank you, <strong>${escapeHTML(name)}</strong>! Your message preview has been prepared.<br>
        <a href="mailto:2303a51738@sru.edu.in?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}" 
           style="color:#10b981; font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">
          Click here to send directly via your email client
        </a>
      `;

      showToast('Message ready! Email client link generated.');
      contactForm.reset();
    });
  }

  // --- 12. Dynamic Year Updater ---
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
