<template>
    <li>
        <h3>{{ fullname }}</h3>
        <h4>${{ coach.hourlyRate }}/hour</h4>
        <div>
            <badge v-for="(area, index) of coach.areas" :area="area" :key="index" ></badge>
        </div>
        <coaches-action>
            <custom-button type="outline" :href="{ name: 'CoachesDetailContact', params: { id: coach.id }}">Contact</custom-button>
            <custom-button type="purple" :href="{ name: 'CoachesDetail', params: { id: coach.id }} ">View Details</custom-button>
        </coaches-action>
    </li>
</template>

<script>
import CoachesAction from './CoachesAction.vue'
import Badge from '../commons/Badge.vue'
import CustomButton from '../commons/CustomButton'
export default {
    components: { Badge, CoachesAction, CustomButton },
    props: {
        coach: {
            type: Object,
        }
    },
    computed: {
        fullname() {
            return this.coach.firstName + " " + this.coach.lastName;
        }
    }
    
}
</script>

<style lang="scss" scoped>
    li {
        margin: 1rem 0;
        border: 1px solid #424242;
        border-radius: 12px;
        padding: 1rem;

        h3 {
            text-transform: capitalize;
            margin: .5rem 0;
            font-size: 1.5rem;
        }

        h4 {
            margin: .5rem 0;
        }

        div {
            margin: .5rem 0;
        }
    }
</style>