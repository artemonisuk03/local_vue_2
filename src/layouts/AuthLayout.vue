<template>
  <main class="auth_layout">
    <slot />
  </main>
</template>

<script setup lang="ts">
defineOptions({ name: 'AuthLayout' })
</script>

<style scoped>
.auth_layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(244, 243, 250);
}
</style>
