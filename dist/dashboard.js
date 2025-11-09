// src/dashboard.tsx
/** @jsx createElement */
import { createElement, useState } from './jsx-runtime';
import { dataService } from './data-service';
import { Card } from './components'; // Input is no longer used, but we'll leave it
import { Chart } from './chart';
export const DashboardApp = () => {
    // State for the data and chart type
    const [getData, setData] = useState(dataService.getData());
    const [getChartType, setChartType] = useState('bar');
    // --- Filter state and handler removed ---
    const handleChartTypeChange = (e) => {
        const newType = e.target.value;
        setChartType(newType);
    };
    const handleSimulation = () => {
        console.log("Simulating one update...");
        dataService.simulateRealTimeUpdate();
        // FIX: Just get all data, don't filter
        setData(dataService.getData());
    };
    return (createElement("div", { className: "dashboard-app" },
        createElement("header", { className: "dashboard-header" },
            createElement("h1", null, "Data Dashboard")),
        createElement("div", { className: "dashboard-controls" },
            createElement(Card, { title: "Controls" },
                createElement("div", { className: "control-group" },
                    createElement("label", { for: "chartType" }, "Chart Type:"),
                    createElement("select", { id: "chartType", onChange: handleChartTypeChange },
                        createElement("option", { value: "bar", selected: getChartType() === 'bar' }, "Bar"),
                        createElement("option", { value: "line", selected: getChartType() === 'line' }, "Line"),
                        createElement("option", { value: "pie", selected: getChartType() === 'pie' }, "Pie"))),
                createElement("div", { className: "control-group" },
                    createElement("button", { onClick: handleSimulation, className: "btn" }, "Simulate Real-Time Update")))),
        createElement("main", { className: "dashboard-main" },
            createElement(Card, { title: `${getChartType().toUpperCase()} Chart` },
                createElement(Chart, { type: getChartType(), data: getData(), width: 600, height: 400 })))));
};
