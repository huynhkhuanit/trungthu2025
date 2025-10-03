function checkDOB() {
  const dobInput = document.getElementById('dob').value;

  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!datePattern.test(dobInput)) {
    alert("Vui lòng nhập ngày sinh theo định dạng dd/mm/yyyy 😊");
    return;
  }

  const [, day, month, year] = dobInput.match(datePattern);

  const birthDate = new Date(year, month - 1, day);
  const isValidDate = birthDate.getDate() == day &&
                     birthDate.getMonth() == month - 1 &&
                     birthDate.getFullYear() == year;

  if (!isValidDate) {
    alert("Ngày sinh không hợp lệ! Vui lòng kiểm tra lại 😅");
    return;
  }

  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  const correctDateElement = document.getElementById('dob');
  const encodedDate = correctDateElement.getAttribute('data-birth');

  if (!encodedDate) {
    alert("Có lỗi xảy ra! Vui lòng thử lại.");
    return;
  }

  function decodeDate(encoded) {
    return encoded.split('/').map(part =>
      part.split('').reverse().join('')
    ).join('/');
  }

  const correctDateInput = decodeDate(encodedDate);

  const [correctDay, correctMonth, correctYear] = correctDateInput.split('/');
  const correctFormattedDate = `${correctYear}-${correctMonth.padStart(2, '0')}-${correctDay.padStart(2, '0')}`;

  if(formattedDate === correctFormattedDate) {
    window.location.href = "intro.html";
  } else {
    alert("Sai rồi nha 😜, chỉ có cậu mới vào được!");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const dobInput = document.getElementById('dob');

  // Gán sự kiện cho button
  const checkButton = document.querySelector('button');
  if (checkButton) {
    checkButton.onclick = checkDOB;
  }

  dobInput.addEventListener('input', function(e) {
    let value = e.target.value;
    value = value.replace(/[^\d/]/g, '');
    const numbersOnly = value.replace(/\//g, '');
    let formattedValue = '';

    if (numbersOnly.length >= 1) {
      if (numbersOnly.length <= 2) {
        formattedValue = numbersOnly;
      } else if (numbersOnly.length <= 4) {
        formattedValue = numbersOnly.substring(0, 2) + '/' + numbersOnly.substring(2);
      } else {
        formattedValue = numbersOnly.substring(0, 2) + '/' + numbersOnly.substring(2, 4) + '/' + numbersOnly.substring(4, 8);
      }
    }
    e.target.value = formattedValue;
  });
});