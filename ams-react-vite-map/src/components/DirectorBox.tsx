import React from 'react';
import './DirectorBox.css';

interface DirectorInfo {
  Name: string;
  Email: string;
}

interface DirectorBoxProps {
  stateData: DirectorInfo[];
}

const DirectorBox: React.FC<DirectorBoxProps> = ({ stateData }) => {
  return (
    <div className="director-box">
      <div className="name">{stateData[0].Name}</div>
      <div className="email">{stateData[0].Email}</div>
    </div>
  );
};

export default DirectorBox;