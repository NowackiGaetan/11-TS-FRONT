var tableauDonnees = [];

function ajouterLigne() {
    var date = document.getElementById("date").value;
    var devis = document.getElementById("devis").value;
    var pack = document.getElementById("pack").value;
    var palette = document.getElementById("palette").value;

    var table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    var nouvelleLigne = table.insertRow(table.rows.length);
    
    var cellules = [date, devis, pack, palette];

    for (var i = 0; i < cellules.length; i++) {
        var cellule = nouvelleLigne.insertCell(i);
        cellule.innerHTML = cellules[i];
    }

    var celluleSupprimer = nouvelleLigne.insertCell(cellules.length);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    celluleSupprimer.appendChild(checkbox);


    tableauDonnees.push({
        data: cellules,
        delete: false
    });
}

function envoyerDonnees() {
    var lignesActives = tableauDonnees.filter(function (ligne) {
        return ligne && ligne.data && !ligne.delete;
    });

    var dataToSend = lignesActives.map(ligne => {
        return {
            date: ligne.data[0],
            devis: ligne.data[1],
            pack: ligne.data[2],
            palette: ligne.data[3]
        };
    });

    fetch('http://localhost:28154/post/commandes-expediees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        console.log('Réponse du serveur:', data);
    })
    .catch((error) => {
        console.error('Erreur lors de l\'envoi des données:', error);
    });
}

function corrigerLignes() {
    var checkboxes = document.querySelectorAll("#dataTable tbody input[type=checkbox]");
    for (var i = 0; i < checkboxes.length; i++) {
        tableauDonnees[i].delete = checkboxes[i].checked;
    }

    var table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            table.deleteRow(i);
        }
    }
}
