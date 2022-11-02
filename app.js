function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  var reverse = reverseStr(str);

  return reverse === str;
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;

  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAlldateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i]) == true) {
      flag = true;
      break;
    }
  }

  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextdate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year = year + 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var cnt = 0;

  var nextDate = getNextdate(date);

  while (1) {
    cnt++;

    if (checkPalindromeForAlldateFormats(nextDate) === true) {
      break;
    } else {
      nextDate = getNextdate(nextDate);
    }
  }

  return [cnt, nextDate];
}

const output = document.querySelector("#output-box");

function clickHandler() {
  var bdayDate = dateInput.value;

  if (bdayDate !== "") {
    var listOfDate = bdayDate.split("-");
    console.log(listOfDate);

    var year = listOfDate[0];
    var month = listOfDate[1];
    var day = listOfDate[2];

    var date = {
      day: Number(day),
      month: Number(month),
      year: Number(year),
    };

    var isPalindrome = checkPalindromeForAlldateFormats(date);

    if (isPalindrome) {
      output.innerText = "Yay!! your birthday is Palindrome 🥳🥳";
    } else {
      var [cnt, nextDate] = getNextPalindromeDate(date);
      output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${cnt} days!! ☹️`;
    }
  }
}

const dateInput = document.querySelector("#bday-date");

const showBtn = document.querySelector("#show-btn");

showBtn.addEventListener("click", clickHandler);
