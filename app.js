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

  cafeList.prepend(li);
  // deleting data

  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = e.target.parentElement.getAttribute('data-id');
    // cross.parentElement.remove();

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
// db.collection('cafes')
//   .orderBy('createdAt', 'desc')
//   .get()
//   .then((snapshot) => {
//     // snapshot.docs is a collection of all our documents and we need to forEach method to access them
//     snapshot.docs.forEach((doc) => {
//       //doc.data() To get the actual data we need to access the data method
//       console.log(doc, 'doc');
//       renderCafe(doc);
//     });
//   });

// .collection("cafes")
// .orderBy("", "desc")

// Saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const createdAt = new Date().toString();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value,
    createdAt,
  });

  form.reset();
});

// real time listener
db.collection('cafes')
  .orderBy('createdAt', 'asc')
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach((change) => {
      if (change.type === 'added') {
        console.log(change.doc);
        renderCafe(change.doc);
      } else if (change.type === 'removed') {
        let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
        cafeList.removeChild(li);
      }
    });
  });
