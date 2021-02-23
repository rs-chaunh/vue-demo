<template>
  <div class="progress">
    <div
      class="progress-bar progress-bar-striped"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :style="{ width: `${100 - progress}%` }"
    ></div>
  </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number, 
            default: 0
        }
    }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  background: #ffffff80;
  height: 5px;
}
</style>