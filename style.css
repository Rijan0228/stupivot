:root {
    --bg: #070b13;
    --bg-soft: #0b111d;
    --panel: rgba(16, 25, 40, 0.78);
    --panel-solid: #101928;
    --panel-light: #151f31;

    --text: #f2f7ff;
    --muted: #9aa8bb;

    --accent: #5de4ff;
    --accent-2: #8b7cff;
    --accent-soft: rgba(93, 228, 255, 0.12);

    --border: rgba(255,255,255,0.09);
    --border-accent: rgba(93,228,255,0.28);

    --shadow: 0 20px 60px rgba(0,0,0,0.35);

    --radius: 18px;
    --max-width: 1240px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 90px;
}

body {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

    line-height: 1.6;
    overflow-x: hidden;
}

body.light-theme {
    --bg: #f3f6fb;
    --bg-soft: #ffffff;
    --panel: rgba(255,255,255,0.82);
    --panel-solid: #ffffff;
    --panel-light: #edf2f8;

    --text: #111827;
    --muted: #5c6878;

    --border: rgba(15,23,42,0.1);
    --border-accent: rgba(37,174,204,0.35);

    --shadow: 0 20px 50px rgba(15,23,42,0.1);
}

a {
    color: inherit;
}

button,
input,
textarea,
select {
    font: inherit;
}

button {
    cursor: pointer;
}

.background-grid {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -5;

    background-image:
        linear-gradient(rgba(93,228,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(93,228,255,0.025) 1px, transparent 1px);

    background-size: 55px 55px;

    mask-image: linear-gradient(
        to bottom,
        black 0%,
        rgba(0,0,0,0.7) 60%,
        transparent 100%
    );
}

.glow {
    position: fixed;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.09;
    pointer-events: none;
    z-index: -4;
}

.glow-one {
    background: var(--accent);
    top: -250px;
    right: -180px;
}

.glow-two {
    background: var(--accent-2);
    bottom: -300px;
    left: -200px;
}

.site-header {
    position: sticky;
    top: 0;
    z-index: 1000;

    background: rgba(7,11,19,0.76);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
}

.light-theme .site-header {
    background: rgba(255,255,255,0.78);
}

.navbar {
    max-width: var(--max-width);
    min-height: 76px;
    margin: auto;
    padding: 0 25px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    text-decoration: none;
    font-weight: 850;
    font-size: 21px;
    letter-spacing: -0.5px;

    white-space: nowrap;
}

.brand-mark {
    width: 34px;
    height: 34px;

    display: grid;
    place-items: center;

    border-radius: 10px;

    color: #061019;
    background: linear-gradient(
        135deg,
        var(--accent),
        var(--accent-2)
    );

    font-weight: 950;
}

.accent {
    color: var(--accent);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 650;

    transition: 0.2s ease;
}

.nav-links a:hover {
    color: var(--accent);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 9px;
}

.icon-btn,
.search-open,
.menu-btn {
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.035);
    color: var(--text);

    border-radius: 10px;
    padding: 9px 12px;

    transition: 0.2s ease;
}

.icon-btn:hover,
.search-open:hover,
.menu-btn:hover {
    border-color: var(--border-accent);
    color: var(--accent);
}

.menu-btn {
    display: none;
}

.section {
    width: 100%;
    max-width: var(--max-width);
    margin: auto;
    padding: 110px 25px;
}

.hero {
    min-height: calc(100vh - 76px);

    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: 80px;

    padding-top: 80px;
    padding-bottom: 80px;
}

.status-pill {
    display: inline-flex;
    align-items: center;
    gap: 9px;

    border: 1px solid var(--border-accent);
    background: var(--accent-soft);

    color: var(--accent);

    padding: 7px 12px;
    border-radius: 999px;

    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.4px;
}

.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);

    box-shadow: 0 0 14px var(--accent);

    animation: pulse 2s infinite;
}

.hero h1 {
    margin-top: 23px;

    max-width: 760px;

    font-size: clamp(46px, 6vw, 82px);
    line-height: 0.98;
    letter-spacing: -4px;
}

.hero h1 span {
    display: block;
    color: var(--accent);
}

.hero-description {
    max-width: 670px;

    margin-top: 28px;

    color: var(--muted);
    font-size: 18px;
    line-height: 1.8;
}

.hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 13px;

    margin-top: 34px;
}

.btn {
    border: 1px solid transparent;
    border-radius: 11px;

    padding: 13px 19px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;

    font-weight: 750;
    font-size: 14px;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

.btn-primary {
    color: #041018;
    background: linear-gradient(
        135deg,
        var(--accent),
        #83edff
    );

    box-shadow: 0 12px 30px rgba(93,228,255,0.12);
}

.btn-secondary {
    color: var(--text);
    background: rgba(255,255,255,0.035);
    border-color: var(--border);
}

.btn-secondary:hover {
    border-color: var(--border-accent);
}

.hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    margin-top: 50px;
}

.hero-stats div {
    display: flex;
    flex-direction: column;
}

.hero-stats strong {
    font-size: 24px;
}

.hero-stats span {
    color: var(--muted);
    font-size: 12px;
}

.hero-visual {
    position: relative;
    min-height: 500px;

    display: grid;
    place-items: center;
}

.main-tech-card {
    width: min(100%, 500px);
    padding: 26px;

    border: 1px solid var(--border-accent);
    border-radius: 22px;

    background:
        linear-gradient(
            145deg,
            rgba(93,228,255,0.06),
            rgba(139,124,255,0.05)
        ),
        var(--panel);

    box-shadow: var(--shadow);

    backdrop-filter: blur(20px);

    transform: perspective(900px) rotateY(-5deg) rotateX(3deg);

    animation: floatCard 5s ease-in-out infinite;
}

.window-top {
    display: flex;
    gap: 7px;

    padding-bottom: 25px;
    border-bottom: 1px solid var(--border);
}

.window-top span {
    width: 9px;
    height: 9px;

    border-radius: 50%;
    background: rgba(255,255,255,0.2);
}

.terminal-line {
    display: flex;
    gap: 12px;

    padding: 17px 0;

    color: var(--accent);

    font-family: "Courier New", monospace;
    font-size: 14px;
}

.terminal-symbol {
    color: var(--accent-2);
}

.muted-line {
    color: var(--muted);
}

.tech-progress {
    width: 100%;
    height: 5px;

    margin: 20px 0 25px;

    border-radius: 99px;

    background: rgba(255,255,255,0.07);
    overflow: hidden;
}

.tech-progress div {
    width: 78%;
    height: 100%;

    background: linear-gradient(
        90deg,
        var(--accent),
        var(--accent-2)
    );

    animation: progressMove 3s ease-in-out infinite alternate;
}

.mini-grid {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 8px;
}

.mini-grid div {
    padding: 12px 5px;

    text-align: center;

    color: var(--muted);

    border: 1px solid var(--border);
    border-radius: 9px;

    font-size: 10px;
    font-weight: 800;
}

.floating-card {
    position: absolute;

    min-width: 120px;

    padding: 15px;

    border: 1px solid var(--border-accent);
    border-radius: 14px;

    background: rgba(10,16,27,0.86);
    backdrop-filter: blur(15px);

    box-shadow: var(--shadow);
}

.floating-card span {
    display: block;

    color: var(--muted);
    font-size: 9px;
    letter-spacing: 1.2px;
}

.floating-card strong {
    display: block;
    margin-top: 4px;
    color: var(--accent);
}

.floating-one {
    top: 90px;
    left: 0;

    animation: floatingOne 4s ease-in-out infinite;
}

.floating-two {
    right: 0;
    bottom: 80px;

    animation: floatingTwo 4.5s ease-in-out infinite;
}

.quick-section {
    max-width: var(--max-width);
    margin: auto;
    padding: 30px 25px 100px;
}

.compact-heading {
    margin-bottom: 28px;
}

.section-heading {
    max-width: 760px;
    margin: 0 auto 55px;
    text-align: center;
}

.section-heading.compact-heading {
    margin-left: 0;
    margin-right: 0;
    text-align: left;
}

.eyebrow {
    color: var(--accent);

    font-size: 11px;
    font-weight: 850;
    letter-spacing: 2px;
}

.section-heading h2 {
    margin-top: 10px;

    font-size: clamp(32px, 4vw, 48px);
    letter-spacing: -2px;
    line-height: 1.05;
}

.section-heading p {
    margin-top: 16px;

    color: var(--muted);
    font-size: 16px;
}

.quick-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.quick-card {
    min-height: 150px;

    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: start;
    gap: 15px;

    padding: 22px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background: var(--panel);

    text-decoration: none;

    transition:
        transform 0.25s ease,
        border-color 0.25s ease;
}

.quick-card:hover {
    transform: translateY(-5px);
    border-color: var(--border-accent);
}

.quick-icon {
    color: var(--accent);
    font-family: "Courier New", monospace;
    font-weight: 800;
    font-size: 11px;
}

.quick-card h3 {
    font-size: 16px;
}

.quick-card p {
    margin-top: 6px;
    color: var(--muted);
    font-size: 12px;
}

.arrow {
    color: var(--muted);
}

.calculator-grid,
.tool-grid,
.category-grid,
.article-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.calculator-card,
.tool-card {
    min-height: 250px;

    padding: 25px;

    display: flex;
    flex-direction: column;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background: var(--panel);

    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease;
}

.calculator-card:hover,
.tool-card:hover {
    transform: translateY(-6px);
    border-color: var(--border-accent);
    background: var(--panel-light);
}

.card-number,
.tool-number {
    color: var(--accent);

    font-family: "Courier New", monospace;
    font-size: 11px;
    font-weight: 800;
}

.calculator-card h3,
.tool-card h3 {
    margin-top: 24px;

    font-size: 20px;
}

.calculator-card p,
.tool-card p {
    margin-top: 9px;

    color: var(--muted);
    font-size: 13px;
}

.open-tool,
.browse-btn,
.read-article {
    width: fit-content;

    margin-top: auto;
    padding: 9px 0;

    border: none;
    background: transparent;

    color: var(--accent);

    font-weight: 750;
    font-size: 12px;

    transition: 0.2s ease;
}

.open-tool:hover,
.browse-btn:hover,
.read-article:hover {
    letter-spacing: 0.3px;
}

.dark-section {
    max-width: none;

    padding-left: max(25px, calc((100vw - var(--max-width)) / 2 + 25px));
    padding-right: max(25px, calc((100vw - var(--max-width)) / 2 + 25px));

    background:
        radial-gradient(
            circle at 80% 10%,
            rgba(93,228,255,0.055),
            transparent 35%
        ),
        #090f1b;
}

.category-grid {
    max-width: var(--max-width);
    margin: auto;

    grid-template-columns: repeat(4, 1fr);
}

.category-card {
    padding: 23px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background: rgba(255,255,255,0.025);

    transition: 0.25s ease;
}

.category-card:hover {
    transform: translateY(-4px);
    border-color: var(--border-accent);
}

.category-card > span {
    display: inline-flex;

    min-width: 36px;
    height: 28px;

    padding: 0 8px;

    align-items: center;
    justify-content: center;

    border: 1px solid var(--border-accent);
    border-radius: 7px;

    color: var(--accent);

    font-size: 10px;
    font-weight: 800;
}

.category-card h3 {
    margin-top: 20px;
}

.category-card p {
    min-height: 50px;

    margin-top: 7px;

    color: var(--muted);
    font-size: 12px;
}

.coding-layout {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 30px;
    align-items: start;
}

.code-window {
    overflow: hidden;

    border: 1px solid var(--border-accent);
    border-radius: 20px;

    background: #060a11;
    box-shadow: var(--shadow);
}

.code-header {
    display: flex;
    align-items: center;
    gap: 7px;

    padding: 15px 18px;

    border-bottom: 1px solid var(--border);
}

.code-header span {
    width: 8px;
    height: 8px;

    border-radius: 50%;
    background: rgba(255,255,255,0.25);
}

.code-header label {
    margin-left: 10px;

    color: var(--muted);

    font-family: "Courier New", monospace;
    font-size: 11px;
}

.code-window pre {
    padding: 30px;

    overflow-x: auto;

    color: #cdd8e8;

    font-family: "Courier New", monospace;
    font-size: 13px;
    line-height: 1.9;
}

.code-purple {
    color: #c29cff;
}

.code-blue {
    color: #6bdcff;
}

.code-green {
    color: #7ee8ae;
}

.code-orange {
    color: #ffbd76;
}

.coding-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
}

.coding-list article {
    display: grid;
    grid-template-columns: 42px 1fr;
    gap: 15px;

    padding: 18px;

    border: 1px solid var(--border);
    border-radius: 14px;

    background: var(--panel);

    transition: 0.2s ease;
}

.coding-list article:hover {
    border-color: var(--border-accent);
}

.coding-list article > span {
    color: var(--accent);

    font-family: "Courier New", monospace;
    font-weight: 800;
}

.coding-list h3 {
    font-size: 14px;
}

.coding-list p {
    margin-top: 4px;

    color: var(--muted);
    font-size: 12px;
}

.article-grid {
    grid-template-columns: repeat(3, 1fr);
}

.article-card {
    min-height: 250px;

    display: flex;
    flex-direction: column;

    padding: 25px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background: var(--panel);

    transition: 0.25s ease;
}

.article-card:hover {
    transform: translateY(-5px);
    border-color: var(--border-accent);
}

.article-tag {
    color: var(--accent);

    font-size: 10px;
    font-weight: 850;
    letter-spacing: 1.5px;
}

.article-card h3 {
    margin-top: 24px;

    font-size: 20px;
    line-height: 1.2;
}

.article-card p {
    margin-top: 12px;

    color: var(--muted);
    font-size: 13px;
}

.search-section {
    max-width: none;

    background:
        linear-gradient(
            180deg,
            rgba(93,228,255,0.025),
            transparent
        );
}

.search-box-large {
    max-width: 800px;
    margin: auto;

    display: flex;

    padding: 6px;

    border: 1px solid var(--border-accent);
    border-radius: 14px;

    background: var(--panel);
}

.search-box-large input {
    flex: 1;

    min-width: 0;

    padding: 14px 15px;

    border: none;
    outline: none;

    color: var(--text);
    background: transparent;
}

.search-box-large input::placeholder {
    color: var(--muted);
}

.search-box-large button {
    border: none;
    border-radius: 9px;

    padding: 0 20px;

    color: #041018;
    background: var(--accent);

    font-weight: 800;
}

.search-results {
    max-width: 800px;
    margin: 20px auto 0;
}

.search-result {
    display: block;

    padding: 17px 20px;
    margin-bottom: 8px;

    border: 1px solid var(--border);
    border-radius: 12px;

    background: var(--panel);

    text-decoration: none;
}

.search-result:hover {
    border-color: var(--border-accent);
}

.search-result strong {
    display: block;
}

.search-result span {
    display: block;

    margin-top: 3px;

    color: var(--muted);
    font-size: 12px;
}

.feedback-layout,
.contact-layout {
    max-width: 1000px;
    margin: auto;

    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 50px;
    align-items: start;
}

.feedback-copy {
    padding-top: 20px;
}

.quote-mark {
    color: var(--accent);

    font-family: Georgia, serif;
    font-size: 80px;
    line-height: 0.6;
}

.feedback-copy h3 {
    margin-top: 25px;

    font-size: 32px;
    line-height: 1.15;
}

.feedback-copy p {
    margin-top: 20px;

    color: var(--muted);
}

.feedback-form,
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    padding: 25px;

    border: 1px solid var(--border);
    border-radius: 18px;

    background: var(--panel);
}

.feedback-form label,
.contact-form label {
    display: flex;
    flex-direction: column;
    gap: 7px;

    color: var(--muted);

    font-size: 12px;
    font-weight: 700;
}

.feedback-form input,
.feedback-form select,
.feedback-form textarea,
.contact-form input,
.contact-form textarea {
    width: 100%;

    padding: 12px 13px;

    border: 1px solid var(--border);
    border-radius: 10px;

    outline: none;

    color: var(--text);
    background: rgba(255,255,255,0.035);

    resize: vertical;
}

.feedback-form input:focus,
.feedback-form select:focus,
.feedback-form textarea:focus,
.contact-form input:focus,
.contact-form textarea:focus {
    border-color: var(--border-accent);
}

.feedback-form option {
    color: #111;
}

.form-note {
    color: var(--muted);

    font-size: 10px;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.contact-item {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 16px;

    padding: 22px;

    border: 1px solid var(--border);
    border-radius: 15px;

    background: var(--panel);
}

.contact-item > span {
    color: var(--accent);

    font-family: "Courier New", monospace;
    font-weight: 800;
}

.contact-item h3 {
    font-size: 15px;
}

.contact-item p {
    margin-top: 4px;

    color: var(--muted);
    font-size: 12px;
}

.about-section {
    text-align: center;
}

.about-content {
    max-width: 850px;
    margin: auto;
}

.about-content h2 {
    margin-top: 15px;

    font-size: clamp(35px, 5vw, 58px);
    line-height: 1.05;
    letter-spacing: -2px;
}

.about-content > p {
    margin-top: 20px;

    color: var(--muted);
    font-size: 16px;
}

.principles {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 10px;

    margin-top: 45px;
}

.principles div {
    padding: 18px;

    border: 1px solid var(--border);
    border-radius: 13px;

    background: var(--panel);
}

.principles strong,
.principles span {
    display: block;
}

.principles strong {
    color: var(--accent);

    font-family: "Courier New", monospace;
    font-size: 11px;
}

.principles span {
    margin-top: 5px;

    font-weight: 700;
}

.legal-section {
    max-width: var(--max-width);
    margin: auto;

    padding: 20px 25px 110px;

    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 15px;
}

.legal-card {
    padding: 30px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background: var(--panel);
}

.legal-card h2 {
    margin-top: 10px;
}

.legal-card p {
    margin-top: 15px;

    color: var(--muted);
    font-size: 13px;
}

.site-footer {
    padding: 60px 25px 25px;

    border-top: 1px solid var(--border);

    background: #05080e;
}

.footer-main {
    max-width: var(--max-width);
    margin: auto;

    display: grid;
    grid-template-columns: 2fr repeat(3,1fr);
    gap: 50px;
}

.footer-brand p {
    max-width: 330px;

    margin-top: 15px;

    color: var(--muted);
    font-size: 13px;
}

.footer-column {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.footer-column h4 {
    margin-bottom: 7px;

    color: var(--text);
    font-size: 12px;
}

.footer-column a {
    color: var(--muted);
    text-decoration: none;
    font-size: 12px;
}

.footer-column a:hover {
    color: var(--accent);
}

.footer-bottom {
    max-width: var(--max-width);
    margin: 50px auto 0;

    padding-top: 20px;

    display: flex;
    justify-content: space-between;

    border-top: 1px solid var(--border);

    color: var(--muted);

    font-size: 11px;
}

.modal-overlay {
    position: fixed;
    inset: 0;

    z-index: 2000;

    display: none;
    place-items: center;

    padding: 20px;

    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(12px);
}

.modal-overlay.active {
    display: grid;
}

.modal {
    position: relative;

    width: min(680px, 100%);
    max-height: 88vh;

    overflow-y: auto;

    padding: 30px;

    border: 1px solid var(--border-accent);
    border-radius: 20px;

    background: var(--panel-solid);

    box-shadow: var(--shadow);
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;

    width: 34px;
    height: 34px;

    border: 1px solid var(--border);
    border-radius: 9px;

    color: var(--text);
    background: rgba(255,255,255,0.04);

    font-size: 22px;
}

.modal h2 {
    padding-right: 45px;
}

.modal-description {
    margin-top: 8px;
    color: var(--muted);
    font-size: 13px;
}

.calculator-form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin-top: 25px;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 10px;
}

.calculator-form label {
    display: flex;
    flex-direction: column;
    gap: 6px;

    color: var(--muted);
    font-size: 12px;
    font-weight: 700;
}

.calculator-form input,
.calculator-form select,
.calculator-form textarea {
    width: 100%;

    padding: 11px 12px;

    border: 1px solid var(--border);
    border-radius: 9px;

    outline: none;

    color: var(--text);
    background: rgba(255,255,255,0.04);
}

.calculator-form select option {
    color: #111;
}

.result-box {
    margin-top: 18px;

    padding: 18px;

    border: 1px solid var(--border-accent);
    border-radius: 12px;

    background: var(--accent-soft);
}

.result-box strong {
    display: block;

    color: var(--accent);

    font-size: 24px;
}

.result-box span {
    display: block;

    margin-top: 4px;

    color: var(--muted);

    font-size: 12px;
}

.tool-textarea {
    min-height: 170px;
}

.tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-top: 12px;
}

.small-btn {
    border: 1px solid var(--border);
    border-radius: 8px;

    padding: 9px 12px;

    color: var(--text);
    background: rgba(255,255,255,0.04);

    font-size: 12px;
    font-weight: 700;
}

.small-btn:hover {
    border-color: var(--border-accent);
    color: var(--accent);
}

.qr-preview {
    display: grid;
    place-items: center;

    min-height: 220px;

    margin-top: 20px;

    border: 1px dashed var(--border);
    border-radius: 12px;
}

.qr-preview img {
    width: 190px;
    height: 190px;

    border-radius: 8px;
}

.password-output {
    font-family: "Courier New", monospace;
    word-break: break-all;
}

.article-modal h3 {
    margin-top: 25px;
}

.article-modal p {
    margin-top: 14px;
    color: var(--muted);
    font-size: 14px;
}

.article-modal ul {
    margin: 15px 0 0 20px;
    color: var(--muted);
}

.toast {
    position: fixed;

    left: 50%;
    bottom: 25px;

    z-index: 3000;

    transform: translate(-50%, 120px);

    padding: 12px 17px;

    border: 1px solid var(--border-accent);
    border-radius: 10px;

    color: var(--text);
    background: var(--panel-solid);

    box-shadow: var(--shadow);

    opacity: 0;

    transition: 0.3s ease;

    font-size: 12px;
}

.toast.show {
    opacity: 1;
    transform: translate(-50%, 0);
}

.hidden {
    display: none !important;
}

@keyframes pulse {
    0%,100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.45;
        transform: scale(0.75);
    }
}

@keyframes floatCard {
    0%,100% {
        transform: perspective(900px) rotateY(-5deg) rotateX(3deg) translateY(0);
    }

    50% {
        transform: perspective(900px) rotateY(-5deg) rotateX(3deg) translateY(-10px);
    }
}

@keyframes floatingOne {
    0%,100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-13px);
    }
}

@keyframes floatingTwo {
    0%,100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(12px);
    }
}

@keyframes progressMove {
    from {
        width: 58%;
    }

    to {
        width: 88%;
    }
}

@media (max-width: 1100px) {

    .nav-links {
        gap: 14px;
    }

    .calculator-grid,
    .tool-grid {
        grid-template-columns: repeat(3,1fr);
    }

    .category-grid {
        grid-template-columns: repeat(3,1fr);
    }

    .quick-grid {
        grid-template-columns: repeat(2,1fr);
    }
}

@media (max-width: 900px) {

    .hero {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
    }

    .hero-content {
        margin: auto;
    }

    .hero-description {
        margin-left: auto;
        margin-right: auto;
    }

    .hero-buttons,
    .hero-stats {
        justify-content: center;
    }

    .hero-visual {
        min-height: 420px;
    }

    .nav-links {
        position: absolute;
        left: 15px;
        right: 15px;
        top: 72px;

        display: none;
        flex-direction: column;

        padding: 18px;

        border: 1px solid var(--border);
        border-radius: 14px;

        background: var(--panel-solid);
        box-shadow: var(--shadow);
    }

    .nav-links.active {
        display: flex;
    }

    .menu-btn {
        display: block;
    }

    .search-open {
        display: none;
    }

    .calculator-grid,
    .tool-grid {
        grid-template-columns: repeat(2,1fr);
    }

    .category-grid {
        grid-template-columns: repeat(2,1fr);
    }

    .coding-layout,
    .feedback-layout,
    .contact-layout {
        grid-template-columns: 1fr;
    }

    .article-grid {
        grid-template-columns: repeat(2,1fr);
    }

    .footer-main {
        grid-template-columns: repeat(2,1fr);
    }
}

@media (max-width: 600px) {

    .navbar {
        padding: 0 15px;
    }

    .section {
        padding: 75px 15px;
    }

    .quick-section {
        padding-left: 15px;
        padding-right: 15px;
    }

    .hero {
        padding-top: 65px;
    }

    .hero h1 {
        font-size: 47px;
        letter-spacing: -2.5px;
    }

    .hero-description {
        font-size: 15px;
    }

    .hero-stats {
        gap: 20px;
    }

    .hero-visual {
        min-height: 350px;
    }

    .main-tech-card {
        padding: 18px;
    }

    .floating-one {
        left: -3px;
        top: 50px;
    }

    .floating-two {
        right: -3px;
        bottom: 45px;
    }

    .quick-grid,
    .calculator-grid,
    .tool-grid,
    .category-grid,
    .article-grid,
    .principles,
    .legal-section {
        grid-template-columns: 1fr;
    }

    .section-heading h2 {
        letter-spacing: -1px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .search-box-large {
        flex-direction: column;
        gap: 7px;
        padding: 7px;
    }

    .search-box-large button {
        min-height: 43px;
    }

    .footer-main {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .footer-bottom {
        flex-direction: column;
        gap: 8px;
    }

    .modal {
        padding: 23px;
    }
}

@media (min-width: 1800px) {

    body {
        font-size: 18px;
    }

    .navbar,
    .section,
    .quick-section,
    .legal-section,
    .footer-main,
    .footer-bottom {
        max-width: 1500px;
    }

    .hero h1 {
        font-size: 90px;
    }

    .section {
        padding-top: 140px;
        padding-bottom: 140px;
    }
}

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
