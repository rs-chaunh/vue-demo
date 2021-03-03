<template>
  <div class="language-select" tabindex="0" @blur="closeDropdown">
    <div class="selected" :class="{ isOpen: isOpen }" @click="toggleOpen">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !isOpen }">
      <div
        v-for="(option, i) of options"
        :key="i"
        :value="option.language"
        :class="{ actived: $i18n.locale === option.language }"
        @click.prevent="setLang"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      options: [
        { language: "en", title: "English" },
        { language: "vi", title: "Tiếng Việt" },
      ],
    };
  },
  computed: {
    selected() {
      const lang = this.options.find(
        (lang) => lang.language === this.$i18n.locale
      );
      if (lang) return lang.title;
      else return "Select a language";
    },
  },
  methods: {
    setLang(event) {
      this.$i18n.locale = event.target.getAttribute("value");
      localStorage.setItem("lang", this.$i18n.locale);
      this.closeDropdown();
    },
    closeDropdown() {
      this.isOpen = false;
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.language-select {
  position: relative;
  width: 100%;
  min-width: 150px;
  text-align: left;
  outline: none;
  height: 45px;
  line-height: 45px;
  background-color: #fff;

  .selected {
    background-color: #fff;
    // border-radius: 6px;
    border: 1px solid #000;

    color: #000;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    &::after {
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

  .selected.open {
    // border: 1px solid #ad8225;
    border-radius: 6px 6px 0px 0px;
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
      color: #000;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #eee;
      }
      &.actived {
        background-color: #702fc5;
        color: #fff;
        position: relative;
        background-image: url('../../assets/images/icon_check.svg');
        background-size: 12px;
        background-position: right 15.5px center;
        background-repeat: no-repeat;
      }
    }
  }
  
  .selectHide {
    display: none;
  }
}
</style>