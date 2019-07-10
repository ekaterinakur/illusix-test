let edit = false;

function createEvent(name, date, start, end) {
    const eventRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.innerText = name;
    const dateCell = document.createElement('td');
    const dateCellInput = document.createElement('input');
    dateCellInput.className = 'd-none date-cell edit-cell';
    dateCellInput.value = date;
    dateCell.append(dateCellInput);
    const startCell = document.createElement('td');
    startCell.innerText = start;
    const startCellInput = document.createElement('input');
    startCellInput.className = 'd-none time-cell edit-cell';
    startCellInput.value = start;
    startCell.append(startCellInput);
    const endCell = document.createElement('td');
    endCell.innerHTML = end;
    const endCellInput = document.createElement('input');
    endCellInput.className = 'd-none time-cell edit-cell';
    endCellInput.value = end;
    endCell.append(endCellInput);
    const editCell = document.createElement('td');
    const editCellImg = document.createElement('img');
    editCellImg.src = './images/edit.png';
    editCell.appendChild(editCellImg);
    const removeCell = document.createElement('td');
    removeCell.innerHTML = '&#10006;';

    removeCell.addEventListener('click', (event) => {
        const currentEvent = event.target.closest('tr');
        const currentTable = event.target.closest('.table-wrapper');
        
        if (events[date].eventData.length === 1) {
            currentTable.remove();
            const currentOption = document.querySelector(`option[value="${date}"]`);
            currentOption.remove();
            delete events[date];
        } else {
            currentEvent.remove();
            events[date].eventData.filter(event => {
                return event.start.split(':').join('') !== start.split(':').join('');
            })
        }
    });

    editCell.addEventListener('click', () => {
        startCell.firstChild.remove();
        endCell.firstChild.remove();
        dateCellInput.classList.remove('d-none');
        startCellInput.classList.remove('d-none');
        endCellInput.classList.remove('d-none');
        edit = true;
    });

    startCellInput.addEventListener('keydown', event => {
        if (event.code === 'Enter') editEnter();
    });

    endCellInput.addEventListener('keydown', event => {
        if (event.code === 'Enter') editEnter();
    });

    function editEnter() {
        dateCellInput.classList.add('d-none');
        startCellInput.classList.add('d-none');
        endCellInput.classList.add('d-none');
        startCell.insertAdjacentText('afterbegin', startCellInput.value);
        endCell.insertAdjacentText('afterbegin', endCellInput.value);
        edit = false;
    };

    eventRow.append(nameCell, dateCell, startCell, endCell, editCell, removeCell);

    return eventRow;
}
