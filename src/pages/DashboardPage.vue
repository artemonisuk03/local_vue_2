<template>
  <main>
    <div class="main_contents">
      <section class="banners">
        <swiper :pagination="true" :modules="modules" class="swiper_carousel">
          <swiper-slide>
            <img src="@/assets/images/beach.jpg" class="swiper_image" />
          </swiper-slide>
          <swiper-slide>
            <img src="@/assets/images/starfish.jpg" class="swiper_image" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="leaderboard"></section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

defineOptions({ name: 'DashboardPage' })

const modules = [Pagination]
</script>

<style scoped>
main {
  box-sizing: border-box;
  width: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(244, 243, 250);
}

.main_contents {
  padding-top: calc(100px + 70px);
  width: 1000px;
  display: flex;
  flex-direction: column;
}

.banners {
  height: 600px;
  margin-block: 30px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  border-radius: 16px;
}

.swiper_carousel {
  height: 100%;
  width: 100%;
  border-radius: 16px;
  z-index: 0;
}

.swiper_image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.leaderboard {
  height: 500px;
  background-color: white;
  margin-block: 30px;
  box-shadow: 0px 0px 15px 0px rgb(211, 211, 211);
  border-radius: 16px;
}

@media screen and (max-width: 1050px) and (min-width: 540px) {
  main {
    padding-inline: 32px;
  }

  .main_contents {
    width: 100%;
  }
}

@media screen and (max-width: 540px) {
  main {
    padding-inline: 32px;
  }

  .main_contents {
    width: 100%;
    padding-top: 70px;
  }
}
</style>
