<template>
    <div>
        <section>
            <card>
                <h2>Find Your Coach</h2>
                <filter-option v-for="area in dataAreas"
                    :checked="true" 
                    :id="area.id" 
                    :label="area.name.split(' ')[0]" 
                    :key="area.id"
                    @change="toggleFilterOption(area.id)"
                ></filter-option>
            </card>
        </section>
        
        <section>
            <card>
                <div class="controls">
                    <button-outline @click="refreshPage">Refresh</button-outline>
                    <button-purple v-if="!isAuthenticated" :href="'/auth?redirect=register'">Login to Register as Coach</button-purple>
                    <button-purple v-else-if="!isHadRegisterACoach" :href="'/register'">Register as Coach</button-purple>
                </div>
                <loading v-if="isLoading"></loading>
                <ul v-else-if="filterCoaches.length > 0">
                    <coaches-item v-for="(coach, key) of filterCoaches"
                        :key="key"
                        :coach="coach"
                    ></coaches-item>
                </ul>
            </card>
        </section>
    </div>
</template>

<script>
import Card from '../commons/Card.vue';
import ButtonOutline from '../commons/Button/ButtonOutline';
import ButtonPurple from '../commons/Button/ButtonPurple';
import FilterOption from '../commons/FilterOption.vue';
import CoachesItem from './CoachesItem.vue';
import Loading from '../commons/Loading.vue';

export default {
    props: {
        filterOption: {
            type: Array,
            required: true
        },
        filterCoaches: {
            type: Array,
            default: () => []
        },
        isAuthenticated: {
            type: Boolean,
            default: false
        },
        isHadRegisterACoach: {
            type: Boolean,
            default: false
        },
        refreshPage: {
            type: Function,
        }
    },
    components: { 
        Card,
        ButtonOutline,
        ButtonPurple,
        FilterOption,
        CoachesItem,
        Loading
    },
    computed: {
        dataAreas() {
            return this.$store.getters.getDataAreas
        },
        isLoading() {
            return this.$store.getters.getIsLoading
        }
    },
    methods: {
        toggleFilterOption(option) {
            this.$emit("toggleFilterOption", option)
        }
    },
}
</script>

<style lang="scss" scoped>
    h2 {
        margin: .5rem 0;
    }

    .controls {
        display: flex;
        justify-content: space-between;
    } 

    ul {
        list-style-type: none;
    }
</style>