<template>
  <coaches
    :filterOption="filterOption"
    :filterCoaches="filterCoaches"
    :isAuthenticated="isAuthenticated"
    :isHadRegisterACoach="isHadRegisterACoach"
    :refreshPage="refreshPage"
    @toggleFilterOption="toggleFilterOption"
  ></coaches>
</template>

<script>
import { mapGetters } from 'vuex';

import Coaches from '../views/Coaches/Coaches.vue'
export default {
    data() {
        return {
            filterOption: ["frontend", "backend", "career"],
        }
    },
    components: { Coaches },
    computed: {
        ...mapGetters(['isAuthenticated', 'getCoaches']),

        filterCoaches() {
            return this.getCoaches.filter((coach) => {
                let check = false;
                if (coach.areas) {
                    coach.areas.forEach((area) => {
                        if (this.filterOption.indexOf(area) !== -1) 
                            check = true;
                    });
                }
                return check;
            });
        },

        isHadRegisterACoach() {
            const userId = localStorage.getItem("userId");
            let check = false;
            if (userId) {
                this.getCoaches.forEach((coach) => {
                    if (coach.userId === userId)
                        check = true;
                })
            }
            return check;
        }
    },
    methods: {
        toggleFilterOption(option) {
            const index = this.filterOption.indexOf(option);
            if (index !== -1) {
                this.filterOption.splice(index, 1);
            } else {
                this.filterOption.push(option);
            }
        },
        refreshPage() {
            this.$store.dispatch("getAllCoaches");
        }
    },
    created() {
        this.$store.dispatch('getAllCoaches')
    },
}
</script>

<style>

</style>