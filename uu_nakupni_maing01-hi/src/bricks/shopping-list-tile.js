//@@viewOn:imports
import { Utils, createVisualComponent, useRoute } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const [route, setRoute] = useRoute();

    return (
      <Uu5Elements.Tile header={props.name} aspectRatio="8x8">
        <Uu5Elements.Button
          onClick={() => {
            setRoute("shoppingList", { id: props.id, name: props.name, ownerId: props.ownerId, ownerName: props.ownerName, membersList: props.membersList, itemList: props.itemList});
          }}
        >
          Otevřít
        </Uu5Elements.Button>
      </Uu5Elements.Tile>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListTile };
export default ShoppingListTile;
//@@viewOff:exports
