/* css-1 AFTER CORRECTING MISSING CATEGORY SECTION in App.jsx */
/* ========================================
   1. Global styles
======================================== */

* {
  box-sizing: border-box;
}

:root {
  /* --brand-red: #e60000;  */ /* previous shade */
  /*--brand-red: #8b261e; */ /*Brick Red*/
  /*--brand-red: #a60000;*/ /*Crimson Red*/
  --cream: #F5f2e9;
  --text: #333333;
  --muted: #737373;
  --white: #ffffff;
  --border: #e5dfd5;
  --soft-red: #fff0f0;
  --soft-cream: #faf8f2;
  --green: #287a45;
  --soft-green: #eaf6ed;
  --shadow: 0 4px 16px rgba(51, 51, 51, 0.06);
}

html {
  min-width: 320px;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text);
  background: var(--cream);
  line-height: 1.5;
}

button,
input,
textarea {
  font: inherit;
}

button {
  border: none;
  border-radius: 7px;
  padding: 10px 15px;
  background: var(--brand-red);
  color: var(--white);
  cursor: pointer;
  transition: opacity 0.2s ease, background 0.2s ease;
}

button:hover:not(:disabled) {
  opacity: 0.88;
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

input,
textarea {
  width: 100%;
  padding: 11px 12px;
  color: var(--text);
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 7px;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: var(--brand-red);
  box-shadow: 0 0 0 3px rgba(230, 0, 0, 0.08);
}

textarea {
  resize: vertical;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2,
h3 {
  color: var(--brand-red);
}

h1 {
  margin-bottom: 8px;
  font-size: 28px;
}

h2 {
  margin-bottom: 12px;
  font-size: 21px;
}

h3 {
  margin-bottom: 10px;
  font-size: 17px;
}

p {
  overflow-wrap: anywhere;
}

.muted {
  color: var(--muted);
  font-size: 14px;
}

/* ========================================
   2. Login page
======================================== */

.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 30px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);
}

.login-card h1 {
  margin-bottom: 0;
}

.login-card > p {
  margin-bottom: 4px;
}

.login-card .notice {
  margin-top: 4px;
  margin-bottom: 0;
}

.brand-mark {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: var(--brand-red);
  color: var(--white);
  border-radius: 12px;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 1px;
}

.primary-button {
  width: 100%;
  margin-top: 6px;
}

/* ========================================
   3. Main dashboard layout
======================================== */

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 245px minmax(0, 1fr);
}

.sidebar {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 24px 16px;
  background: var(--white);
  border-right: 1px solid var(--border);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
}

.sidebar-brand h2 {
  margin-bottom: 2px;
  font-size: 18px;
}

.sidebar-brand .muted {
  margin-bottom: 0;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-button,
.nav-active {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
}

.nav-button {
  background: transparent;
  color: var(--text);
}

.nav-button:hover:not(:disabled) {
  background: var(--soft-red);
  color: var(--brand-red);
  opacity: 1;
}

.nav-active {
  background: var(--brand-red);
  color: var(--white);
}

.logout-button {
  width: 100%;
  margin-top: auto;
  background: var(--soft-red);
  color: var(--brand-red);
}

.logout-button:hover:not(:disabled) {
  background: var(--brand-red);
  color: var(--white);
  opacity: 1;
}

/* ========================================
   4. Main content and page heading
======================================== */

.main-content {
  min-width: 0;
  padding: 30px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 24px;
}

.page-header h1 {
  text-transform: capitalize;
}

.page-header p {
  margin-bottom: 0;
}

.eyebrow {
  margin-bottom: 5px;
  color: var(--brand-red);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.secondary-button {
  flex-shrink: 0;
  background: var(--white);
  color: var(--text);
  border: 1px solid var(--border);
}

/* ========================================
   5. Overview and statistics
======================================== */

.dashboard-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.welcome-panel {
  padding: 24px;
  background: var(--white);
  border: 1px solid var(--border);
  border-left: 5px solid var(--brand-red);
  border-radius: 10px;
}

.welcome-panel h2 {
  margin-bottom: 8px;
}

.welcome-panel p {
  margin-bottom: 0;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  min-width: 0;
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.stat-card p {
  margin-bottom: 10px;
  color: var(--muted);
  font-size: 14px;
}

.stat-card strong {
  color: var(--brand-red);
  font-size: 30px;
}

/* ========================================
   6. Panels and section headings
======================================== */

.panel {
  min-width: 0;
  padding: 22px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.panel > .muted {
  margin-bottom: 18px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.section-heading p {
  margin-bottom: 0;
}

/* ========================================
   7. Forms
======================================== */

.data-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 9px;
  max-width: 600px;
}

.data-form label:not(:first-child) {
  margin-top: 8px;
}

.data-form button {
  align-self: flex-start;
  margin-top: 8px;
}

/* ========================================
   8. Record lists and record cards
======================================== */

.record-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.record-card {
  min-width: 0;
  padding: 18px;
  background: var(--soft-cream);
  border: 1px solid var(--border);
  border-radius: 9px;
}

.record-card h3 {
  overflow-wrap: anywhere;
}

.record-card p {
  margin-bottom: 8px;
}

.record-card p:last-child {
  margin-bottom: 0;
}

.record-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.record-header h3 {
  margin-bottom: 0;
}

.record-id {
  font-size: 12px;
  overflow-wrap: anywhere;
}

.record-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.food-price {
  color: var(--brand-red);
  font-size: 18px;
  font-weight: 700;
}

/* ========================================
   9. Status labels
======================================== */

.status {
  display: inline-block;
  flex-shrink: 0;
  padding: 4px 9px;
  border-radius: 20px;
  background: #eeeeee;
  color: var(--text);
  font-size: 11px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.status-active,
.status-confirmed {
  background: var(--soft-green);
  color: var(--green);
}

.status-draft {
  background: #fff3d8;
  color: #875b00;
}

.status-cancelled,
.status-inactive,
.status-unknown {
  background: var(--soft-red);
  color: var(--brand-red);
}

/* ========================================
   10. Messages and empty states
======================================== */

.notice {
  margin-bottom: 20px;
  padding: 12px 15px;
  background: var(--white);
  border: 1px solid var(--border);
  border-left: 4px solid var(--brand-red);
  border-radius: 7px;
  overflow-wrap: anywhere;
}

.empty-state {
  margin: 0;
  padding: 20px;
  background: var(--soft-cream);
  border: 1px dashed var(--border);
  border-radius: 8px;
  color: var(--muted);
  text-align: center;
}

/* ========================================
   11. Tablet layout
======================================== */

@media (max-width: 1000px) {
  .app-shell {
    grid-template-columns: 210px minmax(0, 1fr);
  }

  .main-content {
    padding: 22px;
  }

  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ========================================
   12. Mobile layout
======================================== */

@media (max-width: 650px) {
  .app-shell {
    grid-template-columns: minmax(0, 1fr);
  }

  .sidebar {
    min-height: auto;
    padding: 16px;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .navigation {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .logout-button {
    margin-top: 0;
  }

  .main-content {
    padding: 16px;
  }

  .page-header {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .page-header h1 {
    font-size: 25px;
  }

  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .stat-card {
    padding: 15px;
  }

  .stat-card strong {
    font-size: 25px;
  }

  .panel {
    padding: 16px;
  }

  .record-card {
    padding: 14px;
  }

  .record-header {
    flex-wrap: wrap;
  }

  .login-card {
    padding: 24px;
  }
}

@media (max-width: 380px) {
  .stat-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .navigation {
    grid-template-columns: minmax(0, 1fr);
  }

  .record-actions button {
    width: 100%;
  }
}
