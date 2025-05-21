document.addEventListener("DOMContentLoaded", () => {
    // Línea de ingresos mensuales
    const revenueCtx = document.getElementById("revenueChart").getContext("2d");
    new Chart(revenueCtx, {
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
  
    // Gráfico circular campañas
    const campaignCtx = document.getElementById("campaignChart").getContext("2d");
    new Chart(campaignCtx, {
      type: "doughnut",
      data: {
        labels: ["Suc. Santa Elena", "Suc.Alameda", "Suc.Mascota"],
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
  });
  