function createGraph(ctx) {
    const graph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 67', 'Day 68', 'Day 69', 'Day 70', 'Day 71', 'Day 72', 'Day 73', 'Day 74', 'Day 75', 'Day 76',
                    'Day 77', 'Day 78', 'Day 79', 'Day 80', 'Day 81', 'Day 82', 'Day 83', 'Day 84', 'Day 85', 'Day 86'
            ],
            datasets: [
                {
                    label: '',
                    data: [1, 5, 2, 3, 7, 16, 10, 12, 11, 13, 16, 20, 40, 45, 50, 55, 57, 58, 59, 60],
                    borderColor: LIGHT_COLOR,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 3,
                    pointBackgroundColor: LIGHT_COLOR,
                    pointBorderColor: DARK_COLOR,
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0,
                    fill: false,
                    segment: {
                        borderColor: (ctx) => {
                            const valStart = ctx.p0.parsed.y;
                            const valEnd = ctx.p1.parsed.y;
        
                            return valEnd >= valStart ? "#00A86B" : "#ff4d6a";
                        },
                        backgroundColor: "#FFFFFF"
                    }
                },
            ]
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: LIGHT_COLOR,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    titleColor: DARK_COLOR,
                    bodyColor: DARK_COLOR,
                    padding: 12,
                    cornerRadius: 10
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: "#808080"
                    },
                    border: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            transitions: {
                lohman: {
                    animation: {
                        duration: 300,
                    }
                }
            }
        }
    });
    return graph
}
