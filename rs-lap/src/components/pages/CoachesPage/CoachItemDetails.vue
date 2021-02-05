<template>
    <div>
        <section>
            <base-card>
                <h2>{{ fullName }}</h2>
                <h3>${{ coachDetails.hourlyRate }}/hour</h3>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>Interested? Reach out now!</h2>
                    <base-button
                        :type="'link'"
                        :path="'/coaches/' + $route.params.id + '/contact'"
                        :name="'CoachContact'"
                        :params="{
                            id: $route.params.id
                        }"
                    >
                        Contact
                    </base-button>
                </header>
                <transition name="animate-child">
                    <router-view></router-view>
                </transition>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge
                    v-for="(area, index) in coachDetails.areas"
                    :class="['badge', area]"
                    :key="index"
                >
                    {{ area }}
                </base-badge>
                <p>{{ coachDetails.description }}</p>
            </base-card>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import BaseCard from "../../commons/BaseCard";
import BaseBadge from "../../commons/BaseBadge";
import BaseButton from "../../commons/BaseButton";
export default {
    data() {
        return {
            coachDetails: {},
        }
    },
    components: {
        BaseCard,
        BaseBadge,
        BaseButton
    },
    computed: {
        fullName() {
            var name = this.coachDetails.firstName + " " + this.coachDetails.lastName;
            return name
                .split(" ")
                .filter(e => e)
                .map(
                    e =>
                        e.substr(0, 1).toUpperCase() + e.substr(1).toLowerCase()
                )
                .join(" ");
        },
    },
    created() {
        axios.get("https://find-your-coach-d614f-default-rtdb.firebaseio.com/coaches/" + this.$route.params.id + ".json")
            .then(response => {
                this.coachDetails = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>

<style lang="scss" scoped>
h2 {
    margin: 20px 0;
}
h3 {
    margin: 18px 0;
}
p {
    margin: 16px 0;
}

.animate-child-enter-from,
.animate-child-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}

.animate-child-enter-to,
.animate-child-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.animate-child-enter-active {
    transition: 0.3s;
}

.animate-child-leave-active {
    transition: 0.3s;
}
</style>
