<template>
    <base-card>
        <h2>Page not found</h2>
        <p>
            This page could not be found - maybe check out all our
            <router-link to="/">coaches</router-link>.
        </p>
    </base-card>
</template>

<script>
import BaseCard from "../../commons/BaseCard";
export default {
    components: {
        BaseCard
    }
};
</script>

<style></style>
