import {ZoomCenterTransition} from 'vue2-transitions';

export default {
  components: {
    ZoomCenterTransition
  },

  props: {
    full: {
      type: Boolean,
      default: true
    }
  },

  template: `
    <zoom-center-transition mode="out-in">
      <span v-on:click="$emit('remove')" v-show="full">
        <i class="fas fa-beer" style="font-size:30px"></i>
      </span>
    </zoom-center-transition>
  `
}