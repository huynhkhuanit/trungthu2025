async function checkDOB() {
  const dobInput = document.getElementById('dob');
  const dobValue = dobInput.value;

  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!datePattern.test(dobValue)) {
    alert("Vui lòng nhập ngày sinh theo định dạng dd/mm/yyyy 😊");
    return;
  }

  const [, day, month, year] = dobValue.match(datePattern);

  const birthDate = new Date(year, month - 1, day);
  const isValidDate = birthDate.getDate() == day &&
                     birthDate.getMonth() == month - 1 &&
                     birthDate.getFullYear() == year;

  if (!isValidDate) {
    alert("Ngày sinh không hợp lệ! Vui lòng kiểm tra lại 😅");
    return;
  }

  const correctHash = dobInput.getAttribute('data-hash');

  if (!correctHash) {
    alert("Có lỗi xảy ra! Vui lòng thử lại.");
    return;
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(dobValue);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const inputHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (inputHash === correctHash) {
      sessionStorage.setItem('verified', 'true');
      window.location.href = "intro.html";
    } else {
      alert("Sai rồi nha 😜, chỉ có cậu mới vào được!");
    }
  } catch (error) {
    console.error("Hashing error:", error);
    alert("Đã xảy ra lỗi khi xác thực. Vui lòng thử lại.");
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