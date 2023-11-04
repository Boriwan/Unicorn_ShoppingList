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
    const [newList, setNewList] = useState({ name: "", items: [] });
    const [newItem, setNewItem] = useState("");
    const [shoppingLists, setShoppingLists] = useState(shoppingListData);

    const handleInputChange = (value, name) => {
      if (name === "name") {
        setNewList((prevList) => ({
          ...prevList,
          [name]: value,
        }));
      } else if (name === "newItem") {
        setNewItem(value);
      }
    };

    const createShoppingList = () => {
      if (newList.name.trim() === "") {
        alert("Please enter a name for the shopping list.");
        return;
      }

      const newShoppingListObject = {
        id: Utils.String.generateId(),
        ...newList,
        owner: {
          id: identity.uuIdentity,
          name: identity.name,
        },
        membersList: [],
      };

      // Update your shopping lists data using setShoppingLists
      setShoppingLists((prevLists) => [...prevLists, newShoppingListObject]);

      setNewList({ name: "", items: [] });
      setNewItem("");
      setOpen(false);
    };

    const addItem = () => {
      if (newItem.trim() !== "") {
        setNewList((prevList) => ({
          ...prevList,
          items: [
            ...prevList.items,
            {
              id: Utils.String.generateId(),
              value: newItem.trim(),
            },
          ],
        }));
        setNewItem("");
      }
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
    console.log(shoppingList);

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
            <Uu5Forms.FormText
              name="name"
              onChange={handleInputChange}
              value={newList.name}
              label="Název nákupního seznamu"
              placeholder="Název"
              required
            />
            {newList.items.map((item) => (
              <Uu5Elements.ListItem key={item.id}>{item.value}</Uu5Elements.ListItem>
            ))}

            <Uu5Elements.ListItem>
              <Uu5Elements.Input
                name="newItem"
                placeholder="Zadejte další předmět"
                value={newItem}
                onChange={(val) => setNewItem(val)}
              />
              <Uu5Elements.Button iconRight="uugds-plus" colorScheme="green" onClick={addItem}>
                Přidat
              </Uu5Elements.Button>
            </Uu5Elements.ListItem>
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
