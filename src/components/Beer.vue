<script>
  import beerImage from "../assets/beer.png";

  export default {
    props: {
      full: {
        type: Boolean,
        default: true
      },

      order: {
        type: Number,
        default: 1
      }
    },

    data() {
      return {
        beerImage: beerImage
      }
    },
  }
</script>

<template>
  <zoom-center-transition mode="out-in">
    <div :key="full" class="beer">
      <template v-if="full">
        <span style="font-size: 50px;" v-on:click="$emit('remove')">
          🍺
        </span>
      </template>
      <template v-if="!full">
        <div style="height: 100%; width: 100%; background: #ccc; border-radius: 100%; display: flex; align-items: center; justify-content: center;">
          {{ order }}
        </div>
      </template>
    </div>
  </zoom-center-transition>
</template>

<style scoped>
  .beer {
    display: flex;
    width: 50px;
    margin: 16px;
  }
</style>
