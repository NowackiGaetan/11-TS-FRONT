let archivesTable = document.getElementById('archivesTable');
let data; 

function renderTable() {
    const tbody = document.querySelector('table tbody');

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

// function convertToCSV(objArray) {
//     const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//     let str = '';

//     let headers = Object.keys(array[0]);
//     headers = headers.filter(header => header !== 'id');

//     for (let i = 0; i < array.length; i++) {
//         let line = '';
//         for (let j = 0; j < headers.length; j++) {
//             if (j > 0) line += ',';
//             line += array[i][headers[j]];
//         }
//         str += line + '\r\n';
//     }
//     return str;
// }

function convertToCSV(objArray) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    let headers = Object.keys(array[0]);
    headers = headers.filter(header => header !== 'id');

    const today = new Date().toLocaleDateString('fr-FR'); 

    const filteredData = array.filter(item => {
        const rowDate = item[headers[0]]; 
        return rowDate === today;
    });

    // Convertir les données filtrées en format CSV
    for (let i = 0; i < filteredData.length; i++) {
        let line = '';
        for (let j = 0; j < headers.length; j++) {
            if (j > 0) line += ',';
            line += filteredData[i][headers[j]];
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
        link.setAttribute('download', 'TABLEAU EXPE FENOUILLET.csv');
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