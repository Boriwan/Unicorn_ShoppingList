//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Lsi } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
import importLsi from "../lsi/import-lsi.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  button: () =>
    Config.Css.css({
      margin: "1rem",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ButtonGroup = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ButtonGroup",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    left: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    left: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.button());

    const [open, setOpen] = useState();

    const confirmDeleteModal = (
      <Uu5Elements.Modal
        width="30rem"
        header={<Lsi import={importLsi} path={["ShoppingList.Bricks.ButtonGroup", "modalTitle"]} />}
        open={open}
        onClose={() => setOpen(false)}
      >
        <h3>
          <Lsi import={importLsi} path={["ShoppingList.Bricks.ButtonGroup", "confirmMessage1"]} />
        </h3>
        <p>
          <Lsi import={importLsi} path={["ShoppingList.Bricks.ButtonGroup", "confirmMessage2"]} />
        </p>

        <Uu5Elements.Button
          onClick={() => {
            setOpen(false), setNewList("");
          }}
          iconRight="uugds-close"
          colorScheme="neutral"
        >
          <Lsi import={importLsi} path={["ShoppingList.Bricks.ButtonGroup", "cancelButton"]} />
        </Uu5Elements.Button>
        <Uu5Elements.Button onClick={props.handleDeleteList} iconRight="uugds-delete" colorScheme="red">
          <Lsi import={importLsi} path={["ShoppingList.Bricks.ButtonGroup", "deleteButton"]} />
        </Uu5Elements.Button>
      </Uu5Elements.Modal>
    );

    return (
      <div {...attrs}>
        <Uu5Elements.Button
          onClick={() => {
            setOpen(true);
          }}
          className={Css.button()}
          iconRight="uugds-delete"
          colorScheme="red"
        >
          <Lsi import={importLsi} path={["ShoppingList.Bricks.ButtonGroup", "delete"]} />
        </Uu5Elements.Button>
        {confirmDeleteModal}
        <Uu5Elements.Button
          onClick={props.handleArchiveList}
          className={Css.button()}
          iconRight="uugdsstencil-uiaction-archive"
          colorScheme="blue"
        >
          <Lsi import={importLsi} path={["ShoppingList.Bricks.ButtonGroup", "archive"]} />
        </Uu5Elements.Button>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ButtonGroup };
export default ButtonGroup;
//@@viewOff:exports
