<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'

// Router mengarahkan petugas ke halaman login saat memilih logout.
const router = useRouter()

function keluarDemo(): void {
  // Saat ini hanya kembali ke login; belum ada sesi backend untuk dihapus.
  void router.replace('/login')
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">P</div>

        <div>
          <strong>PACS</strong>
          <span>RSUD Imaging</span>
        </div>
      </div>

      <nav
        class="main-navigation"
        aria-label="Navigasi utama"
      >
        <RouterLink
          to="/worklist"
          class="navigation-item"
          active-class="active"
        >
          <span aria-hidden="true">▦</span>
          Worklist
        </RouterLink>

        <span
          class="navigation-item navigation-item-disabled"
          aria-disabled="true"
        >
          <span aria-hidden="true">⚙</span>
          Settings
        </span>
      </nav>

      <div class="sidebar-footer">
        <span class="status-dot"></span>
        System operational
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <span class="breadcrumb">PACS / Worklist</span>
        </div>

       <!-- Menu ini hanya menampilkan profil petugas dummy -->
        <details class="user-menu">
          <summary class="user-profile" aria-label="Buka menu profil petugas">
             <!-- Profil statis hanya untuk tampilan petugas -->
                <div class="avatar" aria-hidden="true">SP</div>

                <div class="user-profile-info">
                  <strong>Siti Patimah</strong>
                  <span>Radiografer . Radiologi</span>
                  <small>ID Pegawai: PGW-001</small>
                </div>

                <span class="user-menu-arrow" aria-hidden="true">↓</span>
          </summary>

          <div class="user-menu-panel">
            <RouterLink class="user-menu-link" to="/profile">
              Profile Saya
            </RouterLink>

            <button type="button" class="user-menu-link user-menu-logout" @click="keluarDemo">
                Logout
            </button>

          </div>
        </details>
      </header>

      <RouterView />
    </main>
  </div>
</template>