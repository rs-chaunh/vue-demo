<template>
    <div>
        <section>
            <base-card>
                <coach-filter></coach-filter>
            </base-card>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button @click="refreshData" class="outline">
                        {{ $t("common.buttons.refresh") }}
                    </base-button>
                    <base-button
                        v-if="!auth"
                        :type="'link'"
                        :path="'/auth?redirect=register'"
                        :query="{
                            redirect: 'register'
                        }"
                    >
                        {{ $t("common.buttons.login_to_register") }}
                    </base-button>
                    <base-button
                        v-else-if="!isRegistered"
                        :type="'link'"
                        :path="'/register'"
                        :name="'RegisterAsCoach'"
                    >
                        {{ $t("common.buttons.register_as_coach") }}
                    </base-button>
                </div>
                <base-loading v-if="$store.state.loading"></base-loading>
                <ul v-else-if="filterCoaches.length > 0">
                    <coach-item
                        v-for="coach in filterCoaches"
                        :key="coach.id"
                        :coach="coach"
                    ></coach-item>
                </ul>
                <h1 v-else>{{ $t('common.labels.no_coach') }}</h1>
            </base-card>
        </section>
    </div>
</template>

<script>
import BaseButton from "../../commons/BaseButton";
import BaseCard from "../../commons/BaseCard";
import BaseLoading from "../../commons/BaseLoading";
import CoachItem from "./CoachItem";
import CoachFilter from "./CoachFilter";
export default {
    data() {
        return {};
    },
    components: {
        BaseButton,
        BaseCard,
        BaseLoading,
        CoachItem,
        CoachFilter
    },
    computed: {
        filterCoaches() {
            return this.$store.state.coaches.filter(item => {
                for (let i = 0; i < item.areas.length; i++) {
                    if (
                        this.$store.state.filterOption.indexOf(item.areas[i]) !=
                        -1
                    )
                        return true;
                }
                return false;
            });
        },
        auth() {
            return this.$store.getters.isAuthenticated;
        },
        isRegistered() {
            return this.$store.getters.isRegistered;
        },
        tokenDevices() {
            return this.$store.state.tokenDevices;
        }
    },
    methods: {
        refreshData() {
            this.$store.dispatch("getAllCoach");
        }
    },
    created() {
        if(this.tokenDevices) this.tokenDevices.forEach(element => {
            this.$store.getters.requestsUnsent.forEach(el => {
                this.$store.dispatch("sendNotification", {
                    ...el,
                    tokenDevice: element
                });
                this.$store.dispatch("setStatusNotification", el);
                this.$store.commit("SET_STATUS_REQUEST", el.key);
            });
        });
        this.$store.dispatch("getAllCoach");
    },
};
</script>

<style scoped lang="scss">
h1 {
    text-align: center;
}
h2 {
    margin: 0.5rem 0;
}
ul {
    padding: 0;
    > li {
        margin: 1rem 0;
        border: 1px solid #424242;
        border-radius: 12px;
        padding: 1rem;
        list-style: none;
    }
}
</style>
