let calculationStart = document.getElementById('start'),
	budgetValue = document.getElementsByClassName('budget-value')['0'],
	daybudget = document.getElementsByClassName('daybudget-value')['0'],
	levelValue = document.getElementsByClassName('level-value')['0'],
	expensesValue = document.getElementsByClassName('expenses-value')['0'],
	optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')['0'],
	incomeValue = document.getElementsByClassName('income-value')['0'],
	monthsavingsValue = document.getElementsByClassName('monthsavings-value')['0'],
	yearsavingsValue = document.getElementsByClassName('yearsavings-value')['0'],
	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesItemBtn = document.getElementsByTagName('button')['0'],
	optionalexpensesBtn = document.getElementsByTagName('button')['1'],
	countBudgetBtn = document.getElementsByTagName('button')['2'],
	optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	chooseIncome = document.querySelector('.choose-income'),
	savings = document.querySelector('#savings'),
	sumValue = document.querySelector('#sum'),
	percentValue = document.querySelector('#percent'),
	year = document.querySelector('.year-value'),
	month = document.querySelector('.month-value'),
	day = document.querySelector('.day-value');

expensesItemBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

let money, time;

calculationStart.addEventListener('click', function () {
	time = prompt("Введите дату в формате YYYY-MM-DD", '');
	money = +prompt("Ваш бюджет на месяц?", '');

	while (isNaN(money) || money == '' || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	year.value = new Date(Date.parse(time)).getFullYear();
	month.value = new Date(Date.parse(time)).getMonth() + 1;
	day.value = new Date(Date.parse(time)).getDate();

});

expensesItemBtn.addEventListener('click', function () {
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
			b = expensesItem[++i].value;

		if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
			appData.expenses[a] = b;
			sum += +b;
		} else {
			i = i - 1;
		}
	}
	expensesValue.textContent = sum;
});



optionalexpensesBtn.addEventListener('click', function () {
	for (let i = 0; i < optionalexpensesItem.length; i++) {
		let a = optionalexpensesItem[i].value;

		if ((typeof (a)) === 'string' && (typeof (a)) != null && a != '' && a.length < 50) {
			console.log("Done");
			appData.optionalExpenses[i] = a;
			optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
		}
	}
});

countBudgetBtn.addEventListener('click', function () {

	if (appData.budget) {
		appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
		daybudget.textContent = appData.moneyPerDay;
		if (appData.moneyPerDay < 100) {
			levelValue.textContent = 'Минимальный достаток';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'Средний достаток';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'Высокий достаток';
		} else {
			levelValue.textContent = 'Произошла ошибка';
		}
	} else {
		daybudget.textContent = 'Для расчета параметра нужно ввести доход!';
		levelValue.textContent = 'Для расчета параметра нужно ввести доход!';
	}
});

chooseIncome.addEventListener('input', function () {
	let items = chooseIncome.value;
	if ((typeof (items)) === 'string' && items != '' && (typeof (items) != null)) {
		appData.income = items.split(', ');
		incomeValue.textContent = items;
	} else {
		incomeValue.textContent = "Error";
	}
});

savings.addEventListener('click', function () {
	if (appData.savings) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sumValue.addEventListener('input', function () {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
	}
});

percentValue.addEventListener('input', function () {
	if (appData.savings) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
	}
});

var appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false
}