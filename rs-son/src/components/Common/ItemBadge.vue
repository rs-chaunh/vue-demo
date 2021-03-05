<template>
  <span class="badge" >
      <slot></slot>
  </span>
</template>

<script>
export default {
}
</script>

<style scoped lang = "scss">
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
.frontend {
  background-color: #3d008d;
  color: #fff;
}
.backend {
  background-color: #71008d;
  color: #fff;
}
.career {
  background-color: #8d006e;
  color: #fff;
}
</style>