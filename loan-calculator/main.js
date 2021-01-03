const loanForm = document.querySelector('#loan-form')
const amountInput = document.querySelector('#amount')
const interestInput = document.querySelector('#interest')
const yearsToRepayInput = document.querySelector('#years-to-repay')

const monthlyPaymentInput = document.querySelector('#monthly-payment')
const totalPaymentInput = document.querySelector('#total-payment')
const totalInterestInput = document.querySelector('#total-interest')

const loaderSection = document.querySelector('#loader')
const resultsSection = document.querySelector('#results-container')

loanForm.addEventListener('submit', calculateLoan)

loanForm.addEventListener('reset', resetAll)

function resetAll() {
  monthlyPaymentInput.value = ''
  totalPaymentInput.value = ''
  totalInterestInput.value = ''
}

function startLoading() {
  resultsSection.style.display = 'none'
  loaderSection.style.display = 'flex'
}

function stopLoading() {
  loaderSection.style.display = 'none'
  resultsSection.style.display = 'block'
}

function calculateLoan(e) {
  e.preventDefault()

  const principal = parseFloat(amountInput.value)
  const calculatedInterest = parseFloat(interestInput.value) / 100 / 12
  const calculatedPayments = parseFloat(yearsToRepayInput.value) * 12

  // Calculate monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPaymentInput.value = monthly.toFixed(2)
    totalPaymentInput.value = (monthly * calculatedPayments).toFixed(2)
    totalInterestInput.value = (
      monthly * calculatedPayments -
      principal
    ).toFixed(2)
    setTimeout(stopLoading, Math.random() * 3000)
    startLoading()
  } else {
    showError('Please check you numbers')
  }
}

function showError(message) {
  const errorDiv = document.createElement('div')

  errorDiv.className = 'alert alert-danger'

  errorDiv.appendChild(document.createTextNode(message))

  loanForm.prepend(errorDiv)

  setTimeout(() => document.querySelector('.alert').remove(), 3000)
}
