import React, { useEffect, useState } from "react";
import { USA, USAProps } from "react-usa-svg";
import getStateData from "./directordata"; // Importing state data function
import DirectorBox from "./DirectorBox"; // Correct import for the new component

interface SVGMapComponentProps {
  style?: React.CSSProperties;
}

const SVGMapComponent: React.FC<SVGMapComponentProps> = ({ style }) => {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [stateData, setStateData] = useState<{ Name: string; Email: string }[] | null>(null);
  const [modalFrozen, setModalFrozen] = useState(false); // Track if modal is frozen

  useEffect(() => {
    if (activeState) {
      setStateData(getStateData(activeState));
    }
  }, [activeState]);

  const handleStateHover = (event: React.MouseEvent, abbr: string) => {
    if (!modalFrozen) {
      setActiveState(abbr);
    }
  };

  const handleStateClick = (event: React.MouseEvent) => {
    console.log("State clicked:", activeState);
    event.stopPropagation(); // Prevent triggering other click handlers
    setModalFrozen(!modalFrozen); // Freeze modal
  };

  let props: USAProps = {
    SVGFilters: [
      () => (
        <filter id="filterDropShadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="1" />
        </filter>
      ),
    ],
    HOC: ({ renderer: Renderer, svg_props, abbr }) => {
      let svg_props_override = {
        onMouseEnter: (event: React.MouseEvent) => handleStateHover(event, abbr),
        onMouseMove: (event: React.MouseEvent) => { },
        onMouseLeave: () => {
          if (!modalFrozen) {
            setActiveState(null);
            setStateData(null);
          }
        },
        onClick: handleStateClick, // Freeze modal on click
        fill: activeState === abbr ? `#0D7BBE` : "lightgray",
        stroke: activeState === abbr ? `white` : undefined,
        strokeWidth: activeState === abbr ? `2px` : undefined,
        filter: activeState === abbr ? "url(#filterDropShadow)" : undefined,
      };

      return (
        <Renderer
          svg_props={{
            ...svg_props,
            ...svg_props_override,
          }}
        />
      );
    },
  };

  return (
    <div style={{ position: "relative", ...style }}>
      <USA {...props} />
      {activeState && stateData && (
        <div style={{ position: "absolute", top: 0, left: '100%', marginLeft: '10px' }}>
          <DirectorBox stateData={stateData} />
        </div>
      )}
    </div>
  );
};

export default SVGMapComponent;