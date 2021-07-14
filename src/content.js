'use strict'
/**
*  Portal RH Hours extension.
*/


let minutesNegativeBalance = 0
let minutesPositiveBalance = 0

function sumMinutes (row, i) {
  if (i === 1) return

  let now = new Date()
  now.setHours(0,0,0,0)

  let dateText = row.cells[0]

  let dateContent = dateText.textContent.split("/")

  let currentDate = new Date(dateContent[1] + "/" + dateContent[0] + "/" + now.getFullYear())

  if (currentDate < now) return

  let negativeBalance = row.cells[5].textContent

  if (negativeBalance !== '') {
    minutesNegativeBalance += +negativeBalance.split(':')[0] * 60 + +negativeBalance.split(':')[1]
    row.cells[5].textContent = ''
  }
}

function changeBalance (table) {
  Array.from(table.rows).forEach(sumMinutes)

  let balance = document.querySelectorAll("span.lbl-content-2 ")[1].textContent

  let sinal = 1

  if (balance.charAt('0') == '-'){
    sinal = -1
  }

  let sum = minutesNegativeBalance + +balance.split(':')[0] * 60 + sinal * +balance.split(':')[1]

  let minutes = sum % 60

  let hours = (sum - minutes) / 60

  if (minutes < 0){minutes
    minutes *= -1
  }

  document.querySelectorAll("span.lbl-content-2 ")[1].textContent = hours + ":" + (minutes < 10 ? "0" + minutes : minutes)
}

const waitUntilElementExists = (selector, callback) => {
  const el = document.getElementById(selector);

  if (el){
      return callback(el);
  }

  setTimeout(() => waitUntilElementExists(selector, callback), 500);
}

waitUntilElementExists('tabelaDiasDoEspelho', (table) => changeBalance(table));

