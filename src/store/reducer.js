import { Map } from "immutable";

 const initState = Map({
  TodoList: JSON.parse(localStorage.getItem("TodoList"))||[],
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "add":
      return state.update("TodoList", (v) => {
        return [...v, action.AddList];
      });
    case "delete":
      return state.update("TodoList", (v) => {
        v.splice(action.ListId);
        return [...v];
      });
    case "todoupdate":
      return state.update("TodoList",v=>[...v])
    case "setup":
       localStorage.setItem(
        "TodoList",
        JSON.stringify([...state.get("TodoList")])
      );
    default:
      return state;
  }
};
export default reducer;
