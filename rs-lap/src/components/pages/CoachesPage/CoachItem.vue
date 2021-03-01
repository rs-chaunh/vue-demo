<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ coach.hourlyRate }}/hour</h4>
        <div>
            <base-badge
                v-for="(area, index) in coach.areas"
                :class="['badge', area]"
                :key="coach.id + index"
            >
                {{ area }}
            </base-badge>
        </div>
        <div class="actions">
            <base-button
                :type="'link'"
                :path="'/coaches/' + coach.id + '/contact'"
                :name="'CoachContact'"
                :params="{
                    id: coach.id,
                }"
                class="outline"
            >
                Contact
            </base-button>
            <base-button 
                :type="'link'"
                :path="'/coaches/' + coach.id" 
                :name="'CoachItemDetails'"
                :params="{
                    id: coach.id,
                }"
            >
                View Details
            </base-button>
        </div>
    </li>
</template>


<script>
import BaseBadge from "../../commons/BaseBadge"
import BaseButton from "../../commons/BaseButton"
export default {
    props: {
        coach: Object
    },
    components: {
        BaseBadge,
        BaseButton,
    },
    computed: {
        fullName() {
            var name = this.coach.firstName + " " + this.coach.lastName
            return name
                .split(" ")
                .filter(e => e)
                .map(
                    e =>
                        e.substr(0, 1).toUpperCase() + e.substr(1).toLowerCase()
                )
                .join(" ")
        }
    }
}
</script>

<style lang="scss" scoped>
h3 {
    font-size: 1.5rem;
}
li > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
</style>
