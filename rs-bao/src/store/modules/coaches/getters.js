export default {
  allCoaches: (state) => state.coaches,

  // isCoach(_, getters, _2, rootGetters) {
  //   const userId = rootGetters["auth/user"];
  //   return getters.allCoaches.find((coach) => coach.id === userId);
  //   //kiểm tra xem có ít nhất 1 phần tử thoả điều kiện ở hàm được tryền vào không?
  // },
};
