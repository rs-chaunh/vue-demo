<template>
    <the-header></the-header>
    <router-view v-slot="{ Component }">
        <transition name="animate">
            <component :is="Component" />
        </transition>
    </router-view>
    <base-toast></base-toast>
</template>

<script>
import BaseToast from './components/commons/BaseToast.vue';
import TheHeader from "./components/layouts/TheHeader";
export default {
    name: "App",
    components: {
        TheHeader,
        BaseToast
    },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || "Find Your Coaches";
            }
        }
    },
    created() {
        if(this.$store.getters.isAuthenticated) {
            this.$store.dispatch("getUserTokenDevices");
            this.$store.dispatch("getAllRequest");
        }
    },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css);
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
