"use strict"

const bal_amount = document.getElementById("bln_amount");
console.log(bal_amount);

const income_amount = document.getElementById("income_amount");
console.log(income_amount);

const expense_amount = document.getElementById("expense_amount");
console.log(expense_amount);

const history = document.getElementById("history");
console.log(history);

const forms = document.getElementById("amount_form");
console.log(forms);

const text = document.getElementById("txt");
console.log(text);

const amount =document.getElementById("amt");
console.log(amount);


const localStorageTransacions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransacions : [];


function addTrans(event)
{
    event.preventDefault();
    if(text.value === "" || amount.value === "")
    {
        alert("Please enter a value");
    }
    else
    {
        const transaction = {
            id : noID(),
            text : text.value,
            amount : +amount.value
        };
        transactions.push(transaction);
        addingHistory(transaction);
        balanceValues();
        updateBlance();
        text.value = "";
        amount.value = "";
    }
}

function noID()
{
    return Math.floor(Math.random() * 10000000)
}

function addingHistory(transaction)
{
    const sign = transaction.amt < 0 ? '-' : '+';
    const his_ul = document.createElement("ul");
    his_ul.setAttribute("id","his_ul")
    const his_li = document.createElement("li");
    his_li.setAttribute("id","his_li");

    // add a classlist in css
    his_li.classList.add(transaction.amount < 0 ? "sub" : "add") 
    his_li.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <i class="fa-solid fa-x" id = "cross_btn" onclick = "dlt_trans(${transaction.id})"></i>`;

    his_ul.append(his_li);
    history.append(his_ul);
}

function balanceValues()
{
    const amounts = transactions.map(transaction => transaction.amount);
    const balance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const inc = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const exp = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    bal_amount.innerText = `$${balance}`;
    income_amount.innerText = `$${inc}`;
    expense_amount.innerText = `$${exp}`;
}

function dlt_trans(id)
{
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateBlance();
    init();
}

function updateBlance()
{
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init()
{
    history.innerHTML = '';
    transactions.forEach(addingHistory);
    balanceValues();
}
init();

forms.addEventListener("submit",addTrans);


































































































































// let trans;

// const storedData = localStorage.getItem(trans);

// if(storedData !== null)
// {
//     try
//     {
//         trans = JSON.parse(storedData);
//     }
//     catch(error)
//     {
//         console.error("Error parising a value",error);
//         trans = [];
//     }
// }
// else
// {
//     trans = [];
// }


// let amount_form = document.forms.amount_form;
// // console.log(amount_form);

// let form_text = amount_form.elements.txt;
// let form_ammount = amount_form.elements.amt;

// amount_form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     var txt = form_text.value;
//     var amt = form_ammount.value;

//     var income = document.querySelector("#income_amount");

//     var expense = document.querySelector("#expense_amount");

//     var bln_amount = document.querySelector("#bln_amount");

//     var history = document.querySelector("#history");

//     // console.log(txt);
//     // console.log(amt);
//     if(txt === "" || amt === "")
//     {
//         alert("Please enter a value");
//     }
//     else
//     {
//         if(amt > 0)
//         {
//             income.innerHTML = `&#x20B9;` + amt;
//             bln_amount.innerHTML = `&#x20B9;` + amt;
//             // if(income === Number)
//             // {
//             //     income.innerHTML = income + amt;
//             // }
//             console.log(income);
//             // history.innerHTML = txt + "+" + amt;

//             let child_history_div = document.createElement("div");
//             child_history_div.setAttribute("id", "child_div");

//             let child_history_para = document.createElement("p");
//             child_history_para.setAttribute("id","child_para");
//             child_history_para.innerText = txt + amt;
//             txt = "";
//             amt = "";

//             child_history_div.append(child_history_para);
//             history.append(child_history_div);
//         }
//         else if(amt < 0)
//         {
//             expense.innerHTML = `&#x20B9;` + amt;
//             var ex = expense.innerHTML;
//             var sub = ex-income;

//             // let sub_balance = amt - income;
//             bln_amount.innerHTML = `&#x20B9;` + sub;
//             // history.innerHTML = txt + amt;

//             let child_history_div = document.createElement("div");
//             child_history_div.setAttribute("id", "child_div");

//             let child_history_para = document.createElement("p");
//             child_history_para.setAttribute("id","child_para");
//             child_history_para.innerText = txt + amt;
//             txt = "";
//             amt = "";

//             child_history_div.append(child_history_para);
//             history.append(child_history_div);
//         }
//     }

// });
