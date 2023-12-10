//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useState, useEffect } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
import DarkModeSwitch from "../bricks/dark-mode-switch.js";
import LanguageSelect from "../bricks/language-select.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const [mode, setMode] = useState("light");

    // const toggleDarkMode = () => {
    //   const newMode = mode === "light" ? "dark" : "light";
    //   setMode(newMode);
    // };

    // useEffect(() => {
    //   const backgroundColor = mode === "light" ? "white" : "black";
    //   document.body.style.backgroundColor = backgroundColor;
    // }, [mode]);

    const appActionList = [
      {
        children: (
          <DarkModeSwitch
            iconOn="uugdsstencil-weather-sun"
            iconOff="uugdsstencil-weather-moon"
            checked={mode === "dark"}
            onClick={() => {
              toggleDarkMode();
            }}
          />
        ),
        collapsed: false,
      },
      { children: <Lsi import={importLsi} path={["Menu", "home"]} />, onClick: () => setRoute("home") },

      { children: <Lsi import={importLsi} path={["Menu", "archive"]} />, onClick: () => setRoute("archivedLists") },
      {
        children: <Lsi import={importLsi} path={["Menu", "about"]} />,
        onClick: () => setRoute("about"),
        collapsed: true,
      },
      { children: <LanguageSelect />, collapsed: false },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <Plus4U5App.RouteBar appActionList={appActionList} mode={mode} {...props} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
