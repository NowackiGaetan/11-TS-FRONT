let tableauDonnees = [];

function ajouterLigne() {
    let date = document.getElementById("date").value;
    let devis = document.getElementById("devis").value;
    let pack = document.getElementById("pack").value;
    let palette = document.getElementById("palette").value;

    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let nouvelleLigne = table.insertRow(table.rows.length);
    
    let cellules = [date, devis, pack, palette];

    for (let i = 0; i < cellules.length; i++) {
        let cellule = nouvelleLigne.insertCell(i);
        cellule.innerHTML = cellules[i];
    }

    let celluleSupprimer = nouvelleLigne.insertCell(cellules.length);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    celluleSupprimer.appendChild(checkbox);


    tableauDonnees.push({
        data: cellules,
        delete: false
    });
}

function envoyerDonnees() {
    let date = document.getElementById("date");
    let devis = document.getElementById("devis");
    let pack = document.getElementById("pack");
    let palette = document.getElementById("palette");
    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];

    let lignesActives = tableauDonnees.filter(function (ligne) {
        return ligne && ligne.data && !ligne.delete;
    });

    let dataToSend = lignesActives.map(ligne => {
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
        alert("Commandes expediees avec succès!");
        devis.value ="";
        pack.value ="";
        palette.value ="";
        table.innerHTML ="";
    })
    .catch((error) => {
        console.error('Erreur lors de l\'envoi des données:', error);
    });
}

function corrigerLignes() {
    let checkboxes = document.querySelectorAll("#dataTable tbody input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
        tableauDonnees[i].delete = checkboxes[i].checked;
    }

    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            table.deleteRow(i);
        }
    }
}



let showTable = document.getElementsByClassName("showTable")[0];
let containerDataTable = document.querySelector(".container-table-expedition");

showTable.addEventListener("click", function() {
    if (containerDataTable.style.display === "none" || containerDataTable.style.display === "") {
        containerDataTable.style.display = "table";
    } else {
        containerDataTable.style.display = "none";
    }
});



