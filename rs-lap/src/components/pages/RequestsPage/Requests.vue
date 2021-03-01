<template>
    <base-card>
        <header>
            <h2>Requests Received</h2>
        </header>
        <base-loading v-if="loading"></base-loading>
        <template v-else>
            <ul v-if="requests.length != 0">
                <request-item
                    v-for="(request, index) in requests"
                    :key="index"
                    :request="request"
                >
                </request-item>
            </ul>
            <h3 v-else>
                You haven't received any requests yet!
            </h3>
        </template>
    </base-card>
</template>

<script>
import { mapState } from "vuex";
import RequestItem from "./RequestItem";
import BaseLoading from "../../commons/BaseLoading";
import BaseCard from "../../commons/BaseCard";

export default {
    data() {
        return {};
    },
    components: {
        RequestItem,
        BaseLoading,
        BaseCard
    },
    computed: {
        ...mapState(["loading", "requests"])
    },
    created() {
        this.$store.dispatch("getAllRequest");
    }
};
</script>

<style lang="scss" scoped>
.card {
    header {
        text-align: center;
    }
    ul {
        list-style: none;
        margin: 2rem auto;
        padding: 0;
        max-width: 30rem;
    }
    h3 {
        text-align: center;
    }
}
</style>
