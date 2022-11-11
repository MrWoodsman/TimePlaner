// Zmienne
var lastDay = 0;
var today;
var calendar = document.getElementById('calendar')


function higlihtActualDay() {
    const date = new Date();    // Pobieranie daty
    today = date.getDate();     // Wybieranie dni z miesiaca
    // Pętla dla wszystkich elementów { .day }
    document.querySelectorAll('.day').forEach((e) => {
        // Wykonywanie tylko jeśli atrybut elementu równa się numerowi dnia
        if(e.getAttribute('day') == today) {
            // Kolorowanie dnia tygodnia
            e.classList.add('today')    // Dodawanie klasy 
            // Kolorowanie planu
            var num = e.id.slice(3)     // Zmiana danej { day1 } na { 1 }
            // Pętla dla wszystkich elementó { .color }
            document.querySelectorAll('.color').forEach((b) => {
                // Usuwanie klasy dla dziecka elementu o numerze { lastDay }
                b.children[lastDay].classList.remove('today')
                // Usuwanie klasy dla dziecka elementu o numerze { num }
                b.children[num].classList.add('today')
            })
            // Ustawianie { lastDay } na { num }
            lastDay = num
        } else {
            // Usuwanie klasy dla elementu
            e.classList.remove('today')
        }
    })
}

// Generowanie pseudoId na podstawie czasu
function generateID() {
    return Date.now()
}

// Tworzenie wierszy kalendarza dla wszystkich godzin dnia
function createCalendarHours() {
    // Pętla powtarzająca się 25 razy
    for (let i = 0; i < 24; i++) {
        // Tworzenie elementu { section }
        const row = document.createElement('section')   // Tworzenie elementu
        row.setAttribute('class','row color')   // Dodawanie klass
        // Tworzenie zawartości
        row.innerHTML = `
            <div class="hours"><div class="TIME"></div><h1>${i}:00</h1></div>
            <div class="events"></div>
            <div class="events"></div>
            <div class="events"></div>
            <div class="events"></div>
            <div class="events"></div>
            <div class="events"></div>
            <div class="events"></div>
        `
        calendar.appendChild(row)   // Ustawianie jako dziecko { calendar }
    }
}
createCalendarHours()

// TYMCZASOWE zapisane wydarzenia w dni
const plan = [
    {'date':'7-11-2022','name':'Test Event','start':'4','duration':'2.25'},
    {'date':'8-11-2022','name':'Test Event','start':'8','duration':'3'},
    {'date':'9-11-2022','name':'Test Event','start':'4','duration':'2.25'},
    {'date':'9-11-2022','name':'Test Event','start':'6.25','duration':'.5'},
    {'date':'9-11-2022','name':'Test Event','start':'7','duration':'1.5'},
    {'date':'10-11-2022','name':'Test Event','start':'8','duration':'1.5'},
    // {'date':'11.09.2022','name':'Test Event'},
]
//  1 - 1h    |   .75 - 45min     |   .5 - 30min     |   .25 - 15min

function getWeek() {
    // const date = new Date('2022-11-16T03:24:00');
    const date = new Date();    // Pobieranie aktualnej daty
    const day = date.getDate()      // Wybieranie dnia
    var first = day - date.getDay() + 1;    // Ustalanie pierwszego dnia tygodnia
    var last = first + 6        // Ustalanie ostatniego dnia tygodnia
    // DEV - Tesowe wysyładnie numeru dni i początku, końca tygodnia
    console.warn(`Actual day: ${day}`,'Actual week:',first + ' - ' + last);
    // Ustalanie atrybutów dla dni
    var FirstDisplay = first    
    var month = 11      // Zmienic na automatyczne
    var year = 2022     // Zmienic na automatyczne
    // Pętla dla wszystkich dni tygodnia
    for (let a = 1; a <= 7; a++) {
        const element = document.getElementById(`day${a}`)      // Pobieranie dnia po id
        element.setAttribute('day',`${FirstDisplay}`)   // Ustawianie atrybutu
        element.setAttribute('month',`${month}`)    // Ustawianie atrybutu
        element.setAttribute('year',`${year}`)    // Ustawianie atrybutu
        FirstDisplay += 1   // Dodawanie 1 po kazdym dniu
    }
    // if (day) {   }
}
getWeek()

function forDay() {
    // Pobieranie wszystkich elementów { .day }
    var box = document.querySelectorAll('.day')
    // Pętla
    for (let day = 0; day < box.length; day++) {
        const element = box[day]
        // Pobieranie atrybótów daty dla dni tygodnia
        var data = element.getAttribute('day')+'-'+element.getAttribute('month')+'-'+element.getAttribute('year')
        // Filtrowanue { plan }
        plan.filter(x => x.date == data).forEach((e) => {
            createEvents(e)     // Wywoładnie funkcji
        })
    }
}
forDay()

function createEvents(array) {
    // Pobieranie wszystkich elementów { .day }
    var box = document.querySelectorAll('.day')
    // Szukanie danego dnia
    for (let day = 0; day < box.length; day++) {
        const element = box[day]    // Ustalanie elementu
        // Funkcja warunkowa
        if(array.date == element.getAttribute('day')+'-'+element.getAttribute('month')+'-'+element.getAttribute('year')) {
            break
        }
    }
    // Rozdzielanie daty 
    const [ Tday, Tmonth, Tyear ] = array.date.split("-")
    var TestDay     // Zmienna
    // Funkcja warunkowa | zmiana np. { 1 } na { 01 }
    if (Tday.length == 1) {
        TestDay = new Date(`${Tyear}-${Tmonth}-0${Tday}T03:12:00`);
    } else {
        TestDay = new Date(`${Tyear}-${Tmonth}-${Tday}T03:12:00`);
    }
    // const TestDay = new Date('2022-11-T03:24:00');
    var weekDay = TestDay.getDay();     // Numer dnia tygodnia
    // Tworzenie elementu { div } / Event w kalendrzu
    const event = document.createElement('div')
    // TESTOWE - Usuwanie odstępu / Usuwanie zasłaniania lini
    if (parseInt(array.duration) / 1 === 1) {
        event.style.height = `calc(${array.duration*100+'%'} - 1px)`
    } else {
        event.style.height = `calc(${array.duration*100+'%'} - 1px)`
    }
    event.setAttribute('class','test')  // Ustawianie atrybutu
    event.setAttribute('draggable','true')  // Ustawianie atrybutu
    var start = parseInt(array.start) + 1   // Pobieranie kiedy zaczyna się event
    // Ustawianie jako dziecko
    calendar.children[start].children[weekDay].appendChild(event)
    // Obliczanie różnicy
    var difrent = array.start - Math.floor(array.start) 
    // Ustawianie odległości od kafelka godziny / dnia
    event.style.top = difrent*100+'%'
    // DEV - Randomowe ustawianie koloru
    event.style.backgroundColor = getRandomColor()
}


// DEV - Randomowy kolor
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Pokoazywanie aktualnego czasu za pomoca kreski
var rowSize = 75    // Wysokość kafelków w { px }
const timeDsiplay = document.querySelector('#time_display')    // Pobieranie elementu
function updateTimeDisplay() {
    higlihtActualDay()  // Aktalizacja aktualnego dnia
    const time = new Date()     // Ustalanie czasu
    // Ustawianie stylu { top }
    timeDsiplay.style.top = `${time.getHours()*rowSize + time.getMinutes()*(rowSize/60)}px`
}
const updateInterval = setInterval(updateTimeDisplay, 500)  // Tworzenie interwału
updateTimeDisplay()

// Przewijanie do kreski wskazującej aktualny czas
window.scroll({
    top: document.querySelector('#time_display').offsetTop,
    behavior: 'smooth'
});