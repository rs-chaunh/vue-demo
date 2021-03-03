<template>
  <div class="actions">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    .actions {
      margin: .5rem 0;
      display: flex;
      justify-content: flex-end;
    }
</style>
