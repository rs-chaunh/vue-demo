<template>
  <div class="form-control" :class="error ? 'error' : null">
    <label :for="id">{{ label }}</label>
    <slot></slot>
    <p v-if="error"> {{ error }} </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      require: true,
    },
    label: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.form-control {
  margin: 0.5rem 0;
  &.error {
    label {
      color: red;
    }
  }
  label {
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: block;
  }
  input {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
    outline: none;

    &:focus {
      border-color: rgb(61, 0, 141);
    }
  }
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
    outline: none;

    &:focus {
      border-color: rgb(61, 0, 141);
    }
  }
}
</style>