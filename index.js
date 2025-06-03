document.addEventListener('DOMContentLoaded', function () {
    const goproColor = 'rgba(0, 165, 224, 0.7)';
    const djiColor = 'rgba(229, 9, 20, 0.7)';
    const goproBorder = 'rgba(0, 165, 224, 1)';
    const djiBorder = 'rgba(229, 9, 20, 1)';

    const createBarChart = (ctx, labels, data, chartTitle, backgroundColors, borderColors) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    label += context.parsed.x + ' ' + (context.dataset.label.includes('Menit') ? 'Menit' : 'Piksel');
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: chartTitle.includes('Waktu') || chartTitle.includes('Kecepatan') ? 'Menit' : 'Resolusi Horizontal (Piksel)'
                        }
                    }
                }
            }
        });
    };
    
    if (document.getElementById('resolutionChart')) {
        const ctxRes = document.getElementById('resolutionChart').getContext('2d');
        createBarChart(ctxRes, ['GoPro Hero 12', 'DJI Action 5 Pro'], [5568, 7296], 'Resolusi Foto (Piksel)', [goproColor, djiColor], [goproBorder, djiBorder]);
    }

    if (document.getElementById('batteryChart')) {
        const ctxBattery = document.getElementById('batteryChart').getContext('2d');
        createBarChart(ctxBattery, ['GoPro Hero 12', 'DJI Action 5 Pro'], [100, 160], 'Waktu Rekam (Menit)', [goproColor, djiColor], [goproBorder, djiBorder]);
    }

    if (document.getElementById('chargingChart')) {
         const ctxCharging = document.getElementById('chargingChart').getContext('2d');
         new Chart(ctxCharging, {
            type: 'bar',
            data: {
                labels: ['GoPro Hero 12', 'DJI Action 5 Pro'],
                datasets: [{
                    label: 'Waktu Pengisian hingga 80% (Menit)',
                    data: [180 * 0.8, 18],
                    backgroundColor: [goproColor, djiColor],
                    borderColor: [goproBorder, djiBorder],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true, title: { display: true, text: 'Menit (lebih rendah lebih baik)' } } }
            }
        });
    }

    const recommendationBtns = document.querySelectorAll('.recommendation-btn');
    const recommendationContents = document.querySelectorAll('.recommendation-content');
    const goproCard = document.getElementById('gopro-card');
    const djiCard = document.getElementById('dji-card');
    const goproDefault = document.getElementById('gopro-default');
    const djiDefault = document.getElementById('dji-default');

    recommendationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;

            goproCard.classList.remove('is-recommended', 'gopro-recommended');
            djiCard.classList.remove('is-recommended');
            
            recommendationContents.forEach(content => content.classList.add('hidden'));
            goproDefault.classList.remove('hidden');
            djiDefault.classList.remove('hidden');
            
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                if (targetId.startsWith('gopro')) {
                    goproCard.classList.add('is-recommended', 'gopro-recommended');
                    goproDefault.classList.add('hidden');
                } else {
                    djiCard.classList.add('is-recommended');
                    djiDefault.classList.add('hidden');
                }
            }
        });
    });
});
