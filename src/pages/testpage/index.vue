<script setup></script>

<template>
  <div class="parentcontainer">
    parent-container
    <div class="boxcontent">content-box</div>
    <div class="boxborder">border-box</div>
  </div>
</template>

<style scoped>
.parentcontainer {
  width: 100%;
  height: 100%;
}

.boxcontent {
  width: 100%;
  height: 250px;
  box-sizing: content-box;
  border: solid #5b6dcd 10px;
  /* padding: 5px; */
}

.boxborder {
  width: 100%;
  height: 250px;
  box-sizing: border-box;
  border: solid #5b6dcd 10px;
  /* padding: 5px; */
}
</style>
