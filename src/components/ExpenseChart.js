import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {
    const categoryTotals = {};
    expenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: colors.slice(0, Object.keys(categoryTotals).length),
        }]
    };

    if (expenses.length === 0) return <p className="empty">Add expenses to see chart</p>;

    return (
        <div className="chart-container">
            <h3>By Category</h3>
            <Doughnut data={data} />
        </div>
    );
}

export default ExpenseChart;
