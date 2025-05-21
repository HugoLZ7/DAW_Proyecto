 // Datos de ejemplo si localStorage está vacío
    const defaultBranches = [
      { nombre: "Sucursal Centro", ciudad: "San Salvador", activa: true },
      { nombre: "Sucursal Norte", ciudad: "Santa Ana", activa: true },
      { nombre: "Sucursal Sur", ciudad: "San Miguel", activa: false },
      { nombre: "Sucursal Oeste", ciudad: "Santa Ana", activa: true }
    ];

    if (!localStorage.getItem('sucursales')) {
      localStorage.setItem('sucursales', JSON.stringify(defaultBranches));
    }

    const sucursales = JSON.parse(localStorage.getItem('sucursales'));
    const branchesList = document.getElementById('branchesList');
    const totalBranches = document.getElementById('totalBranches');
    const activeBranches = document.getElementById('activeBranches');
    const citiesCovered = document.getElementById('citiesCovered');

    // Mostrar listado
    sucursales.forEach(s => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `${s.nombre} - ${s.ciudad} <span class="badge ${s.activa ? 'bg-success' : 'bg-secondary'}">${s.activa ? 'Activa' : 'Inactiva'}</span>`;
      branchesList.appendChild(li);
    });

    // KPIs
    totalBranches.textContent = sucursales.length;
    activeBranches.textContent = sucursales.filter(s => s.activa).length;
    const uniqueCities = [...new Set(sucursales.map(s => s.ciudad))];
    citiesCovered.textContent = uniqueCities.length;

    // Exportar JSON
    document.getElementById('exportBranchesBtn').addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sucursales, null, 2));
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "sucursales.json");
      dlAnchorElem.click();
    });

    // Gráfico de sucursales por ciudad
    const ciudades = {};
    sucursales.forEach(s => {
      ciudades[s.ciudad] = (ciudades[s.ciudad] || 0) + 1;
    });

    const ctxBranchesChart = document.getElementById('branchesChart').getContext('2d');
    new Chart(ctxBranchesChart, {
      type: 'bar',
      data: {
        labels: Object.keys(ciudades),
        datasets: [{
          label: 'Cantidad de Sucursales',
          data: Object.values(ciudades),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      }
    });