// src/chart.tsx
/** @jsx createElement */
import { createElement, ComponentProps } from './jsx-runtime';
import { DataPoint } from './data-service';

export interface ChartProps extends ComponentProps {
    type: 'bar' | 'line' | 'pie';
    data: DataPoint[];
    width: number;
    height: number;
}

// --- Chart Drawing Functions ---
const drawBarChart = (
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    width: number,
    height: number
) => {
    const barWidth = width / data.length * 0.8;
    const spacing = width / data.length * 0.2;
    const maxValue = Math.max(...data.map(d => d.value));

    ctx.fillStyle = '#3498db'; // Bar color

    data.forEach((d, i) => {
        const barHeight = (d.value / maxValue) * height * 0.9; // 90% of height
        const x = (barWidth + spacing) * i;
        const y = height - barHeight;

        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw label
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(d.label, x + barWidth / 2, height - 5, barWidth);
    });
};

const drawLineChart = (
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    width: number,
    height: number
) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const stepX = width / (data.length - 1);
    const scaleY = height * 0.9 / maxValue; // 90% of height

    ctx.strokeStyle = '#e74c3c'; // Line color
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((d, i) => {
        const x = i * stepX;
        const y = height - (d.value * scaleY);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#c0392b';
    data.forEach((d, i) => {
        const x = i * stepX;
        const y = height - (d.value * scaleY);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
};

const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    width: number,
    height: number
) => {
    const totalValue = data.reduce((sum, d) => sum + d.value, 0);
    const radius = Math.min(width, height) / 2 * 0.9;
    const centerX = width / 2;
    const centerY = height / 2;

    let startAngle = 0;
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];

    data.forEach((d, i) => {
        const sliceAngle = (d.value / totalValue) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        startAngle = endAngle;
    });
};

export const Chart = ({ type, data, width, height }: ChartProps) => {

    console.log('Chart data:', data); // <-- ADD THIS LINE

    const canvasRef = (canvasEl: HTMLCanvasElement | null) => {
        console.log('--- canvasRef CALLED ---');
        if (!canvasEl) return; // Element not ready

        canvasEl.width = width;
        canvasEl.height = height;

        const ctx = canvasEl.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context'); // <-- ADD THIS
            return;
        }

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, width, height);

        // Call the correct drawing function based on the type prop
        switch (type) {
            case 'bar':
                drawBarChart(ctx, data, width, height);
                break;
            case 'line':
                drawLineChart(ctx, data, width, height);
                break;
            case 'pie':
                drawPieChart(ctx, data, width, height);
                break;
            default:
                console.warn(`Unknown chart type: ${type}`);
        }
    };

    const handleCanvasClick = (e: MouseEvent) => {
        const canvas = e.target as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log(`Canvas click at: (${x}, ${y})`);
    };

    return (
        <canvas
            ref={canvasRef}
            // Width and Height are now set *inside* the ref
            onClick={handleCanvasClick}
            className="chart-canvas"
        />
    );
};