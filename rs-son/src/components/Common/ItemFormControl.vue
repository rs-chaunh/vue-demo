//FIXED
<template>
  <div class="form-control">
      <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss"> 
.form-control {
  margin: 0.5rem 0;
}
.form-control label {
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: block;
}
.form-control input,
.form-control textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
</style>