import React, { useEffect, useState } from "react";
import directorData from "../data/directordata.json"; // Import the JSON file

type DirectorData = {
  [key: string]: { Name: string; Email: string }[];
};

const data: DirectorData = directorData; // Assign imported JSON to a typed variable

function getStateData(stateAbbr: string) {
  return data[stateAbbr] || [];
}

export default getStateData;
