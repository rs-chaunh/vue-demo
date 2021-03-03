//bên trong getters của module, root state sẽ được expose như là tham số thứ 3
//Nếu ta muốn sử dụng state và getters ở global, rootState và rootGetters sẽ được truyền vào như là tham số thứ 3 hoặc thứ 4 tới function getters,

export default {
  setRequest: (state, _, _2, rootGetters) => {
    const id = rootGetters["auth/user"];
    return state.requests.filter((request) => request.id === id);
  },

  checkRequest: (state) => state.length,
};
