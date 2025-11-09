// src/dashboard.tsx
/** @jsx createElement */
import { createElement, useState } from './jsx-runtime';
import { DataPoint, dataService } from './data-service';
import { Card, Input } from './components'; // Input is no longer used, but we'll leave it
import { Chart } from './chart';

type ChartType = 'bar' | 'line' | 'pie';

export const DashboardApp = () => {
    // State for the data and chart type
    const [getData, setData] = useState<DataPoint[]>(dataService.getData());
    const [getChartType, setChartType] = useState<ChartType>('bar');

    // --- Filter state and handler removed ---

    const handleChartTypeChange = (e: Event) => {
        const newType = (e.target as HTMLSelectElement).value as ChartType;
        setChartType(newType);
    };

    const handleSimulation = () => {
        console.log("Simulating one update...");
        dataService.simulateRealTimeUpdate();

        // FIX: Just get all data, don't filter
        setData(dataService.getData());
    };

    return (
        <div className="dashboard-app">
            <header className="dashboard-header">
                <h1>Data Dashboard</h1>
            </header>

            <div className="dashboard-controls">
                <Card title="Controls">
                    {/* Chart Type Selector */}
                    <div className="control-group">
                        <label for="chartType">Chart Type:</label>
                        <select id="chartType" onChange={handleChartTypeChange}>
                            <option value="bar" selected={getChartType() === 'bar'}>Bar</option>
                            <option value="line" selected={getChartType() === 'line'}>Line</option>
                            <option value="pie" selected={getChartType() === 'pie'}>Pie</option>
                        </select>
                    </div>

                    {/* --- FILTER INPUT REMOVED --- */}

                    {/* Real-time Update Button */}
                    <div className="control-group">
                        <button onClick={handleSimulation} className="btn">
                            Simulate Real-Time Update
                        </button>
                    </div>
                </Card>
            </div>

            <main className="dashboard-main">
                <Card title={`${getChartType().toUpperCase()} Chart`}>
                    <Chart
                        type={getChartType()}
                        data={getData()} // This now contains the full random dataset
                        width={600}
                        height={400}
                    />
                </Card>
            </main>
        </div>
    );
};