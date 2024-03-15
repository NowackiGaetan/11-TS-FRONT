function filter() {
    let input = document.getElementById('devis-input').value.toUpperCase();
    let tableau = document.getElementById('archivesTable');
    let lignes = tableau.getElementsByTagName('tr');

    for (let i = 1; i < lignes.length; i++) {
        let cellules = lignes[i].getElementsByTagName('td');
        let afficherLigne = false;

        for (let j = 0; j < cellules.length; j++) {
            let texteCellule = cellules[j].innerText.toUpperCase();
            if (texteCellule.indexOf(input) > -1) {
                afficherLigne = true;
                break;
            }
        }

        if (afficherLigne) {
            lignes[i].style.display = "";
        } else {
            lignes[i].style.display = "none";
        }
    }
}

