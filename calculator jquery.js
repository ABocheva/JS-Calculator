$(document).ready(function () {
    // variable declaration
    var entryValue = "0";
    var maxLength = 10;
    var maxHistoryLength = 20;
    var calculateHistory = "";
    var shownHistory = "";
    var mathFunctions = ["/", "*", "-", "+"];

    // buttons
    (function addMouseEvents() {
        // can be refactored using a function
        $("#zero").mousedown(function () { calcButtonDown("zero", true) });
        $("#zero").mouseup(function () { calcButtonDown("zero", false) });
        $("#decimal").mousedown(function () { calcButtonDown("decimal", true) });
        $("#decimal").mouseup(function () { calcButtonDown("decimal", false) });
        $("#equals").mousedown(function () { calcButtonDown("equals", true) });
        $("#equals").mouseup(function () { calcButtonDown("equals", false) });
        $("#add").mousedown(function () { calcButtonDown("add", true) });
        $("#add").mouseup(function () { calcButtonDown("add", false) });
        $("#one").mousedown(function () { calcButtonDown("one", true) });
        $("#one").mouseup(function () { calcButtonDown("one", false) });
        $("#two").mousedown(function () { calcButtonDown("two", true) });
        $("#two").mouseup(function () { calcButtonDown("two", false) });
        $("#three").mousedown(function () { calcButtonDown("three", true) });
        $("#three").mouseup(function () { calcButtonDown("three", false) });
        $("#subtract").mousedown(function () { calcButtonDown("subtract", true) });
        $("#subtract").mouseup(function () { calcButtonDown("subtract", false) });
        $("#four").mousedown(function () { calcButtonDown("four", true) });
        $("#four").mouseup(function () { calcButtonDown("four", false) });
        $("#five").mousedown(function () { calcButtonDown("five", true) });
        $("#five").mouseup(function () { calcButtonDown("five", false) });
        $("#six").mousedown(function () { calcButtonDown("six", true) });
        $("#six").mouseup(function () { calcButtonDown("six", false) });
        $("#multiply").mousedown(function () { calcButtonDown("multiply", true) });
        $("#multiply").mouseup(function () { calcButtonDown("multiply", false) });
        $("#seven").mousedown(function () { calcButtonDown("seven", true) });
        $("#seven").mouseup(function () { calcButtonDown("seven", false) });
        $("#eight").mousedown(function () { calcButtonDown("eight", true) });
        $("#eight").mouseup(function () { calcButtonDown("eight", false) });
        $("#nine").mousedown(function () { calcButtonDown("nine", true) });
        $("#nine").mouseup(function () { calcButtonDown("nine", false) });
        $("#divide").mousedown(function () { calcButtonDown("divide", true) });
        $("#divide").mouseup(function () { calcButtonDown("divide", false) });
        $("#clear").mousedown(function () { calcButtonDown("clear", true) });
        $("#clear").mouseup(function () { calcButtonDown("clear", false) });

    })();
    (function addEntryEvents() {
        $("#zero").click(function () { updateCalcEntry("0") });
        $("#decimal").click(function () { updateCalcEntry(".") });
        $("#one").click(function () { updateCalcEntry("1") });
        $("#two").click(function () { updateCalcEntry("2") });
        $("#three").click(function () { updateCalcEntry("3") });
        $("#four").click(function () { updateCalcEntry("4") });
        $("#five").click(function () { updateCalcEntry("5") });
        $("#six").click(function () { updateCalcEntry("6") });
        $("#seven").click(function () { updateCalcEntry("7") });
        $("#eight").click(function () { updateCalcEntry("8") });
        $("#nine").click(function () { updateCalcEntry("9") });
    })();
    (function addMathEvents() {
        $("#divide").click(function () { updateCalcHistory("/") });
        $("#multiply").click(function () { updateCalcHistory("*") });
        $("#subtract").click(function () { updateCalcHistory("-") });
        $("#add").click(function () { updateCalcHistory("+") });
    })();

    //clear the input and output field with a clear button. 

    $("#clear").click(function () {
        entryValue = "0";
        $("#display").html(entryValue);
    });
    $("#clear").click(function () {
        entryValue = "0";
        $("#display").html(entryValue);
        calculateHistory = "";
        $("#outputdisplay").html("NO ENTRY");
    });

    //keep chaining operations together until I hit the equal button and get the total result

    $("#equals").click(function () {
        if (entryValue.length > 0 && entryValue !== "0") {
            calculateHistory = "(" + calculateHistory + entryValue + ")";
        }
        if (calculateHistory.length > 0) {
            var lastChar = calculateHistory.slice(-1);
            if ($.inArray(lastChar, mathFunctions) > 0) {
                calculateHistory = calculateHistory.slice(0, -1);
            }
            if (calculateHistory.length > maxHistoryLength) {
                shownHistory = "..." + calculateHistory.slice(-(maxHistoryLength));
            } else {
                shownHistory = calculateHistory;
            }
            $("#outputdisplay").html(shownHistory);
            var total = eval(calculateHistory).toString();
            if (total.length > maxLength) {
                total = total.substring(0, maxLength);
            }
            $("#display").html(total);
            entryValue = "0";
        }
    });

    // update feedback
    function updateCalcEntry(val) {
        if (entryValue.length < maxLength) {
            if (entryValue == "0" && val == ".") {
                entryValue = "0.";
            } else if (entryValue == "0") {
                entryValue = val;
            } else if (val == "." && entryValue.indexOf(".") >= 0) {
                return;
            } else {
                entryValue += val;
            }
            $("#display").html(entryValue);
        }
    }

    function updateCalcHistory(val) {
        var lastChar = calculateHistory.slice(-1);
        if (entryValue.length > 0 && entryValue !== "0") {
            if ($.inArray(lastChar, mathFunctions) > -1) {
                calculateHistory = calculateHistory + entryValue + val;
            } else {
                calculateHistory = entryValue + val;
            }
            entryValue = "0";
            $("display").html(entryValue);
        } else if (calculateHistory.length > 0) {
            if ($.inArray(lastChar, mathFunctions) > -1) {
                calculateHistory = calculateHistory.slice(0, -1);
            }
            calculateHistory = calculateHistory + val;
        }
        if (calculateHistory.length > maxHistoryLength) {
            shownHistory = "..." + calculateHistory.slice(-(maxHistoryLength));
        } else {
            shownHistory = calculateHistory;
        }
        $("#outputdisplay").html(shownHistory);
    }

});


