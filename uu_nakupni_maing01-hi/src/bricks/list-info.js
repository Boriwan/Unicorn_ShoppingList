//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import MemberTile from "./member-tile.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListInfo = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListInfo",
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
    const [open, setOpen] = useState();
    const [name, setName] = useState(props.name);

    const handleInputChange = (event) => {
      const newValue = event.target.value;
      setName(newValue);
    };

    const updateNameInParent = () => {
      props.onUpdateName(name);

      // Close the modal
      setOpen(false);
    };

    const handleRemoveMember = (memberId) => {
      const updatedMembersList = props.membersList.filter((id) => id !== memberId);
      props.onUpdateMembersList(updatedMembersList);
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <h1>
          {props.name || "Shopping List with the given ID does not exist"}{" "}
          <Uu5Elements.Button onClick={() => setOpen(true)} icon="uugds-pencil" colorScheme="cyan"></Uu5Elements.Button>
          <Uu5Elements.Modal header="Upravit nákupní seznam" {...props} open={open} onClose={() => setOpen(false)}>
            <Uu5Forms.FormText initialValue={name} onChange={handleInputChange} label="Název " placeholder="Název" />

            <div>
              <p>Členové</p>
              {props.membersList.map((memberId) => (
                <MemberTile
                  key={memberId}
                  id={memberId}
                  name={props.MembersMap[memberId]}
                  onRemoveMember={handleRemoveMember}
                />
              ))}
            </div>

            <Uu5Elements.Button onClick={() => setOpen(false)} iconRight="uugds-close" colorScheme="red">
              Zrušit
            </Uu5Elements.Button>
            <Uu5Elements.Button onClick={updateNameInParent} iconRight="uugds-pencil" colorScheme="cyan">
              Uložit
            </Uu5Elements.Button>
          </Uu5Elements.Modal>
        </h1>
        <h2>Vlastník: {props.owner}</h2>

        <h2>Členové: {props.membersList.map((memberId) => props.MembersMap[memberId]).join(", ")}</h2>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListInfo };
export default ListInfo;
//@@viewOff:exports
