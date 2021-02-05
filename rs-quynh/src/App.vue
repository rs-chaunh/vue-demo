<template>

</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

.btn {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  font-family: "Roboto", sans-serif;
  outline: none;
  transition: 0.2s all;

  &:hover {
    background-color: #270041;
    border-color: #270041;
  }
}

h1 {
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
}

h2 {
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
}

h3 {
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
</style>
