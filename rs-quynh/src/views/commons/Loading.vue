<template>
  <section>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 20px auto;

  div {
    animation-name: loading;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-direction: cubic-bezier(0.5, 0, 0.5, 1);

    transform-origin: 40px 40px;

    &::after {
      content: " ";
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #3D008D;
      margin: -4px 0 0 -4px;
    }

    &:nth-child(1) {
      animation-delay: -0.036s;

      &::after {
        top: 63px;
        left: 63px;
      }
    }
    &:nth-child(2) {
      animation-delay: -0.072s;

      &::after {
        top: 68px;
        left: 56px;
      }
    }
    &:nth-child(3) {
      animation-delay: -0.108s;

      &::after {
        top: 71px;
        left: 48px;
      }
    }
    &:nth-child(4) {
      animation-delay: -0.144s;

      &::after {
        top: 72px;
        left: 40px;
      }
    }
    &:nth-child(5) {
      animation-delay: -0.18s;

      &::after {
        top: 71px;
        left: 32px;
      }
    }
    &:nth-child(6) {
      animation-delay: -0.216s;

      &::after {
        top: 68px;
        left: 24px;
      }
    }
    &:nth-child(7) {
      animation-delay: -0.252s;

      &::after {
        top: 63px;
        left: 17px;
      }
    }
    &:nth-child(8) {
      animation-delay: -0.288s;

      &::after {
        top: 56px;
        left: 12px;
      }
    }

    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>