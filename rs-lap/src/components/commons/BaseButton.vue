<template>
    <button v-if="type == 'button'">
        <slot> </slot>
    </button>
    <router-link
        v-else
        :to="{
            path: path,
            params: {
                ...params
            },
            name: name,
            query: {
                ...query
            }
        }"
    >
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button'
        },
        className: String,
        path: String,
        name: String,
        params: {
            type: Object,
            require: false,
        },
        query: {
            type: Object,
            require: false,
        }
    }
};
</script>

<style lang="scss" scoped>
a,
button {
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
    outline: none;
    transition: all ease 0.3s;
    &:hover {
        background-color: #270041;
        border-color: #270041;
    }
    &.outline {
        background-color: transparent;
        border-color: #270041;
        color: #270041;
        &:hover {
            background-color: #edd2ff;
        }
    }
    &.flat {
        background-color: transparent;
        color: #3a0061;
        border: none;
        &:hover {
            background-color: #edd2ff;
        }
    }
}
</style>
