// //@@viewOn:imports
// import { createComponent, useDataList, useEffect, useRef } from "uu5g05";
// import Config from "./config/config";
// import Calls from "calls";
// //@@viewOff:imports

// const ListProvider = createComponent({
//   //@@viewOn:statics
//   uu5Tag: Config.TAG + "ListProvider",
//   //@@viewOff:statics

//   //@@viewOn:propTypes
//   propTypes: {},
//   //@@viewOff:propTypes

//   //@@viewOn:defaultProps
//   defaultProps: {},
//   //@@viewOff:defaultProps

//   render(props) {
//     //@@viewOn:private
//     const shoppingListDataList = useDataList({
//       handlerMap: {
//         load: handleLoad,
//         create: handleCreate,
//       },
//       itemHandlerMap: {
//         update: handleUpdate,
//         delete: handleDelete,
//         addItem: handleAddItem,
//         removeItem: handleRemoveItem,
//         addMember: handleAddMember,
//         removeMember: handleRemoveMember,
//       }
//     });

//     function handleLoad(dtoIn) {
//       return Calls.ShoppingList.listShoppingLists(dtoIn);
//     }

//     function handleCreate(values) {
//       return Calls.ShoppingList.createShoppingList(values);
//     }

//     async function handleUpdate() {
//       throw new Error("ShoppingList update is not implemented yet.");
//     }

//     function handleDelete(shoppingList) {
//       const dtoIn = { id: shoppingList.id, item: "" };
//       return Calls.ShoppingList.deleteShoppingList(dtoIn, props.baseUri);
//     }

//     function handleRemoveItem(shoppingList) {
//       const dtoIn = { id: shoppingList.id, item: "" };
//       return Calls.ShoppingList.removeItem(dtoIn, props.baseUri);
//     }

//     function handleAddMember(shoppingList) {
//       const dtoIn = { id: shoppingList.id, memberId: "" };
//       return Calls.ShoppingList.addMember(dtoIn, props.baseUri);
//     }

//     function handleRemoveMember(shoppingList) {
//       const dtoIn = { id: shoppingList.id, memberId: "" };
//       return Calls.ShoppingList.removeMember(dtoIn, props.baseUri);
//     }

//     useEffect(() => {
//       // We don't use it to store reference on another React component
//       // eslint-disable-next-line uu5/hooks-exhaustive-deps
//       // We want to trigger this effect only once.
//       // eslint-disable-next-line uu5/hooks-exhaustive-deps
//     }, []);
//     //@@viewOff:private

//     //@@viewOn:render
//     return typeof props.children === "function" ? props.children(shoppingListDataList) : props.children;
//     //@@viewOff:render
//   },
// });

// //@@viewOn:exports
// export { ListProvider };
// export default ListProvider;
// //@@viewOff:exports
