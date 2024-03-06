let archivedData = JSON.parse(localStorage.getItem('archivedData')) || [];

    let archivedContainer = document.getElementById('archived-container');

    archivedData.forEach(item => {
      let listItem = document.createElement('p');
      listItem.textContent = `Date: ${item.date}, Devis: ${item.devis}, Pack: ${item.pack}`;
      archivedContainer.appendChild(listItem);
    });

