<template>
    <span class="badge">
        <slot></slot>
    </span>
</template>

<script>
export default {}
</script>

<style lang="scss">
.badge {
    background-color: #ccc;
    color: #252525;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin-right: 0.5rem;
    color: #fff;
    text-transform: uppercase;
    &.frontend {
        background-color: #3d008d;
    }
    &.backend {
        background-color: #71008d;
    }
    &.career {
        background-color: #8d006e;
    }
}
</style>