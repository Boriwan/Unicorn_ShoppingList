//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useElementSize, useRoute, useScreenSize } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";

import { useState } from "uu5g05";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

// Own components
import Item from "../bricks/item.js";
import ButtonGroup from "../bricks/button-group.js";
import ListInfo from "../bricks/list-info.js";

//@@viewOn:constants

let ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
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
    const ownerName = identity.name;

    const [ShoppingListDetailMap, setShoppingListDetailMap] = useState({
      name: "Můj nákupní seznam #1",
      owner: ownerName,
      membersList: ["m1", "m2", "m3"],
      itemList: ["i1", "i2", "i3", "i4"],
    });

    const [MembersMap, setMembersMap] = useState({
      m1: "Karel Novák",
      m2: "Petr Pavel",
      m3: "Vojtěch Skalný",
      m4: "Petr Jasný",
      m5: "Tomáš Buben",
      m6: "Jan Voříšek",
    });

    const [ItemMap, setItemMap] = useState({
      i1: "Špagety",
      i2: "Sýr",
      i3: "Kečup",
      i4: "Máslo",
      i5: "Mléko",
      i6: "Vejce",
    });

    // const [route, setRoute] = useRoute();
    // const shoppingListId = route.params.id;
    const [itemList, setItemList] = useState(ShoppingListDetailMap?.itemList || []);
    // const shoppingListIds = Object.keys(ShoppingListDetailMap);

    const [open, setOpen] = useState();
    const [newItem, setNewItem] = useState("");
    const [isInputDirty, setIsInputDirty] = useState(false);

    const updateMembersListInParent = (newMembersList, newMember) => {
      setShoppingListDetailMap((prevData) => ({
        ...prevData,
        membersList: newMembersList,
      }));

      if (newMember.trim() !== "") {
        const newMemberId = `m${newMembersList.length}`;
        setMembersMap((prevMap) => ({
          ...prevMap,
          [newMemberId]: newMember,
        }));
      }
    };

    const updateNameInListInfo = (newName) => {
      const updatedShoppingListDetailMap = {
        ...ShoppingListDetailMap,
        name: newName,
      };

      setShoppingListDetailMap(updatedShoppingListDetailMap);
    };

    const handleInputChange = (event) => {
      const newValue = event.target.value;
      setNewItem(newValue);
      setIsInputDirty(!!newValue);
    };

    const addItem = () => {
      if (isInputDirty) {
        if (newItem.trim() !== "") {
          const newItemId = `i${itemList.length + 1}`;
          setItemMap({ ...ItemMap, [newItemId]: newItem });

          setItemList([...itemList, newItemId]);

          setNewItem("");
          setIsInputDirty(false);
        }
      }

      setOpen(false);
    };

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

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <ButtonGroup membersList={ShoppingListDetailMap.membersList} onUpdateMembersList={updateMembersListInParent} />
        <ListInfo
          name={ShoppingListDetailMap.name}
          owner={ShoppingListDetailMap.owner}
          membersList={ShoppingListDetailMap.membersList}
          onUpdateName={updateNameInListInfo}
          MembersMap={MembersMap}
        />

        <div>
          <Uu5Elements.ListItem
            actionList={[
              {
                iconRight: "uugds-plus",
                children: "Přidat",
                primary: true,
                colorScheme: "light-green",
                onClick: () => setOpen(true),
              },
            ]}
            colorScheme="cyan"
          >
            <Uu5Elements.Modal header="Upravit nákupní seznam" {...props} open={open} onClose={() => setOpen(false)}>
              <Uu5Forms.FormText
                onChange={handleInputChange}
                initialValue={newItem}
                label="Název předmětu"
                placeholder="Název předmětu"
                required
              />

              <Uu5Elements.Button onClick={() => setOpen(false)} iconRight="uugds-close" colorScheme="red">
                Zrušit
              </Uu5Elements.Button>
              <Uu5Elements.Button onClick={addItem} iconRight="uugds-plus" colorScheme="green">
                Přidat předmět
              </Uu5Elements.Button>
            </Uu5Elements.Modal>

            <div>
              <Uu5Elements.Button icon="uugds-filter" colorScheme="dark-blue" />
              <strong> Seznam věcí</strong>
            </div>
          </Uu5Elements.ListItem>

          {itemList.map((item) => (
            <Uu5Elements.ListItem>
              <Item key={item} id={item} name={ItemMap[item]} setItemList={setItemList} />
            </Uu5Elements.ListItem>
          ))}
        </div>
      </div>
    );
  },
  //@@viewOff:render
});

ShoppingList = withRoute(ShoppingList);

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports
