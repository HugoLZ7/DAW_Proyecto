let revenueChart, campaignChart;

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar gráfico ingresos mensuales
    const revenueCtx = document.getElementById("revenueChart").getContext("2d");
    revenueChart = new Chart(revenueCtx, {
        type: "line",
        data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [{
                label: "Ingresos",
                data: [42000, 48000, 53000, 50000, 60000, 58000, 62000, 65000, 70000, 69000, 74000, 75000],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.1)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });

    // Inicializar gráfico campañas
    const campaignCtx = document.getElementById("campaignChart").getContext("2d");
    campaignChart = new Chart(campaignCtx, {
        type: "doughnut",
        data: {
            labels: ["SUC.SANTA ELENA", "SUC.MASFE", "SUC.PIEDRA"],
            datasets: [{
                data: [6510, 3487, 1568],
                backgroundColor: ["#ffc107", "#007bff", "#28a745"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '60%',
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });

    // Restaurar datos desde localStorage si existen//////////////////////
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            updateCharts(parsed);
        } catch (e) {
            console.error("Error al cargar datos desde localStorage:", e);
        }
    }

    // Escuchar evento de importación de archivo JSON
    const input = document.getElementById("inputJSONFinanzas");
    if (input) {
        input.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result);

                    // Validar estructura básica
                    if (!data.ingresos || !data.campañas) {
                        alert("JSON inválido. Debe tener las propiedades { ingresos, campañas }.");
                        return;
                    }

                    // Guardar en localStorage
                    localStorage.setItem("dashboardData", JSON.stringify(data));

                    // Actualizar gráficos
                    updateCharts(data);
                } catch (error) {
                    alert("Error leyendo JSON: " + error.message);
                }
            };
            reader.readAsText(file);
        });
    }
});

// Función para actualizar los gráficos con datos nuevos
function updateCharts(data) {
    // Actualizar gráfico de ingresos
    if (data.ingresos?.labels && data.ingresos?.data) {
        revenueChart.data.labels = data.ingresos.labels;
        revenueChart.data.datasets[0].data = data.ingresos.data;
        revenueChart.update();
    }

    // Actualizar gráfico de campañas
    if (data.campañas?.labels && data.campañas?.data) {
        campaignChart.data.labels = data.campañas.labels;
        campaignChart.data.datasets[0].data = data.campañas.data;
        campaignChart.update();
    }
    if (data.campañas?.colors) {
    campaignChart.data.datasets[0].backgroundColor = data.campañas.colors;
    }
    // Actualizar indicadores del HTML
if (data.indicadores) {
    if (typeof data.indicadores.ventasTotales === 'number') {
        document.getElementById("ventasTotales").textContent = `$${data.indicadores.ventasTotales.toLocaleString()}`;
    }
    if (typeof data.indicadores.empleadosTotales === 'number') {
        document.getElementById("empleadosTotales").textContent = data.indicadores.empleadosTotales.toLocaleString();
    }
    if (typeof data.indicadores.sucursalesTotales === 'number') {
        document.getElementById("sucursalesTotales").textContent = data.indicadores.sucursalesTotales.toLocaleString();
    }
    if (typeof data.indicadores.gananciasTotales === 'number') {
        // Mostrar con "k" si es mayor a 1000
        const ganancias = data.indicadores.gananciasTotales;
        document.getElementById("gananciasTotales").textContent =
            ganancias >= 1000 ? `$${(ganancias / 1000).toFixed(1)}k` : `$${ganancias}`;
    }
}


}

// Función para exportar los datos actuales del dashboard como JSON
function exportDashboardData() {
    const data = {
        ingresos: {
            labels: revenueChart.data.labels,
            data: revenueChart.data.datasets[0].data
        },
        campañas: {
            labels: campaignChart.data.labels,
            data: campaignChart.data.datasets[0].data
        }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "dashboardData.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}