<template>
    <li>
        <div>
            <a :href="'mailto: ' + request.email">{{ request.email }}</a>
        </div>
        <p>{{ request.message }}</p>
    </li>
</template>

<script>
export default {
    props: {
        request: Object
    }
}
</script>

<style lang="scss" scoped>
li {
    margin: 1rem 0;
    border: 1px solid #ccc;
    padding: 1rem;
    div {
        a {
            color: #3d008d;
            text-decoration: none;
            font-weight: 700;
        }
    }
    p {
        margin: 0.5rem 0 0 0;
    }
}
</style>
