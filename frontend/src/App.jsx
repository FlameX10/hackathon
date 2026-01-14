import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import MineDetailsPanel from './components/MineDetailsPanel';
import { getMinesData } from './utils/dataLoader';

function App() {
  const [allMines, setAllMines] = useState([]);
  const [selectedMine, setSelectedMine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load mines data on mount
  useEffect(() => {
    try {
      const minesData = getMinesData();
      setAllMines(minesData.features);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading mines data:', error);
      setIsLoading(false);
    }
  }, []);

  const handleMineSelect = (mine) => {
    setSelectedMine(mine);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header totalMines={allMines.length} />

      {/* Main Content - Map Takes Full Width */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Full Screen Map */}
        <div className="flex-1">
          <MapComponent
            mines={allMines}
            selectedMine={selectedMine}
            onMineSelect={handleMineSelect}
            isLoading={isLoading}
          />
        </div>

        {/* Floating Details Panel */}
        {selectedMine && (
          <MineDetailsPanel 
            mine={selectedMine} 
            onClose={() => setSelectedMine(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
