<template>
  <div class="app">
    <header class="app-header">
      <div id="header" class="header-content">
        <router-link to="/">
          <img
            id="app_logo"
            alt="Automated Chief Finance Officer"
            class="logo"
            src="./assets/logo.png"
          />
        </router-link>
        <h1 class="app-title">Automated Chief Financial Officers</h1>
      </div>

      <div class="nav-buttons">
        <router-link to="/quotations">
          <button id="quotation-list-btn" class="nav-button">
            <span class="icon">❝</span>
            <span class="list-btn-label">quotation</span>
          </button>
        </router-link>

        <router-link to="/invoices">
          <button id="invoice-list-btn" class="nav-button">
            <span class="icon">📄</span>
            <span class="list-btn-label">invoice</span>
          </button>
        </router-link>

        <router-link to="/receipts">
          <button id="receipt-list-btn" class="nav-button">
            <span class="icon">💰</span>
            <span class="list-btn-label">receipt</span>
          </button>
        </router-link>
      </div>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #1976d2; /* primary color */
  color: white;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
}

.logo {
  width: 130px;
  height: 80px;
  object-fit: contain;
  margin-right: 16px;
}

.app-title {
  font-size: 1.5rem;
  margin: 0;
}

.nav-buttons {
  display: flex;
  gap: 8px;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid white;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  transition: opacity 0.2s;
}

.nav-button:hover {
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.1);
}

.nav-button .icon {
  font-size: 1.2em;
}

.app-main {
  flex: 1;
  padding: 16px;
}

@media (max-width: 600px) {
  .list-btn-label {
    display: none;
  }

  .nav-button {
    padding: 8px;
  }

  .nav-button .icon {
    margin: 0;
  }

  .app-title {
    font-size: 1.2rem;
  }
}

/* Global print styles */
@media print {
  .app-header {
    display: none !important;
  }

  .app-main {
    padding: 0 !important;
  }
}
</style>
