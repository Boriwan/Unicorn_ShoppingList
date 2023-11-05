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
  main: () =>
    Config.Css.css({
      marginRight: "1rem",
    }),
};

let ArchivedLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ArchivedLists",
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

    // const [route, setRoute] = useRoute();

    const shoppingList = shoppingListData;

    const archivedLists = shoppingList.filter((list) => list.owner.id === identity.uuIdentity);

    const showArchived = (
      <Uu5Elements.Block header="Moje archivované nákupní seznamy" headerType="title">
        <Uu5Elements.Grid templateColumns="repeat(5, 15rem)" templateRows="180px 180px">
          {archivedLists
            .filter((item) => item.isArchived)
            .map((item) => (
              <div>
                <ShoppingListTile key={item.id} {...item} />
              </div>
            ))}
        </Uu5Elements.Grid>
      </Uu5Elements.Block>
    );

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <>
        <RouteBar />
        <div className={Css.main()}>{showArchived}</div>
      </>
    );
  },
  //@@viewOff:render
});

ArchivedLists = withRoute(ArchivedLists);

//@@viewOn:exports
export { ArchivedLists };
export default ArchivedLists;
//@@viewOff:exports
