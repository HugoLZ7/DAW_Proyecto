 // Datos ejemplo para localStorage si está vacío
    const defaultEmpleados = [
      { nombre: "Ana Martínez", rendimiento: 78, departamento: "Ventas" },
      { nombre: "Carlos Ruiz", rendimiento: 92, departamento: "Marketing" },
      { nombre: "Lucía Torres", rendimiento: 85, departamento: "Finanzas" },
      { nombre: "Marcos Vidal", rendimiento: 60, departamento: "Ventas" }
    ];

    if (!localStorage.getItem('empleados')) {
      localStorage.setItem('empleados', JSON.stringify(defaultEmpleados));
    }

    const empleados = JSON.parse(localStorage.getItem('empleados'));
    const empleadosList = document.getElementById('empleadosList');
    const totalEmpleados = document.getElementById('totalEmpleados');

    // Mostrar empleados
    empleados.forEach(e => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.textContent = `${e.nombre} - ${e.departamento}`;
      empleadosList.appendChild(li);
    });

    totalEmpleados.textContent = empleados.length;

    // Exportar JSON
    document.getElementById('exportEmpleadosBtn').addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(empleados, null, 2));
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "empleados.json");
      dlAnchorElem.click();
    });

    // Gráfico de rendimiento
    const ctxPerformance = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctxPerformance, {
      type: 'bar',
      data: {
        labels: empleados.map(e => e.nombre),
        datasets: [{
          label: 'Rendimiento',
          data: empleados.map(e => e.rendimiento),
          backgroundColor: 'rgba(54, 162, 235, 0.7)'
        }]
      }
    });

    // Gráfico de distribución por departamento
    const deptos = {};
    empleados.forEach(e => {
      deptos[e.departamento] = (deptos[e.departamento] || 0) + 1;
    });

    const ctxDonut = document.getElementById('donutChart').getContext('2d');
    new Chart(ctxDonut, {
      type: 'doughnut',
      data: {
        labels: Object.keys(deptos),
        datasets: [{
          label: 'Departamentos',
          data: Object.values(deptos),
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e']
        }]
      }
    });