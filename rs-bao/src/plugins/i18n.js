import { createI18n } from "vue-i18n";//TODO chưa khai báo trong package.json
import us from "../locales/us.json";
import vn from "../locales/vn.json";

const messages = {
  us: us, //TODO nên viết gọn lại
  vn: vn,
};
const i18n = createI18n({
  locale: localStorage.getItem("lang"),
  fallbackLocale: "us",
  messages,
});

export default i18n;
