# NDVI vs NBR Scatter Plot Implementation

## Overview
Added an interactive NDVI vs NBR scatter plot visualization that displays when a mine is clicked on the frontend map. The visualization shows clear separation between disturbed and undisturbed land using spectral index data.

## Components Created

### 1. **NDVIvsNBRScatter.jsx**
Location: `frontend/src/components/NDVIvsNBRScatter.jsx`

**Features:**
- Loads pixel timeseries data from the CSV file
- Filters data by mine ID
- Creates an interactive scatter plot using Plotly.js
- Separates data points by anomaly classification:
  - **Red points** (Anomaly = 1): Disturbed Land
  - **Green points** (Anomaly = -1): Undisturbed Land
- Point size represents anomaly_score (larger = higher anomaly confidence)
- Interactive tooltips showing:
  - NDVI value
  - NBR value
  - Anomaly Score

**Technical Details:**
- Uses `react-plotly.js` for visualization
- Uses `papaparse` for CSV parsing
- Imports CSV data as raw text using Vite's `?raw` query parameter
- Responsive design that fills available container space
- Handles loading states gracefully

### 2. **Updated MineDetailsPanel.jsx**
Location: `frontend/src/components/MineDetailsPanel.jsx`

**Changes:**
- Added tab-based interface with two tabs:
  - **📋 Mine Info**: Shows existing mine information (ID, State, District, etc.)
  - **📊 NDVI vs NBR**: Shows the new scatter plot visualization
- Expanded panel size from `w-96` to `w-full max-w-4xl` to accommodate the scatter plot
- Added vertical scrolling for info content
- Smooth transitions between tabs

## Data Flow

1. User clicks on a mine on the map
2. `MineDetailsPanel` component receives the selected mine
3. User clicks "📊 NDVI vs NBR" tab
4. `NDVIvsNBRScatter` component loads and processes CSV data
5. Data is filtered by `mine_id`
6. Plotly scatter plot is rendered with:
   - NDVI on X-axis
   - NBR on Y-axis
   - Color coding for anomaly classification
   - Point size for anomaly confidence

## CSV Data Structure

The `pixel_timeseries (1).csv` file contains:
- `mine_id`: Identifier for the mine
- `ndvi`: Normalized Difference Vegetation Index (X-axis)
- `nbr`: Normalized Burn Ratio (Y-axis)
- `anomaly_label`: Classification (-1 or 1)
- `anomaly_score`: Confidence score for the anomaly

## Dependencies Installed

```bash
npm install react-plotly.js plotly.js papaparse
```

## Visual Encoding

| Element | Meaning |
|---------|---------|
| **Red Points** | Disturbed Land (Anomaly = 1) |
| **Green Points** | Undisturbed Land (Anomaly = -1) |
| **Point Size** | Anomaly Score magnitude |
| **X-Axis** | NDVI Value (Vegetation Index) |
| **Y-Axis** | NBR Value (Burn Ratio) |

## Interactions Available

- **Hover**: Shows NDVI, NBR, and Anomaly Score values
- **Zoom**: Scroll to zoom in/out
- **Pan**: Click and drag to pan around the plot
- **Legend**: Click legend items to show/hide anomaly types
- **Download**: Export plot as PNG (Plotly's built-in feature)

## File Modifications

### New Files:
- `frontend/src/components/NDVIvsNBRScatter.jsx`

### Modified Files:
- `frontend/src/components/MineDetailsPanel.jsx` - Added tab interface and imported scatter plot component
- `frontend/package.json` - Added plotly.js, react-plotly.js, and papaparse dependencies

## Usage

1. Start the development server: `npm run dev`
2. Open the application in your browser
3. Click on any mine marker on the map
4. Click the "📊 NDVI vs NBR" tab in the mine details panel
5. View the scatter plot showing spectral analysis for that mine

## Design Considerations

- **Performance**: CSV data is loaded once per mine selection
- **Responsive**: Plot adapts to container size
- **User-Friendly**: Clear color coding and interactive tooltips
- **Scalable**: Handles large datasets with point size based on anomaly score
- **Accessible**: Proper labeling and legend for accessibility

## Future Enhancements

- Add temporal filtering (view data for specific date ranges)
- Add statistical summary (correlation, distribution analysis)
- Add zoom to specific geographic regions
- Cache CSV data to reduce load times
- Add time-series animation showing changes over time
- Export functionality for analysis in other tools
