<template>
    <header>
        <nav>
            <h1>
                <router-link :to="{ tag: 'a', path: '/coaches' }">
                    Find a Coach
                </router-link>
            </h1>
            <ul>
                <li>
                    <router-link :to="{ tag: 'a', path: '/coaches' }">
                        All Coaches
                    </router-link>
                </li>
                <li v-if="auth">
                    <router-link :to="{ tag: 'a', path: '/requests' }">
                        Requests
                    </router-link>
                </li>
                <li>
                    <base-button v-if="auth" @click="onLogout" >
                        Logout
                    </base-button>
                    <router-link v-else :to="{ tag: 'a', path: '/auth' }">
                        Login
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import BaseButton from "../commons/BaseButton"
export default {
    data() {
        return {}
    },
    components: {
        BaseButton,
    },
    computed: {
        auth() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        onLogout() {
            this.$store.dispatch("logout")
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 5rem;
    background-color: #3d008d;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
        text-decoration: none;
        color: #f391e3;
        display: inline-block;
        padding: 0.75rem 1.5rem;
    }
    nav {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            margin: 0;
            a {
                border: 1px solid transparent;
                color: #fff;
            }
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
                margin: 0 0.5rem;
                a {
                    border: 1px solid transparent;
                    &:hover {
                        border: 1px solid #f391e3;
                    }
                    &.router-link-active {
                        border: 1px solid #f391e3;
                    }
                }
            }
        }
    }
}
</style>
