import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import SearchBar from './components/SearchBar';
import MinesList from './components/MinesList';
import MineDetails from './components/MineDetails';
import { getMinesData } from './utils/dataLoader';
import { filterMines, getUniqueStates } from './utils/mapsUtils';

function App() {
  const [allMines, setAllMines] = useState([]);
  const [filteredMines, setFilteredMines] = useState([]);
  const [selectedMine, setSelectedMine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mines data on mount
  useEffect(() => {
    try {
      const minesData = getMinesData();
      setAllMines(minesData.features);
      setFilteredMines(minesData.features);
      setStates(getUniqueStates(minesData.features));
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading mines data:', error);
      setIsLoading(false);
    }
  }, []);

  // Filter mines whenever search term or state changes
  useEffect(() => {
    const filtered = filterMines(allMines, searchTerm, selectedState);
    setFilteredMines(filtered);
    // Reset selected mine if it's not in filtered results
    if (selectedMine && !filtered.find(m => m.properties.mine_id === selectedMine.properties.mine_id)) {
      setSelectedMine(null);
    }
  }, [searchTerm, selectedState, allMines, selectedMine]);

  const handleMineSelect = (mine) => {
    setSelectedMine(mine);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header totalMines={allMines.length} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Search and Mines List */}
        <div className="w-80 flex flex-col gap-4 p-4 overflow-hidden bg-gray-100">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedState={selectedState}
            onStateChange={setSelectedState}
            states={states}
          />
          <MinesList
            mines={filteredMines}
            selectedMine={selectedMine}
            onMineSelect={handleMineSelect}
            isLoading={isLoading}
          />
        </div>

        {/* Center - Map */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <MapComponent
            mines={filteredMines}
            selectedMine={selectedMine}
            onMineSelect={handleMineSelect}
          />
        </div>

        {/* Right Sidebar - Mine Details */}
        <div className="w-80 p-4 overflow-y-auto bg-gray-100 custom-scrollbar">
          <MineDetails mine={selectedMine} />
        </div>
      </div>
    </div>
  );
}

export default App;
