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
      containerArray.innerHTML = '';
        console.log(data);
      data.forEach(item => {
        console.log(item);
        let listItem = document.createElement('li');
        listItem.innerHTML = `Date: ${item.date}, Devis: ${item.devis}, Pack: ${item.pack}`;
        containerArray.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
      alert('Erreur lors de la récupération des données');
    });
}

function clearContainer() {
  let containerArray = document.getElementById('container-array');
  containerArray.innerHTML = '';
}

function redirectToArchive(){
    let archivedData = JSON.parse(localStorage.getItem('archivedData')) || [];

    archivedData.push(...array);

    localStorage.setItem('archivedData', JSON.stringify(archivedData));

    window.location.href = 'archive.html';
}