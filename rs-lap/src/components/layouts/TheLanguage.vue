<template>
    <div class="custom-select" tabindex="0" @blur="open = false">
        <div class="selected" :class="{ open: open }" @click="open = !open">
            {{ selected.content }}
        </div>
        <transition name="animate">
            <div class="items" v-if="open">
                <div
                    v-for="(option, i) in options"
                    :key="i"
                    @click="setLanguage(option)"
                >
                    {{ option.content }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                { content: "Tiếng việt", value: "vi" },
                { content: "English", value: "en" }
            ],
            open: false
        };
    },
    methods: {
        setLanguage(option) {
            this.open = false;
            this.$store.commit('SET_STATE_LANG', option);
            this.$i18n.locale = option.value;
            localStorage.setItem("lang", JSON.stringify(this.selected));
        }
    },
    computed: {
        selected() {
            return this.$store.state.lang;
        }
    },
    mounted() {
        this.$i18n.locale = this.selected.value;
    }
};
</script>

<style scoped lang="scss">
.animate-enter-from,
.animate-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.animate-enter-to,
.animate-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.animate-enter-active,
.animate-leave-active {
    transition: 0.5s;
}

.custom-select {
    position: relative;
    width: 120px;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;
    .selected {
        background-color: #fff;
        border-radius: 6px;
        border: 1px solid #000;
        color: #000;
        padding-left: 1em;
        cursor: pointer;
        user-select: none;
        // display: flex;
        // align-items: center;
        // img {
        //     width: 20%;
        // }
        &.open {
            border: 1px solid #000;
            border-radius: 6px 6px 0px 0px;
        }
        &:after {
            position: absolute;
            content: "";
            top: 22px;
            right: 1em;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-color: #000 transparent transparent transparent;
        }
    }
    .items {
        color: #000;
        border-radius: 0px 0px 6px 6px;
        overflow: hidden;
        border-right: 1px solid #000;
        border-left: 1px solid #000;
        border-bottom: 1px solid #000;
        position: absolute;
        background-color: #fff;
        left: 0;
        right: 0;
        z-index: 1;
        div {
            // img {
            //     width: 20%;
            //     margin-right: 6px;
            // }
            // display: flex;
            // align-items: center;
            // justify-content: flex-start;
            // flex-wrap: wrap;
            width: 100%;
            color: #000;
            padding-left: 1em;
            cursor: pointer;
            user-select: none;
            &:hover {
                transition: all ease 0.3s;
                background-color: #3d008d;
                color: #fff;
            }
        }
    }
}
</style>
