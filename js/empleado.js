const empleados = [
    { nombre: "Ana Torres", rendimiento: 95, proyectos: 12 },
    { nombre: "Luis Pérez", rendimiento: 88, proyectos: 10 },
    { nombre: "Carlos Mendoza", rendimiento: 84, proyectos: 9 },
    { nombre: "Laura Jiménez", rendimiento: 78, proyectos: 8 },
    { nombre: "Ricardo Gómez", rendimiento: 76, proyectos: 7 }
  ];
  
  const empleadosRecientes = [
    { nombre: "Rosa Salazar", estado: "Nuevo" },
    { nombre: "Juan Díaz", estado: "Activo" },
    { nombre: "Pedro Rivas", estado: "Baja" },
    { nombre: "Juan Carlos", estado: "Activo" },
    { nombre: "Leo Rivera", estado: "Baja" }
  ];
  
  // Total empleados
  document.getElementById("totalEmpleados").textContent = empleados.length;
  
  // Tabla ranking
  const tabla = document.getElementById("rankingTable");
  empleados.forEach(emp => {
    tabla.innerHTML += `
      <tr>
        <td>${emp.nombre}</td>
        <td>${emp.proyectos}</td>
        <td>${emp.rendimiento}%</td>
      </tr>`;
  });
  
  // Lista recientes
  const lista = document.getElementById("recentList");
  empleadosRecientes.forEach(emp => {
    let color = "secondary";
    if (emp.estado === "Nuevo") color = "warning";
    else if (emp.estado === "Activo") color = "success";
    else if (emp.estado === "Baja") color = "danger";
  
    lista.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${emp.nombre}
        <span class="badge bg-${color}">${emp.estado}</span>
      </li>`;
  });
  
  // Gráfico de barras
  const ctx = document.getElementById("performanceChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: empleados.map(e => e.nombre),
      datasets: [{
        label: "Rendimiento",
        data: empleados.map(e => e.rendimiento),
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "#007bff",
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
  
  // Donut chart
  const donutCtx = document.getElementById("donutChart").getContext("2d");
  new Chart(donutCtx, {
    type: "doughnut",
    data: {
      labels: ["En Meta", "Bajo Rendimiento", "Alta Productividad"],
      datasets: [{
        data: [18, 7, 10],
        backgroundColor: ["#198754", "#ffc107", "#0d6efd"]
      }]
    },
    options: {
      responsive: true,
      cutout: "70%"
    }
  });
  