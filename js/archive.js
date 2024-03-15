// let archivesTable = document.getElementById('archivesTable');
// let itemsPerPage = 20;
// let currentPage = 1;
// let data; 

// function renderTable() {
//     const tbody = document.querySelector('table tbody');
//     tbody.innerHTML = '';

//     let startIndex = (currentPage - 1) * itemsPerPage;
//     let endIndex = startIndex + itemsPerPage;

//     data.slice(startIndex, endIndex).forEach(item => {
//         let tableRow = document.createElement('tr');

//         let dateCell = document.createElement('td');
//         dateCell.textContent = item.date;
//         tableRow.appendChild(dateCell);

//         let devisCell = document.createElement('td');
//         devisCell.textContent = item.devis;
//         tableRow.appendChild(devisCell);

//         let packCell = document.createElement('td');
//         packCell.textContent = item.pack;
//         tableRow.appendChild(packCell);

//         let paletteCell = document.createElement('td');
//         paletteCell.textContent = item.palette;
//         tableRow.appendChild(paletteCell);

//         tbody.appendChild(tableRow);
//     });

//     updatePaginationUI();
// }

// function updatePaginationUI() {
//     let totalPages = Math.ceil(data.length / itemsPerPage);
//     let paginationDiv = document.getElementById('pagination');
//     paginationDiv.innerHTML = '';

//     const maxVisiblePages = 5; 

//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (startPage > 1) {
//         let firstPageButton = document.createElement('button');
//         firstPageButton.textContent = '1';
//         firstPageButton.addEventListener('click', () => {
//             currentPage = 1;
//             renderTable();
//         });
//         paginationDiv.appendChild(firstPageButton);

//         if (startPage > 2) {
//             let ellipsis = document.createElement('span');
//             ellipsis.textContent = '...';
//             paginationDiv.appendChild(ellipsis);
//         }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//         let pageButton = document.createElement('button');
//         pageButton.textContent = i;
//         pageButton.addEventListener('click', () => {
//             currentPage = i;
//             renderTable();
//         });
//         paginationDiv.appendChild(pageButton);
//     }

//     if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//             let ellipsis = document.createElement('span');
//             ellipsis.textContent = '...';
//             paginationDiv.appendChild(ellipsis);
//         }

//         let lastPageButton = document.createElement('button');
//         lastPageButton.textContent = totalPages;
//         lastPageButton.addEventListener('click', () => {
//             currentPage = totalPages;
//             renderTable();
//         });
//         paginationDiv.appendChild(lastPageButton);
//     }

//     console.log(`Page ${currentPage} sur ${totalPages}`);
// }

// document.addEventListener('DOMContentLoaded', () => {
//     fetch(`http://localhost:28154/commandes-receptionnees/all`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Erreur de réseau - ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then(responseData => {
//             data = responseData;
//             renderTable();
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération des données:', error);
//             alert('Erreur lors de la récupération des données');
//         });
// });

let archivesTable = document.getElementById('archivesTable');
let data; 

function renderTable() {
    const tbody = document.querySelector('table tbody');
    const theadRows = document.querySelectorAll('table thead tr');

    tbody.innerHTML = '';    

    data.forEach(item => {
        let tableRow = document.createElement('tr');

        let dateCell = document.createElement('td');
        dateCell.textContent = item.date;
        tableRow.appendChild(dateCell);

        let dateRecepCell = document.createElement('td');
        dateRecepCell.textContent = item.dateRecep;
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
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:28154/commandes-receptionnees/all`)
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

function convertToCSV(objArray) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    let headers = Object.keys(array[0]);
    headers = headers.filter(header => header !== 'id');

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let j = 0; j < headers.length; j++) {
            if (j > 0) line += ',';
            line += array[i][headers[j]];
        }
        str += line + '\r\n';
    }
    return str;
}

function downloadCSV(data) {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'table_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function handleExportButtonClick() {
    downloadCSV(data);
}


document.getElementById('exportBtn').addEventListener('click', handleExportButtonClick);