function formatDate(dateStr) {
  const dateArr = dateStr.split(' ');
  const day = dateArr[0];
  const month = formatMonth(dateArr[1].split(',')[0]);
  const year = dateArr[2];
  return new Date(year, month, day);
}

function formatMonth(month) {
  if (month === 'January') {
    return 0;
  } else if (month === 'February') {
    return 1;
  } else if (month === 'March') {
    return 2;
  } else if (month === 'April') {
    return 3;
  } else if (month === 'May') {
    return 4;
  } else if (month === 'June') {
    return 5;
  } else if (month === 'July') {
    return 6;
  } else if (month === 'August') {
    return 7;
  } else if (month === 'September') {
    return 8;
  } else if (month === 'October') {
    return 9;
  } else if (month === 'November') {
    return 10;
  } else if (month === 'December') {
    return 11;
  }
}

export {formatDate, formatMonth};
