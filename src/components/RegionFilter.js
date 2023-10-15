// Filter.js
import React from 'react';

function RegionFilter({ selectedRegion, onRegionChange }) {
  return (
    <div>
      <label htmlFor="region">Select Region:</label>
      <select
        id="region"
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="Northern America">Northern America</option>
        <option value="Central America">Central America</option>
        <option value="Western Africa">Western Africa</option>
        
      </select>
    </div>
  );
}

export default RegionFilter;
