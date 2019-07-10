function createTable(date) {
    const tableWrapper = document.createElement('div');
    tableWrapper.className = "table-wrapper";
    tableWrapper.id = date;
    const dateTable = document.createElement('table');
    dateTable.id = date.split('.').join('');
    const tableHeaderTh = document.createElement('tr');
    const tableHeaderTd = document.createElement('td');
    tableHeaderTd.colSpan = '6';
    tableHeaderTd.innerText = date;
    tableHeaderTh.append(tableHeaderTd);
    dateTable.append(tableHeaderTh);
    tableWrapper.append(dateTable);

    return tableWrapper;
}
