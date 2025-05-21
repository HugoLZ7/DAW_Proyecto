document.addEventListener("DOMContentLoaded", () => {
    initCharts();
  });
 document.getElementById('exportDashboardBtn').addEventListener('click', () => {
      if (typeof exportDashboardData === 'function') {
        exportDashboardData();
      } else {
        alert('Función de exportación no definida.');
      }
    });  