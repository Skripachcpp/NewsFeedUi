<template>
  <div class="layout">
    <header class="header" />

    <main class="main">
      <slot />
    </main>

    <footer class="footer"/>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0;
}

.main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.footer {
  background-color: #f7fafc;
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  text-align: center;
  color: #718096;
}
</style>

<style>
.error {
  gap: 12px;
  font-weight: 700;
  color: rgb(181, 20, 20);
}

.btn {
  padding: 1px 8px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}

.btn-blue {
  background: #3b82f6;
  color: white;
}

.btn-blue:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-green {
  background: #10b981;
  color: white;
}

.btn-green:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.btn-white {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
}

.btn-link {
  color: #667eea;
  padding: 0.5rem 0;
  background: none;
  font-weight: 600;
  text-decoration: none;
}
</style>
