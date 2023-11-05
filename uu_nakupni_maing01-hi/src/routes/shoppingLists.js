//@@viewOn:imports
import { Utils, createVisualComponent, useSession } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";

import { useState } from "uu5g05";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ShoppingListTile from "../bricks/shopping-list-tile.js";
import shoppingListData from "../data/shoppingLists.json";

//@@viewOn:constants

const Css = {
  button: () =>
    Config.Css.css({
      marginRight: "1rem",
    }),
  order: () =>
    Config.Css.css({
      margin: "1rem",
    }),
  tiles: () => ({
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    flexWrap: "wrap",
  }),
};

let ShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingLists",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();

    const shoppingList = shoppingListData;

    const [open, setOpen] = useState();
    const [newList, setNewList] = useState({ name: "" });

    const handleNameChange = (event) => {
      setNewList({ name: event.target.value });
    };

    const createShoppingList = () => {
      if (newList.name.trim() === "") {
        alert("Please enter a name for the shopping list.");
        return;
      }

      const newShoppingListObject = {
        id: Utils.String.generateId(),
        name: newList.name,
        owner: {
          id: identity.uuIdentity,
          name: identity.name,
        },
        membersList: [],
        itemList: [],
      };

      shoppingListData.push(newShoppingListObject);

      setNewList({ name: "" });
      setOpen(false);
    };

    const ownedLists = shoppingList.filter((list) => list.owner.id === identity.uuIdentity);
    const sharedLists = shoppingList.filter((list) =>
      list.membersList.some((member) => member.id === identity.uuIdentity)
    );
    const showOwned = (
      <Uu5Elements.Block className={Css.tiles()} header="Moje nákupní seznamy" headerType="title">
        {ownedLists.map((item) => (
          <Uu5Elements.Block>
            <ShoppingListTile key={item.id} {...item} />
          </Uu5Elements.Block>
        ))}
      </Uu5Elements.Block>
    );

    const showSharedWithMe = (
      <Uu5Elements.Block className={Css.tiles()} header="Sdíleno se mnou" headerType="title">
        {sharedLists.map((item) => (
          <Uu5Elements.Block>
            <ShoppingListTile key={item.id} {...item} />
          </Uu5Elements.Block>
        ))}
      </Uu5Elements.Block>
    );

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.button());

    return (
      <Uu5Elements.Block className={Css.order()}>
        <Uu5Elements.Block>
          <Uu5Elements.Button className={Css.button()} iconRight="uugdsstencil-uiaction-archive" colorScheme="blue">
            Archivované
          </Uu5Elements.Button>
          <Uu5Elements.Button
            onClick={() => setOpen(true)}
            className={Css.button()}
            iconRight="uugds-plus-circle"
            colorScheme="green"
          >
            Vytvořit seznam
          </Uu5Elements.Button>
          <Uu5Elements.Modal header="Vytvořit nákupní seznam" open={open} onClose={() => setOpen(false)}>
            <Uu5Forms.Text.Input
              onChange={handleNameChange}
              value={newList.name}
              label="Název nákupního seznamu"
              placeholder="Název"
            />
            <Uu5Elements.Button onClick={() => setOpen(false)} iconRight="uugds-close" colorScheme="red">
              Zrušit
            </Uu5Elements.Button>
            <Uu5Elements.Button onClick={createShoppingList} iconRight="uugds-plus-circle" colorScheme="green">
              Vytvořit nákupní seznam
            </Uu5Elements.Button>
          </Uu5Elements.Modal>
        </Uu5Elements.Block>
        <Uu5Elements.Block className={Css.tiles()}>
          {showOwned}
          {showSharedWithMe}
        </Uu5Elements.Block>
      </Uu5Elements.Block>
    );
  },
  //@@viewOff:render
});

ShoppingLists = withRoute(ShoppingLists);

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports
