<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">P</div>

        <div>
          <strong>PACS</strong>
          <span>Medical Imaging</span>
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
          <span aria-hidden="true">◉</span>
          Studies
        </span>

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

        <div class="user-profile">
          <div class="avatar">SA</div>

          <div>
            <strong>Super Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </header>

      <RouterView />
    </main>
  </div>
</template>