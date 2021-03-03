<template>
  <span :class="['badge', myArea]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "MyBadge",
  props: ["area"],
  data() {
    return {
      myArea: this.area,
    };
  },
};
</script>

<style scoped>
.badge {
  color: #fff;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.backend {
  background-color: #71008d;
}

.frontend {
  background-color: #3d008d;
}

.fullstack {
  background-color: #8d006e;
}
</style>
