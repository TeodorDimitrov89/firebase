const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// Create element and render cafe
const renderCafe = (doc) => {
  let li = document.createElement('li');
  console.log(li);
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');
  li.setAttribute('data-id', doc.id);

  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);
  // deleting data

  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = e.target.parentElement.getAttribute('data-id');
    cross.parentElement.remove();

    db.collection('cafes') // To find individual document from firebase we need to use doc method
      .doc(id)
      .delete();
  });
};

// db.collection('cafes')
//   .get()
//   .then((snapshot) => {
//     // snapshot.docs is a collection of all our documents and we need to forEach method to access them
//     snapshot.docs.forEach((doc) => {
//       //doc.data() To get the actual data we need to access the data method
//       renderCafe(doc);
//     });
//   });

// Making Queries
db.collection('cafes')
  .where('city', '==', 'Liverpool')
  .get()
  .then((snapshot) => {
    // snapshot.docs is a collection of all our documents and we need to forEach method to access them
    snapshot.docs.forEach((doc) => {
      //doc.data() To get the actual data we need to access the data method
      renderCafe(doc);
    });
  });

// Saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value,
  });

  form.reset();
});
