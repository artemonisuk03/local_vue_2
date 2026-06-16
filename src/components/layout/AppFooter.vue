<template>
  <footer>
    <div class="footer_contents">
      <div>
        Наши носяры:
        <span> artemonisuk03@gmail.com </span>
        <span> endermend05@gmail.com </span>
      </div>
      <div>
        Наши телеграмы:
        <span> artemonisuk03@gmail.com </span>
        <span> endermend05@gmail.com </span>
      </div>
      <div>
        Репозиторий сайта на GitHub:
        <span> https://github.com/endermend/web-suffer-back </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppFooter' })
</script>

<style scoped>
footer {
  background-color: rgb(74, 50, 83);
  height: 300px;
  width: 100%;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  display: flex;
  justify-content: center;
}

.footer_contents {
  font-family: bahnshchrift;
  color: white;
  width: 1000px;
  display: flex;
  justify-content: space-between;
}

.footer_contents div {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}

.footer_contents div span {
  border-radius: 8px;
  margin-block: 8px;
  padding: 32px;
  background-color: rgb(87, 60, 97);
}
</style>
