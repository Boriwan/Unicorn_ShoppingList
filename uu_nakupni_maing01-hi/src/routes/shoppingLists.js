//@@viewOn:imports
import { Utils, createVisualComponent, useSession } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ShoppingListTile from "../bricks/shopping-list-tile.js";
import shoppingListData from "../data/shoppingLists.json";
import { ArtifactLink } from "uu_plus4u5g02-elements";

//@@viewOn:constants

const Css = {
  button: () =>
    Config.Css.css({
      margin: "1rem",
    }),
  order: () =>
    Config.Css.css({
      display: "flex",
    }),
  tiles: () => ({
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    flexWrap: "wrap"
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

    // const ShoppingListsMap = [
    //   {
    //     id: Utils.String.generateId(),
    //     name: "Můj nákupní seznam #1",
    //     ownerId: "822-5205-4105-0000",
    //     ownerName: "Bouris Boček",
    //     membersList: ["Karel Novák", "Jan Novotný"],
    //     itemList: ["i1", "i2", "i3", "i4"],
    //   },
    //   {
    //     id: Utils.String.generateId(),
    //     name: "Můj nákupní seznam #2",
    //     ownerId: "822-5205-4105-0000",
    //     ownerName: "Bouris Boček",
    //     membersList: [],
    //     itemList: ["i1", "i2", "i3", "i4"],
    //   },
    // ];

    const shoppingList = shoppingListData;

    const { data: systemData } = useSystemData();
    const {
      uuAppBusinessModelUri,
      uuAppApplicationModelUri,
      uuAppBusinessRequestsUri,
      uuAppUserGuideUri,
      uuAppWebKitUri,
    } = systemData?.relatedObjectsMap || {};
    const products = [];
    if (uuAppBusinessModelUri) products.push({ baseUri: uuAppBusinessModelUri });
    if (uuAppApplicationModelUri) products.push({ baseUri: uuAppApplicationModelUri });
    if (uuAppBusinessRequestsUri) products.push({ baseUri: uuAppBusinessRequestsUri });
    if (uuAppUserGuideUri) products.push({ baseUri: uuAppUserGuideUri });
    if (uuAppWebKitUri) products.push({ baseUri: uuAppWebKitUri });

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
          <Uu5Elements.Button className={Css.button()} iconRight="uugds-plus-circle" colorScheme="green">
            Vytvořit seznam
          </Uu5Elements.Button>
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
