<template>
    <router-link v-if="href" :to="href" class="btn btn-outline">
        <slot></slot>
    </router-link>
    <button v-else class="btn btn-outline">
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
    .btn-outline {
        background-color: transparent;
        border-color: #270041;
        color: #270041;

        &:hover {
            background-color: #edd2ff;
        }
    }
</style>