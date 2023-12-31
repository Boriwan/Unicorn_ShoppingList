//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useElementSize, useRoute, useScreenSize, Lsi } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
// import { PieChart } from "uu5chartsg01";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
import Item from "../bricks/item.js";
import RouteBar from "../core/route-bar.js";
import ButtonGroup from "../bricks/button-group.js";
import shoppingListData from "../../mock/data/shoppingLists.json";

//@@viewOn:constants

const Css = {
  detail: () =>
    Config.Css.css({
      padding: "1em",
    }),
  detailOrder: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }),
};

let ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    const [route, setRoute] = useRoute();

    const itemListParam = route.params.itemList;
    const itemListArray = itemListParam ? itemListParam.split(",") : [];

    const [itemList, setItemList] = useState(itemListArray);
    const [newItem, setNewItem] = useState("");
    const [open, setOpen] = useState();

    const isOwner = identity.uuIdentity === route.params.ownerId;
    const isArchived = route.params.isArchived;

    const renderEditButton = isOwner && isArchived === "false" && (
      <Uu5Elements.Button onClick={() => setOpen(true)} icon="uugds-pencil" colorScheme="cyan" />
    );

    const handleInputChange = (event) => {
      setNewItem(event.target.value);
    };

    const [editedName, setEditedName] = useState(route.params.name);

    const handleNameChange = (event) => {
      setEditedName(event.target.value);
    };

    const updateNameInModal = () => {
      setEditedName((route.params.name = editedName));
      setOpen(false);
    };

    const addItem = () => {
      if (typeof newItem === "string" && newItem.trim() !== "") {
        const trimmedItem = newItem.trim();
        const updatedItemList = [...itemList, trimmedItem];
        setItemList(updatedItemList);

        const updatedShoppingListData = shoppingListData.map((list) => {
          if (list.id === route.params.id) {
            const updatedItemList = [...list.itemList, trimmedItem];
            return { ...list, itemList: updatedItemList };
          }
          return list;
        });

        localStorage.setItem("shoppingListData", JSON.stringify(updatedShoppingListData));

        setNewItem("");
      }
    };

    const handleItemDelete = (itemName) => {
      const updatedItemList = itemList.filter((item) => item !== itemName);
      setItemList(updatedItemList);

      const updatedShoppingListData = shoppingListData.map((list) => {
        if (list.id === route.params.id) {
          const updatedItemList = list.itemList.filter((item) => item !== itemName);
          return { ...list, itemList: updatedItemList };
        }
        return list;
      });

      localStorage.setItem("shoppingListData", JSON.stringify(updatedShoppingListData));
    };

    console.log(route.params.isArchived);

    const handleArchiveList = () => {
      const updatedRouteParams = { ...route.params, isArchived: true };
      setRoute("archivedLists", { params: updatedRouteParams });
    };

    const handleDeleteList = () => {
      const listIdToDelete = route.params.id;

      const listToDeleteIndex = shoppingListData.findIndex((list) => list.id === listIdToDelete);
      if (listToDeleteIndex !== -1) {
        const listToMoveToEnd = shoppingListData[listToDeleteIndex];
        shoppingListData.splice(listToDeleteIndex, 1);
        shoppingListData.push(listToMoveToEnd);

        // Now, you can use pop to remove the last list
        shoppingListData.pop();

        localStorage.setItem("shoppingListData", JSON.stringify(shoppingListData));
      }

      setRoute("home");
    };

    const renderButtonGroup = isOwner && isArchived === "false" && (
      <ButtonGroup handleArchiveList={handleArchiveList} handleDeleteList={handleDeleteList} />
    );

    const items = itemList.map((item) => (
      <Uu5Elements.ListItem key={item}>
        <Item name={item} setItemList={setItemList} onItemDelete={handleItemDelete} isArchived={isArchived} />
      </Uu5Elements.ListItem>
    ));

    const renderAddItem = isArchived === "false" && (
      <Uu5Elements.ListItem>
        <Uu5Elements.Input placeholder="..." onChange={handleInputChange} significance="subdued" />
        <Uu5Elements.Button iconRight="uugds-plus" colorScheme="green" onClick={addItem}>
          <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "add"]} />
        </Uu5Elements.Button>
      </Uu5Elements.ListItem>
    );

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.detail());
    return (
      <div>
        <RouteBar />
        <div {...attrs}>
          <div className={Css.detailOrder()}>
            <div>
              <h1>
                {route.params.name || "Shopping List with the given ID does not exist"}
                {renderEditButton}
                <Uu5Elements.Modal
                  header={<Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "editHeader"]} />}
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <Uu5Forms.FormText
                    initialValue={editedName}
                    onChange={handleNameChange}
                    label={<Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "editText"]} />}
                    placeholder={
                      <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "editText"]} />
                    }
                  />

                  <div>
                    <p>
                      <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "editMembers"]} />
                    </p>
                    {route.params.membersList}
                  </div>

                  <Uu5Elements.Button onClick={() => setOpen(false)} iconRight="uugds-close" colorScheme="red">
                    <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "cancel"]} />
                  </Uu5Elements.Button>
                  <Uu5Elements.Button onClick={updateNameInModal} iconRight="uugds-pencil" colorScheme="cyan">
                    <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "save"]} />
                  </Uu5Elements.Button>
                </Uu5Elements.Modal>
              </h1>
              <h2>
                <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "owner"]} />
                {route.params.ownerName}
              </h2>
              <h2>
                <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "members"]} />
                {route.params.membersList}
              </h2>
            </div>
            {renderButtonGroup}
          </div>

          <div>
            <Uu5Elements.ListItem header="Seznam" headerType="title" colorScheme="cyan">
              <strong>
                <Lsi import={importLsi} path={["ShoppingList.Routes.ShoppingListDetail", "list"]} />
              </strong>
            </Uu5Elements.ListItem>
            {items}
            {renderAddItem}
          </div>
        </div>
        <PieChart
          data={items}
          serieList={[
            {
              valueKey: "sum",
              labelKey: "isCompleted",
              label: true,
            },
          ]}
        />
      </div>
    );
  },
  //@@viewOff:render
});

ShoppingListDetail = withRoute(ShoppingListDetail);

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
