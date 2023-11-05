//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
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
      <Uu5Elements.Modal width="30rem" header="Smazat nákupní seznam" open={open} onClose={() => setOpen(false)}>
        <h3>Opravdu chcete smazat tento nákupní seznam?</h3>
        <p>Tato akce je nevratná...</p>

        <Uu5Elements.Button
          onClick={() => {
            setOpen(false), setNewList("");
          }}
          iconRight="uugds-close"
          colorScheme="neutral"
        >
          Zrušit
        </Uu5Elements.Button>
        <Uu5Elements.Button onClick={props.handleDeleteList} iconRight="uugds-delete" colorScheme="red">
          Ano, smazat!
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
          Smazat
        </Uu5Elements.Button>
        {confirmDeleteModal}
        <Uu5Elements.Button
          onClick={props.handleArchiveList}
          className={Css.button()}
          iconRight="uugdsstencil-uiaction-archive"
          colorScheme="blue"
        >
          Archivovat
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
