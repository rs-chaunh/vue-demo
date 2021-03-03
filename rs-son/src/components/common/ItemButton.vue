<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
button {
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  outline: none;
}
button.outline {
  outline: none;
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}
button.outline:hover {
  background-color: #edd2ff;
}
button:hover {
  background-color: #270041;
  border-color: #270041;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}
.outline:hover {
  background-color: #edd2ff;
}
</style>
