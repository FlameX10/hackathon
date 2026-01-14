import React from 'react';

const MineDetailsPanel = ({ mine, onClose }) => {
  if (!mine) return null;

  const { properties, geometry } = mine;
  const [lng, lat] = geometry.coordinates;

  return (
    <div className="absolute bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-10 animate-slideIn">
      {/* Header with close button */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white truncate">{properties.display_name}</h2>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-800 rounded-full w-8 h-8 flex items-center justify-center transition"
          aria-label="Close details"
        >
          ✕
        </button>
      </div>

      {/* Details Content */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {/* Mine ID */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Mine ID</p>
          <p className="text-lg font-semibold text-orange-600 mt-1">{properties.mine_id}</p>
        </div>

        {/* State */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">State</p>
          <p className="text-lg font-semibold text-blue-600 mt-1">{properties.state}</p>
        </div>

        {/* District */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">District</p>
          <p className="text-lg font-semibold text-green-600 mt-1">{properties.district}</p>
        </div>

        {/* Sub-district */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Sub-district</p>
          <p className="text-lg font-semibold text-purple-600 mt-1">{properties.subdistrict}</p>
        </div>

        {/* Coordinates */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-3">Coordinates</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Latitude:</span>
              <span className="text-sm text-gray-900 font-mono">{lat.toFixed(6)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Longitude:</span>
              <span className="text-sm text-gray-900 font-mono">{lng.toFixed(6)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MineDetailsPanel;
