import React, { useEffect, useState } from "react";
import { USA, USAProps } from "react-usa-svg";
import getStateData from "./directordata"; // Importing state data function

function SVGMapComponent() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
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
      setPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleStateClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering other click handlers
    setModalFrozen(true); // Freeze modal
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    if (modalFrozen) {
      setModalFrozen(false);
      setActiveState(null);
      setPosition(null);
      setStateData(null);
    }
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
        onMouseMove: (event: React.MouseEvent) => {
          if (!modalFrozen) {
            setPosition({ x: event.clientX, y: event.clientY });
          }
        },
        onMouseLeave: () => {
          if (!modalFrozen) {
            setActiveState(null);
            setPosition(null);
            setStateData(null);
          }
        },
        onClick: handleStateClick, // Freeze modal on click
        fill: activeState === abbr ? `blue` : "lightgray",
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
    <div onClick={handleCloseModal} style={{ position: "relative" }}>
      <USA {...props} />
      {activeState && position && stateData && (
        <div
          onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicked inside
          style={{
            position: "absolute",
            top: position.y + 10,
            left: position.x + 10,
            background: "white",
            padding: "8px",
            border: "1px solid black",
            borderRadius: "4px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
            pointerEvents: "auto",
            zIndex: 1000,
          }}
        >
          <strong>{activeState}</strong>
          <ul>
            {stateData.length > 0 ? (
              stateData.map((director, index) => (
                <li key={index}>
                  {director.Name}: <a href={`mailto:${director.Email}`}>{director.Email}</a>
                </li>
              ))
            ) : (
              <li>No director data available</li>
            )}
          </ul>
          {modalFrozen && (
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "8px",
                display: "block",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SVGMapComponent;
