//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ButtonGroup = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ButtonGroup",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    membersList: PropTypes.array.isRequired,
    onUpdateMembersList: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    membersList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    const [open, setOpen] = useState(false);
    const [newMember, setNewMember] = useState("");

    const handleInputChange = (event) => {
      const newValue = event.target.value;
      setNewMember(newValue);
    };

    // ButtonGroup component
    const addMember = () => {
      // Check if the input is non-empty
      const newMembersList = [...props.membersList, newMember];
      props.onUpdateMembersList(newMembersList, newMember); // Pass newMember here
      setNewMember("");

      setOpen(false);
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Button disabled iconRight="uugds-delete" colorScheme="red">
          Smazat
        </Uu5Elements.Button>
        <Uu5Elements.Button disabled iconRight="uugdsstencil-uiaction-archive" colorScheme="blue">
          Archivovat
        </Uu5Elements.Button>
        <Uu5Elements.Button onClick={() => setOpen(true)} iconRight="uugds-plus-circle" colorScheme="green">
          Přidat člena
        </Uu5Elements.Button>

        <Uu5Elements.Modal header="Přidat člena" {...props} open={open} onClose={() => setOpen(false)}>
          <Uu5Forms.FormText
            onChange={handleInputChange}
            initialValue={newMember}
            label="Jméno člena, kterého chcete přidat"
            placeholder="Jméno"
            required
          />

          <Uu5Elements.Button onClick={() => setOpen(false)} iconRight="uugds-close" colorScheme="red">
            Zrušit
          </Uu5Elements.Button>
          <Uu5Elements.Button onClick={addMember} iconRight="uugds-plus" colorScheme="green">
            Přidat člena
          </Uu5Elements.Button>
        </Uu5Elements.Modal>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ButtonGroup };
export default ButtonGroup;
//@@viewOff:exports
