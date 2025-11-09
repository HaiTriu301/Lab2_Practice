// src/data-service.ts
const CATEGORIES = ['Sales', 'Marketing', 'Development', 'Support'];
export class DataService {
    constructor() {
        this.mockData = this.generateMockData(50);
    }
    generateMockData(count) {
        const data = [];
        const now = Date.now();
        for (let i = 0; i < count; i++) {
            data.push({
                label: `Item ${i + 1}`,
                value: Math.floor(Math.random() * 1000) + 50,
                category: CATEGORIES[i % CATEGORIES.length],
                timestamp: now - (count - i) * 1000 * 60 * 60, // Data points spaced by 1 hour
            });
        }
        return data;
    }
    getData() {
        return this.mockData;
    }
    filterData(filters) {
        return this.mockData.filter(dp => {
            const categoryMatch = filters.category ? dp.category === filters.category : true;
            const dateMatch = filters.startDate ? dp.timestamp >= filters.startDate : true;
            return categoryMatch && dateMatch;
        });
    }
    simulateRealTimeUpdate() {
        // Remove the oldest data point
        this.mockData.shift();
        // Add a new one
        const newPoint = {
            label: `New Item ${this.mockData.length + 1}`,
            value: Math.floor(Math.random() * 1000) + 50,
            category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
            timestamp: Date.now(),
        };
        this.mockData.push(newPoint);
        return newPoint;
    }
}
// Export a singleton instance
export const dataService = new DataService();
