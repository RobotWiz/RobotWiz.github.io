// --- global variables ---

import _ from "lodash"

var loans = [
    { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
  ]; 
  
// REGEX to verify proper year form.
const REGEX_YEAR = RegExp("\d\d\d\d")
// Each year should just be four consecutive digits.

// REGEX to verify proper ammount form.
const REGEX_AMMOUNT = RegExp("\d+\.\d\d")
// One or more digits followed by a decimal point followed by two digits.

// REGEX to verify interest form.
const REGEX_INTEREST = RegExp("\d\.\d\d\d\d")
// One digit followed by a decimal followed by four digits.

  // --- function: loadDoc() ---
  
  function loadDoc() {
    
    // pre-fill defaults for first loan year
    var defaultYear = loans[0].loan_year;
    // Prepend # to target to say getting by id.
    // Replace document.getelementbyid with $.
    // Replace for each call.
    // document.getElementById("loan_year0" + 1).value = defaultYear++;
    $("#loan_year0" + 1).value = defaultYear++;
    var defaultLoanAmount = loans[0].loan_amount;
    // document.getElementById("loan_amt0" + 1).value = defaultLoanAmount.toFixed(2);
    $("#loan_amt0" + 1).value = defaultLoanAmount.toFixed(2);
    var defaultInterestRate = loans[0].loan_int_rate;
    // document.getElementById("loan_int0" + 1).value = defaultInterestRate;
    $("#loan_int0" + 1).value = defaultInterestRate;
    var loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
    // document.getElementById("loan_bal0" + 1).innerHTML = toComma(loanWithInterest.toFixed(2));
    $("#loan_bal0" + 1).innerHTML = toComma(loanWithInterest.toFixed(2));
    
    // pre-fill defaults for other loan years
    for(var i=2; i<6; i++) {
        //   document.getElementById("loan_year0" + i).value = defaultYear++;
        //   document.getElementById("loan_year0" + i).disabled = true;
        //   document.getElementById("loan_year0" + i).style.backgroundColor = "gray";
        //   document.getElementById("loan_year0" + i).style.color = "white";
        //   document.getElementById("loan_amt0" + i).value = defaultLoanAmount.toFixed(2);
        //   document.getElementById("loan_int0" + i).value = defaultInterestRate;
        //   document.getElementById("loan_int0" + i).disabled = true;
        //   document.getElementById("loan_int0" + i).style.backgroundColor = "gray";
        //   document.getElementById("loan_int0" + i).style.color = "white";
        $("#loan_year0" + i).value = defaultYear++;
        $("#loan_year0" + i).disabled = true;
        $("#loan_year0" + i).style.backgroundColor = "gray";
        $("#loan_year0" + i).style.color = "white";
        $("#loan_amt0" + i).value = defaultLoanAmount.toFixed(2);
        $("#loan_int0" + i).value = defaultInterestRate;
        $("#loan_int0" + i).disabled = true;
        $("#loan_int0" + i).style.backgroundColor = "gray";
        $("#loan_int0" + i).style.color = "white";
        loanWithInterest = (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);
        $("#loan_bal0" + i).innerHTML = toComma(loanWithInterest.toFixed(2));
      } // end: "for" loop
    
    // all input fields: select contents on fucus
    $("input[type=text]").focus(function() {
      $(this).select();
      $(this).css("background-color", "yellow");
    }); 
    $("input[type=text]").blur(function() {
      $(this).css("background-color", "white");
    });
    
    // set focus to first year: messes up codepen
    // $("#loan_year01").focus();
    $("#loan_year01").blur( function() {
      updateLoansArray();
    });
    
  } // end: function loadDoc()
  
  
  function toComma(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function updateLoansArray() {
    loans[0].loan_year = parseInt($("#loan_year01").val());
    for(var i=1; i<5; i++) {
      loans[i].loan_year = loans[0].loan_year + i;
      $("#loan_year0"+ (i+1) ).val(loans[i].loan_year);
    }
  }

function getForm() {
    let ret = {}
    ret.startYear = $("#loan_year01").value
    ret.intRate = $("#loan_int01").value
    ret.ammounts = []
    for (i in [0, 1, 2, 3, 4]) {
        ret.ammounts[i] = $("#loan_ammount0" + (i + 1))
    }
    return ret
}

function validate(form) {
    if(!REGEX_YEAR.test(form.startYear)) return false
    if(!REGEX_INTEREST.test(form.intRate)) return false
    if(form.ammounts === form.ammounts.filter(ammount => REGEX_AMMOUNT.test(ammount))) return false
    return true
}

function calculate(form) {
    let outform = _.cloneDeep()
    outform.yearEndBalances = []
    let sumInt = outform.ammounts.slice(0, 5).reduce(a, b => a + b)
    let sumAmmount = outform.ammounts.reduce(a, b => a + b)
    write(outform)
}

function invld() {
    alert('Invalid input')
    alert('This is the best error message isn\'t is?')
}

// Re-Calculate
function processForm() {
    let form = getForm()
    let formValid = validate(form)
    ifdo(formValid, () => calculate(form), () => invld())
}
