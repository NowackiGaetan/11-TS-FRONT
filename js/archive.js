// let archivesTable = document.getElementById('archivesTable');

// fetch(`http://localhost:28154/commandes-expediees/all`)
// .then(response => {
//   if (!response.ok) {
//     throw new Error(`Erreur de réseau - ${response.statusText}`);
//   }
//   return response.json();
// })
// .then(data => {
//   const tbody = document.querySelector('table tbody');
  
//   tbody.innerHTML = '';

//   data.forEach(item => {
//       let tableRow = document.createElement('tr');

//       let dateCell = document.createElement('td');
//       dateCell.textContent = item.date;
//       tableRow.appendChild(dateCell);

//       let devisCell = document.createElement('td');
//       devisCell.textContent = item.devis;
//       tableRow.appendChild(devisCell);

//       let packCell = document.createElement('td');
//       packCell.textContent = item.pack;
//       tableRow.appendChild(packCell);

//       let paletteCell = document.createElement('td');
//       paletteCell.textContent = item.palette;
//       tableRow.appendChild(paletteCell);

//       tbody.appendChild(tableRow);
//   });
// })
// .catch(error => {
//   console.error('Erreur lors de la récupération des données:', error);
//   alert('Erreur lors de la récupération des données');
// });

let archivesTable = document.getElementById('archivesTable');
let itemsPerPage = 20;
let currentPage = 1;
let data; // Variable globale pour stocker les données

function renderTable() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    data.slice(startIndex, endIndex).forEach(item => {
        let tableRow = document.createElement('tr');

        let dateCell = document.createElement('td');
        dateCell.textContent = item.date;
        tableRow.appendChild(dateCell);

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

    updatePaginationUI();
}

function updatePaginationUI() {
    let totalPages = Math.ceil(data.length / itemsPerPage);
    let paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const maxVisiblePages = 5; // Nombre maximal de pages à afficher

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
        let firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.addEventListener('click', () => {
            currentPage = 1;
            renderTable();
        });
        paginationDiv.appendChild(firstPageButton);

        if (startPage > 2) {
            let ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            paginationDiv.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        paginationDiv.appendChild(pageButton);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            let ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            paginationDiv.appendChild(ellipsis);
        }

        let lastPageButton = document.createElement('button');
        lastPageButton.textContent = totalPages;
        lastPageButton.addEventListener('click', () => {
            currentPage = totalPages;
            renderTable();
        });
        paginationDiv.appendChild(lastPageButton);
    }

    console.log(`Page ${currentPage} sur ${totalPages}`);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:28154/commandes-expediees/all`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de réseau - ${response.statusText}`);
            }
            return response.json();
        })
        .then(responseData => {
            data = responseData;
            renderTable();
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            alert('Erreur lors de la récupération des données');
        });
});