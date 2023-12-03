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

const LanguageSelect = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LanguageSelect",
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

    return (
      <div {...attrs}>
        <Uu5Elements.LanguageSelector languageList={["cs", "en"]} labelType="flag-code" />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { LanguageSelect };
export default LanguageSelect;
//@@viewOff:exports
