<template>
    <router-link v-if="href" :to="href" class="btn">
        <slot></slot>
    </router-link>
    <button v-else class="btn">
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

</style>