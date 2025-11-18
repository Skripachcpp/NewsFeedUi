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

