<template>
  <main>
    <div class="main_contents">
      <h1 class="page_title">Задания</h1>
    </div>
  </main>
</template>

<script setup lang="ts">
defineOptions({ name: 'TasksPage' })
</script>

<style scoped>
main {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(244, 243, 250);
  min-height: 100vh;
}

.main_contents {
  padding-top: calc(100px + 70px);
  width: 1000px;
  display: flex;
  flex-direction: column;
}

.page_title {
  font-family: Nagel;
  font-size: 2rem;
  color: rgb(65, 65, 65);
  margin-block: 30px;
}

@media screen and (max-width: 1050px) {
  main {
    padding-inline: 32px;
  }

  .main_contents {
    width: 100%;
  }
}

@media screen and (max-width: 540px) {
  .main_contents {
    padding-top: 70px;
  }
}
</style>
