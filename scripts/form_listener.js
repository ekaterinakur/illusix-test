const form = document.querySelector('form');
const eventName = document.querySelector('#add-name');
const eventDate = document.querySelector('#add-date');
const eventStartTime = document.querySelector('#add-start-time');
const eventEndTime = document.querySelector('#add-end-time');
const addButton = document.querySelector('#add-button');

const select = document.querySelector('#select-date');
const tablesContainer = document.querySelector('.events-tables');

const events = {};

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const nameValue = eventName.value;
    const dateValue = eventDate.value;
    const startValue = eventStartTime.value;
    const endValue = eventEndTime.value;
    const newEventStart = startValue.split(':').join('');
    const newEventEnd = endValue.split(':').join('');

    if (!nameValue || !dateValue || !startValue || !endValue) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    if (parseInt(newEventStart) > parseInt(newEventEnd)) {
        alert('Мероприятие не может быть окончено до своего начала');
        return;
    }

    if (newEventStart < 900 || newEventEnd > 1800) {
        alert('Рабочее время с 9:00 до 18:00');
        return;
    }

    if (Object.keys(events).length > 0 && events.hasOwnProperty(dateValue)) {
        const alreadyExist = events[dateValue].eventData.some(event => {
            const currentEventStart = event.start.split(':').join('');
            const currentEventEnd = event.end.split(':').join('');

            return (
                newEventStart > currentEventStart && newEventStart < currentEventEnd
                || newEventEnd > currentEventStart && newEventEnd < currentEventEnd
            );
        });

        if (alreadyExist) {
            alert('На данные дату и время запланировано другое мероприятие');
            return;
        } else {
            const newRow = createEvent(nameValue, 
                                        dateValue, 
                                        startValue, 
                                        endValue
                                        );
            const container = document.getElementById(`${dateValue}`);
            container.append(newRow);
            events[dateValue].eventData.push({
                name: nameValue,
                start: startValue,
                end: endValue,
                rowHtml: newRow
            });
        }
    } else {
        const option = document.createElement('option');
        option.value = dateValue;
        option.innerText = dateValue;
        const table = createTable(dateValue);
        events[dateValue] = {
            tableHtml: table,
            eventData: []
        };

        const firstRow = createEvent(nameValue, 
                                        dateValue, 
                                        startValue, 
                                        endValue
                                    );
        table.firstElementChild.append(firstRow);
        select.append(option);
        tablesContainer.append(table);
        
        events[dateValue].eventData.push({
            name: nameValue,
            start: startValue,
            end: endValue,
            rowHtml: firstRow
        });
    };

    form.reset();
});
