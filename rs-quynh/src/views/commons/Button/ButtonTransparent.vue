<template>
    <router-link v-if="href" :to="href" class="btn btn-transparent">
        <slot></slot>
    </router-link>
    <button v-else type="button" class="btn btn-transparent">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        href: {
            type: String,
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn-transparent {
        background-color: transparent;
        color: #3a0061;
        border: none;

        &:hover {
            background-color: #edd2ff;
        }
    }
</style>