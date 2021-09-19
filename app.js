const cafeList = document.querySelector('#cafe-list');

// Create element and render cafe

const renderCafe = (doc) => {
  let li = document.createElement('li');
  console.log(li);
  let name = document.createElement('span');
  let city = document.createElement('span');
  li.setAttribute('data-id', doc.id);

  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  li.appendChild(name);
  li.appendChild(city);

  cafeList.appendChild(li);
};

db.collection('cafes')
  .get()
  .then((snapshot) => {
    // snapshot.docs is a collection of all our documents and we need to forEach method to access them
    snapshot.docs.forEach((doc) => {
      //doc.data() To get the actual data we need to access the data method
      renderCafe(doc);
    });
  });
