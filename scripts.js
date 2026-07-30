/* ── PAGE NAV ── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  window.scrollTo(0, 0);
}

/* ── ORG CHART TOGGLE ── */
const openPanels = new Set();
function toggleDiv(key) {
  const card = document.getElementById('card-' + key);
  const panel = document.getElementById('panel-' + key);
  const isOpen = openPanels.has(key);
  if (isOpen) { openPanels.delete(key); card.classList.remove('open'); panel.classList.remove('open'); }
  else { openPanels.add(key); card.classList.add('open'); panel.classList.add('open'); }
  const rr = document.getElementById('research-row');
  openPanels.size > 0 ? rr.classList.add('visible') : rr.classList.remove('visible');
}

/* ── WHY GENIUM SLIDER ── */
let whyIndex = 0;
const whyTotal = 4;

function whyGoTo(idx) {
  document.getElementById('why-slide-' + whyIndex).classList.remove('active');
  document.querySelectorAll('.why-dot')[whyIndex].classList.remove('active');
  whyIndex = (idx + whyTotal) % whyTotal;
  document.getElementById('why-slide-' + whyIndex).classList.add('active');
  document.querySelectorAll('.why-dot')[whyIndex].classList.add('active');
}

function whyNav(dir) { whyGoTo(whyIndex + dir); }

/* ── APPLY MODAL ── */
function openModal(jobTitle) {
  document.getElementById('modalJobTitle').textContent = jobTitle;
  document.getElementById('applyModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('applyModal').classList.remove('active');
  document.body.style.overflow = '';
  // reset form
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('resumeInput').value = '';
  document.getElementById('coverInput').value = '';
  document.getElementById('resumeZone').classList.remove('uploaded');
  document.getElementById('coverZone').classList.remove('uploaded');
  document.getElementById('resumeLabel').innerHTML = '<span>Click to upload</span> or drag &amp; drop your resume<br><span class="upload-hint">PDF, DOC, or DOCX · Max 10MB</span>';
  document.getElementById('coverLabel').innerHTML = '<span>Click to upload</span> or drag &amp; drop your cover letter<br><span class="upload-hint">PDF, DOC, or DOCX · Max 10MB</span>';
}
function closeModalOnBg(e) { if (e.target === document.getElementById('applyModal')) closeModal(); }

function handleUpload(zoneId, inputId, labelId) {
  const file = document.getElementById(inputId).files[0];
  if (file) {
    document.getElementById(zoneId).classList.add('uploaded');
    document.getElementById(labelId).innerHTML = '&#10003; <strong>' + file.name + '</strong> uploaded successfully';
  }
}

function submitApplication() {
  const first = document.getElementById('firstName').value.trim();
  const last = document.getElementById('lastName').value.trim();
  if (!first || !last) { alert('Please enter your first and last name.'); return; }
  closeModal();
  setTimeout(() => alert('Thank you, ' + first + '! Your application has been submitted successfully.'), 200);
}

/* ══════════════════════════════════════════════
   NEWS PAGE
══════════════════════════════════════════════ */
const newsPosts = [
  {
    tag: 'Partnerships',
    date: 'May 12, 2026',
    title: "Genium Partners with Massachusetts General Hospital",
    paras: [
      "Genium is proud to announce a new research partnership with Massachusetts General Hospital aimed at exploring how humanoid robotics can improve healthcare support services. The collaboration will evaluate the use of Genium's flagship humanoid robot, Geni, in assisting with patient navigation, visitor guidance, and administrative workflows.",
      "The pilot program is designed to reduce the burden of routine tasks on healthcare staff, allowing medical professionals to spend more time focused on patient care. Throughout the program, researchers will assess Geni's ability to interact naturally with patients while maintaining the highest standards of safety, privacy, and reliability.",
      "This partnership represents an important step toward integrating intelligent robotics into real-world healthcare environments and reinforces Genium's commitment to developing technology that enhances human capabilities."
    ]
  },
  {
    tag: 'Milestones',
    date: 'February 18, 2026',
    title: "Geni Completes 10,000-Hour Reliability Test",
    paras: [
      "Genium has successfully completed a comprehensive 10,000-hour reliability test for its flagship humanoid robot, Geni. Conducted over several months in simulated workplace environments, the testing evaluated continuous operation, mobility, communication systems, and task performance under demanding conditions.",
      "The results demonstrated exceptional durability and consistent performance, validating Geni's readiness for deployment in commercial and public settings. Engineers also used the testing period to refine predictive maintenance capabilities and further improve system reliability.",
      "This milestone highlights Genium's commitment to delivering dependable humanoid robotics that organizations can trust for long-term operation."
    ]
  },
  {
    tag: 'Research',
    date: 'January 22, 2026',
    title: "Genium Signs Strategic Research Partnership with MIT",
    paras: [
      "Genium has entered into a strategic research partnership with the Massachusetts Institute of Technology (MIT) to advance the future of intelligent humanoid robotics. The collaboration will focus on machine learning, computer vision, autonomous decision-making, and human-robot interaction.",
      "By combining MIT's world-class research expertise with Genium's robotics platform, both organizations aim to accelerate innovation in embodied artificial intelligence and develop technologies that enable robots to better understand and interact with the world around them.",
      "The partnership will also create opportunities for student research, internships, and joint innovation initiatives that help prepare the next generation of robotics engineers."
    ]
  },
  {
    tag: 'Company',
    date: 'December 8, 2025',
    title: "Genium Named One of America's Most Innovative Startups",
    paras: [
      "Genium has been recognized as one of America's Most Innovative Startups for its groundbreaking work in humanoid robotics and responsible artificial intelligence. The recognition reflects the company's rapid progress in developing advanced robotic systems designed to assist people in both professional and everyday environments.",
      "Since its founding, Genium has focused on creating technology that is intelligent, reliable, and centered on human needs. This achievement recognizes the company's continued investment in research, engineering excellence, and ethical AI development.",
      "As Genium continues to grow, the company remains committed to pushing the boundaries of innovation while developing robotics solutions that positively impact industries and communities around the world."
    ]
  }
];

let currentNewsIndex = 0;

function newsFilter(tag, btn) {
  document.querySelectorAll('.news-filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#page-news .news-featured, #page-news .news-card').forEach(card => {
    const match = (tag === 'all') || (card.getAttribute('data-tag') === tag);
    card.style.display = match ? '' : 'none';
  });
}

function openNewsModal(idx) {
  currentNewsIndex = idx;
  const post = newsPosts[idx];
  const sourceEls = document.querySelectorAll('#page-news .news-featured, #page-news .news-card');
  const svgEl = sourceEls[idx].querySelector('svg');
  document.getElementById('newsModalImg').innerHTML =
    '<button class="news-modal-close" onclick="closeNewsModal()">✕</button>' +
    '<span class="news-modal-tag">' + post.tag + '</span>' +
    (svgEl ? svgEl.outerHTML : '');
  document.getElementById('newsModalDate').textContent = post.date;
  document.getElementById('newsModalTitle').textContent = post.title;
  document.getElementById('newsModalText').innerHTML = post.paras.map(p => '<p>' + p + '</p>').join('');
  document.getElementById('newsPrevBtn').disabled = idx === 0;
  document.getElementById('newsNextBtn').disabled = idx === newsPosts.length - 1;
  document.getElementById('newsModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('newsModalOverlay').scrollTop = 0;
}

function closeNewsModal() {
  document.getElementById('newsModalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeNewsModalOnBg(e) {
  if (e.target === document.getElementById('newsModalOverlay')) closeNewsModal();
}

function newsModalNav(dir) {
  const next = currentNewsIndex + dir;
  if (next < 0 || next > newsPosts.length - 1) return;
  openNewsModal(next);
}

/* ══════════════════════════════════════════════
   SAFETY & SECURITY PAGE
══════════════════════════════════════════════ */
const safetySlides = [
  { hs: 3, subtitle: "Instant Control When You Need It", title: "Emergency Safe Stop",
    icon: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    desc: "Every Genium robot includes multiple ways to immediately stop movement in any situation.",
    listLabel: "Activate By", features: ["Saying “Emergency Stop”", "Pressing the emergency button", "Using the Genium mobile app"],
    promise: "Geni immediately stops movement while maintaining balance whenever possible to prevent additional hazards." },

  { hs: 0, subtitle: "Only You Have Access", title: "Biometric Authentication",
    icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>',
    desc: "Your robot recognizes authorized users before providing access to personal information or administrative controls.",
    listLabel: "Authentication Options", features: ["Facial Recognition", "Voice Recognition", "Mobile Device Verification", "Multi-Factor Authentication"],
    promise: "If identity cannot be verified, Geni automatically limits access until an authorized user is confirmed." },

  { hs: 1, subtitle: "Always Looking Out for You", title: "Intelligent Threat Detection",
    icon: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    desc: "Geni continuously monitors its surroundings for signs of tampering, theft, or suspicious activity while respecting your privacy.",
    listLabel: "If A Threat Is Detected", features: ["Safely stops all active tasks", "Locks access to sensitive information", "Alerts Genium Security Operations", "Optionally notifies your emergency contacts"],
    promise: "Geni responds only to credible security threats and records only the information necessary to protect you." },

  { hs: 2, subtitle: "Your Home. Your Privacy.", title: "Privacy Mode",
    icon: '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>',
    desc: "Need complete privacy? Simply activate Privacy Mode with your voice, the Genium App, or Geni's touchscreen.",
    listLabel: "Privacy Mode", features: ["Cameras deactivate", "Microphones stop listening", "Cloud syncing pauses", "Safety systems remain active"],
    promise: "When Privacy Mode is on, your personal moments stay personal." },

  { hs: 4, subtitle: "Designed Around People", title: "Human Safety Protection",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    desc: "Every movement Geni makes is evaluated with human safety as the highest priority.",
    listLabel: "Built-In Safety", features: ["Collision avoidance", "Obstacle detection", "Child and pet awareness", "Stair and ledge detection", "Safe-force joint monitoring"],
    promise: "If Geni detects an unsafe condition, it will pause and reassess before continuing." },

  { hs: 5, subtitle: "Technology That Knows Its Limits", title: "Ethical AI Standards",
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/><line x1="20" y1="15" x2="23" y2="15"/>',
    desc: "Genium develops AI that assists people while respecting human judgment and ethical boundaries.",
    listLabel: "Geni Will Never", features: ["Make medical or legal decisions", "Encourage harmful or illegal behavior", "Share your private information", "Access accounts without permission", "Bypass security systems"],
    promise: "Geni is designed to support human decision-making — not replace it." },

  { hs: 6, subtitle: "Your Data. Your Control.", title: "Privacy by Design",
    icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>',
    desc: "At Genium, privacy is a fundamental principle — not an afterthought. Every Geni robot maintains its own encrypted cloud database, giving you complete ownership of your personal information.",
    listLabel: "Features", features: ["End-to-end encrypted cloud storage", "One-click permanent data deletion", "No data sold to third parties", "No AI training without your consent"],
    promise: "You decide what your robot remembers and when it forgets." },

  { hs: 8, subtitle: "Protection That Never Stops Improving", title: "Secure Software Updates",
    icon: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    desc: "Every software update is securely delivered and verified before installation.",
    listLabel: "Every Update Includes", features: ["Digital signature verification", "Encrypted downloads", "Integrity validation", "Automatic security patches"],
    promise: "Your robot will never install software that cannot be verified as authentic." },

  { hs: 7, subtitle: "Built to Resist Digital Threats", title: "Enterprise-Grade Cybersecurity",
    icon: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    desc: "Geni uses the same cybersecurity principles trusted by leading technology companies.",
    listLabel: "Security Features", features: ["End-to-end encryption", "Secure Boot", "Firewall protection", "Intrusion detection", "Malware prevention", "Network isolation during threats"],
    promise: "If unauthorized software is detected, Geni immediately disconnects from external networks until the issue is resolved." },

  { hs: 9, subtitle: "Built for Every Family", title: "Child Safety Mode",
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    desc: "Child Safety Mode adds an extra layer of protection whenever children are nearby.",
    listLabel: "Features", features: ["Reduced movement speed", "Increased personal space", "Restricted advanced functions", "Age-appropriate content filtering", "Parent safety notifications"],
    promise: "Geni automatically creates a safer environment for children without compromising functionality." },

  { hs: 10, subtitle: "Nothing Happens Without Your Knowledge", title: "Transparency & Activity History",
    icon: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    desc: "The Genium App provides a complete history of your robot's activity so you're always informed.",
    listLabel: "View Your Robot's", features: ["Commands performed", "Security alerts", "Software updates", "Connected devices", "Authentication attempts", "Data synchronization history"],
    promise: "You deserve complete transparency into how your robot operates and how your information is protected." }
];

let safetyIndex = 0;
let safetyBuilt = false;

function buildSafetySlides() {
  if (safetyBuilt) return;
  safetyBuilt = true;
  const track = document.getElementById('safetySlideTrack');
  const progress = document.getElementById('safetyProgress');
  const dots = document.getElementById('safetyDots');
  let trackHTML = '';
  let progressHTML = '';
  let dotsHTML = '';

  safetySlides.forEach((s, i) => {
    trackHTML += '<div class="safety-slide' + (i === 0 ? ' active' : '') + '" id="safety-slide-' + i + '">' +
      '<div class="safety-slide-count">Safeguard ' + (i + 1) + ' / ' + safetySlides.length + '</div>' +
      '<div class="safety-slide-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + s.icon + '</svg></div>' +
      '<div class="safety-slide-title">' + s.title + '</div>' +
      '<div class="safety-slide-subtitle">' + s.subtitle + '</div>' +
      '<p class="safety-slide-desc">' + s.desc + '</p>' +
      '<div class="safety-slide-listlabel">' + s.listLabel + '</div>' +
      '<ul class="safety-feature-list">' + s.features.map(f => '<li>' + f + '</li>').join('') + '</ul>' +
      '<div class="safety-promise"><div class="safety-promise-label">Our Promise</div><p>' + s.promise + '</p></div>' +
    '</div>';
    progressHTML += '<div class="safety-progress-seg' + (i === 0 ? ' current' : '') + '" id="safety-seg-' + i + '"><span></span></div>';
    dotsHTML += '<button class="safety-panel-dot' + (i === 0 ? ' active' : '') + '" id="safety-dot-' + i + '" onclick="safetyGoTo(' + i + ')" aria-label="Safeguard ' + (i + 1) + '"></button>';
  });

  track.innerHTML = trackHTML;
  progress.innerHTML = progressHTML;
  dots.innerHTML = dotsHTML;
}

function safetyGoTo(idx) {
  idx = (idx + safetySlides.length) % safetySlides.length;

  document.getElementById('safety-slide-' + safetyIndex).classList.remove('active');
  document.getElementById('safety-dot-' + safetyIndex).classList.remove('active');
  document.getElementById('hs-' + safetySlides[safetyIndex].hs).classList.remove('active');
  document.querySelectorAll('.safety-progress-seg').forEach(seg => seg.classList.remove('current'));
  for (let i = 0; i < safetySlides.length; i++) {
    document.getElementById('safety-seg-' + i).classList.toggle('done', i < idx);
  }

  safetyIndex = idx;
  document.getElementById('safety-slide-' + safetyIndex).classList.add('active');
  document.getElementById('safety-dot-' + safetyIndex).classList.add('active');
  document.getElementById('hs-' + safetySlides[safetyIndex].hs).classList.add('active');
  document.getElementById('safety-seg-' + safetyIndex).classList.add('current');
}

function safetyNav(dir) { safetyGoTo(safetyIndex + dir); }

function safetyGoToByHotspot(hotspotId) {
  const idx = safetySlides.findIndex(s => s.hs === hotspotId);
  if (idx !== -1) safetyGoTo(idx);
}

/* ══════════════════════════════════════════════
   SOCIAL RESPONSIBILITY PAGE
══════════════════════════════════════════════ */
function socialToggle(idx) {
  const card = document.getElementById('soc-card-' + idx);
  card.classList.toggle('expanded');
}

/* ── Hook page-specific init into navigation ── */
const _origShowPage = showPage;
showPage = function(name) {
  closeNewsModal();
  closeModal();
  _origShowPage(name);
  if (name === 'safety') { buildSafetySlides(); }
};

// Build safety slides immediately in case Safety tab is the first one interacted with
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('page-safety').classList.contains('active')) {
    buildSafetySlides();
  }
});
