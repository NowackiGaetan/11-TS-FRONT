// Assurez-vous que l'événement est correctement lié
document.getElementById('btn-archive').addEventListener('click', function () {
    envoyerVersBackend();
});

function envoyerVersBackend() {
    let tableData = [];
    let tbody = document.querySelector('table tbody');
    let barcode = document.getElementById('barcode');

    // Récupérer les données du tableau
    let rows = document.querySelectorAll('table tbody tr');

    rows.forEach(function (row) {
        let rowData = {};
        let cells = row.querySelectorAll('td');

        cells.forEach(function (cell, index) {
            if (index === 0) {
                rowData['Date'] = cell.textContent.trim();
            } else if (index === 1) {
                rowData['Devis'] = cell.textContent.trim();
            } else if (index === 2) {
                rowData['Pack'] = cell.textContent.trim();
            } else if (index === 3) {
                rowData['Palette'] = cell.textContent.trim();
            }
        });

        tableData.push(rowData);
        console.log(rowData);
    });

    // Envoi des données au backend
    fetch('http://localhost:28154/post/commandes-receptionnees', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(tableData),  
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.text();
})
.then(data => {
    console.log('Données envoyées avec succès', data);
    alert('Données envoyées avec succès');
    tbody.innerHTML ="";
    barcode.value="";
})
.catch(error => {
    console.error('Erreur lors de l\'envoi des données', error);
    alert('Erreur lors de l\'envoi des données', error);
});
}

