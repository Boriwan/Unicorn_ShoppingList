//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useRoute } from "uu5g05";

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
    const [route, setRoute] = useRoute();

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
        isArchived: false,
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
      <Uu5Elements.Block header="Moje nákupní seznamy" headerType="title">
        <Uu5Elements.Grid templateColumns="repeat(5, 15rem)" templateRows="180px 180px">
          {ownedLists
            .filter((item) => !item.isArchived)
            .map((item) => (
              <div>
                <ShoppingListTile key={item.id} {...item} />
              </div>
            ))}
        </Uu5Elements.Grid>
      </Uu5Elements.Block>
    );

    const showSharedWithMe = (
      <Uu5Elements.Block header="Sdíleno se mnou" headerType="title">
        <Uu5Elements.Grid templateColumns="repeat(5, 15rem)" templateRows="180px 180px">
          {sharedLists.map((item) => (
            <div>
              <ShoppingListTile key={item.id} {...item} />
            </div>
          ))}
        </Uu5Elements.Grid>
      </Uu5Elements.Block>
    );

    const showCreateListModal = (
      <Uu5Elements.Modal width="30rem" header="Vytvořit nákupní seznam" open={open} onClose={() => setOpen(false)}>
        <Uu5Elements.Grid templateColumns="1fr" templateRows="auto 1fr" rowGap="16px">
          <div style={{ gridColumn: "1", gridRow: "1" }}>
            <Uu5Forms.Text.Input
              onChange={handleNameChange}
              value={newList.name}
              placeholder="Název"
              significance="distinct"
              required
            />
          </div>

          <div style={{ gridColumn: "1", gridRow: "2" }}>
            <Uu5Elements.Button
              onClick={() => {
                setOpen(false), setNewList("");
              }}
              iconRight="uugds-close"
              colorScheme="red"
            >
              Zrušit
            </Uu5Elements.Button>
          </div>
          <div style={{ gridColumn: "2", gridRow: "2" }}>
            <Uu5Elements.Button onClick={createShoppingList} iconRight="uugds-plus-circle" colorScheme="green">
              Vytvořit nákupní seznam
            </Uu5Elements.Button>
          </div>
        </Uu5Elements.Grid>
      </Uu5Elements.Modal>
    );

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.button());

    return (
      <div>
        <Uu5Elements.Block>
          <Uu5Elements.Button
            onClick={() => {
              setRoute("archivedLists");
            }}
            className={Css.button()}
            iconRight="uugdsstencil-uiaction-archive"
            colorScheme="blue"
          >
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
          {showCreateListModal}
        </Uu5Elements.Block>
        {showOwned}
        {showSharedWithMe}
      </div>
    );
  },
  //@@viewOff:render
});

ShoppingLists = withRoute(ShoppingLists);

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports
