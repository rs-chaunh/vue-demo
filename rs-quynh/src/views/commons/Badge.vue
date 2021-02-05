<template>
  <span class="badge" :class="area">
    {{ area }}
  </span>
</template>

<script>
export default {
    props: {
        area: {
            type: String,
            required: true
        },
    }
}
</script>

<style lang="scss" scoped>
    .badge {
        border-radius: 30px;
        padding: .5rem 1.5rem;
        display: inline-block;
        margin-right: .5rem;
        background-color: #ccc;
        color: #252525;
        text-transform: uppercase;
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