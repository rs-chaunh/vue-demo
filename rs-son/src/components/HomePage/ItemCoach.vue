<template>
  <li>
    <h3>{{ itemList[1].firstName }}</h3>
    <h4>$ {{ itemList[1].hourlyRate }}/hour</h4>
    <div>
      <item-badge
        v-for="(itemArea, index) in itemList[1].areas"
        :key="index"
        :class="itemArea"
      >
        {{ itemArea.toUpperCase() }}
      </item-badge>
    </div>
    <div class="action">
      <item-link
        :linkTo="{
          name: 'Contact',
          params: { id: itemList[0] },
        }"
        class="outline"
      >
        Contact
      </item-link>
      <item-link
        :linkTo="{
          name: 'Detail',
          params: { id: itemList[0] },
        }"
      >
        View Details
      </item-link>
    </div>
  </li>
</template>

<script>
import ItemBadge from "../common/ItemBadge.vue";
import ItemLink from "../common/ItemLink.vue";

export default {
  components: { ItemLink, ItemBadge },
  props: ["itemList"],
  data() {
    return {
      linkToContact: "",
      linkToDetail: "",
    };
  },
};
</script>

<style scoped lang="scss">
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  div {
    margin: 0.5rem 0;
  }
  .action {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
