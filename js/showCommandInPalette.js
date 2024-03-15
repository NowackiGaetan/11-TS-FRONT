let array = [];

function getHandleClick(){
    let containerArray = document.getElementById('container-array');
    let barcode = document.getElementById('barcode').value;

    fetch(`http://localhost:28154/${barcode}/devispalettes`)   
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const tbody = document.querySelector('table tbody');
      
      tbody.innerHTML = '';
  
      data.forEach(item => {
          let tableRow = document.createElement('tr');
  
          let dateCell = document.createElement('td');
          dateCell.textContent = item.date;
          tableRow.appendChild(dateCell);

          let dateRecep = new Date().toLocaleDateString();
          let dateRecepCell = document.createElement('td');
          dateRecepCell.textContent = dateRecep;
          tableRow.appendChild(dateRecepCell);
  
          let devisCell = document.createElement('td');
          devisCell.textContent = item.devis;
          tableRow.appendChild(devisCell);
  
          let packCell = document.createElement('td');
          packCell.textContent = item.pack;
          tableRow.appendChild(packCell);

          let paletteCell = document.createElement('td');
          paletteCell.textContent = item.palette;
          tableRow.appendChild(paletteCell);
  
          tbody.appendChild(tableRow);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
      alert('Erreur lors de la récupération des données');
    });
}

function clearContainer() {
  const tbody = document.querySelector('table tbody');
  tbody.innerHTML = '';
}


