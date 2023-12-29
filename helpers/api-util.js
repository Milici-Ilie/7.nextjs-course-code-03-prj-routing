export async function getAllEvents() {
  const response = await fetch(
    "https://project7-nextjs-course-default-rtdb.firebaseio.com/events.json"
  ); //🧬🧬[STATIC SITE GENERATION]🧬🧬 always add '.json' at the end of links that are connected with 'FireBase' BackEnd
  // Transformă răspunsul într-un obiect JavaScript
  const data = await response.json();

  // Inițializează un array pentru a stoca evenimentele
  const events = [];

  // Iterează prin obiectul 'data' obținut de la Firebase
  for (const key in data) {
    // Pentru fiecare cheie din obiect, adaugă un obiect în arrayul 'events'
    events.push({
      id: key,
      ...data[key], // Se utilizează operatorul spread pentru a copia proprietățile obiectului din Firebase
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}
//🧬🧬[STATIC SITE GENERATION]🧬🧬

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
} //🍡🍡[DATA & PATHS]🍡🍡

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

//Cerere către Firebase:

// await fetch("https://project7-nextjs-course-default-rtdb.firebaseio.com/events.json"): Această linie face o cerere HTTP către baza de date Firebase pentru a obține informațiile despre evenimente. .json adăugat la sfârșitul URL-ului este specific Firebase și este necesar pentru a primi datele într-un format JSON.
// Transformare în Obiect JavaScript:

// const data = await response.json(): După primirea răspunsului de la Firebase, această linie îl transformă într-un obiect JavaScript.
// Iterare prin Date și Construirea unui Array de Evenimente:

// for (const key in data) { ... }: Acest buclu for...in iterează prin toate cheile din obiectul data obținut de la Firebase. Fiecare cheie reprezintă un eveniment în baza de date.
// events.push({ id: key, ...data[key] }): Pentru fiecare eveniment, un obiect este adăugat în arrayul events. Acest obiect are o proprietate id și toate proprietățile evenimentului obținute din data[key]. Se utilizează operatorul spread (...) pentru a copia toate proprietățile.
// Returnarea Array-ului de Evenimente:

// return events: Funcția returnează array-ul de evenimente construit pe baza datelor din Firebase.
