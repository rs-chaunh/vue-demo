<template>
    <the-header></the-header>
    <router-view v-slot="{ Component }">
        <transition name="animate">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>

import TheHeader from "./components/layouts/TheHeader";
export default {
    name: "App",
    components: {
        TheHeader
    },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || "Find Your Coaches";
            }
        }
    },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);
body {
    margin: 0;
}

* {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
}

.animate-enter-from {
    transform: translateY(-50px);
    opacity: 0;
}

.animate-enter-to,
.animate-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.animate-enter-active {
    transition: 0.5s;
    transition-delay: 0.5s;
}

.animate-leave-active {
    transition: 0.5s;
}
.animate-leave-to {
    transform: translateY(50px);
    opacity: 0;
}
</style>
