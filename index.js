// index.js //
// Grade Calculator Tool By Vincent Tseng //
// https://github.com/VincentTsengCA //

const gradeTableBodyElement = document.getElementById("GradeTableBody");
const finalGradeElement = document.getElementById("FinalGrade");
const assignmentWeightNote = document.getElementById("AssignmentWeightNote");

let numberOfAssignments = 3;

function calculateGrade() {
    let gradePercentageElements = document.getElementsByClassName("GradePercentage");
    let assignmentWeightElements = document.getElementsByClassName("AssignmentWeight");

    let finalGradeValue = 0.0;
    let totalAssignmentWeight = 0.0;

    for (let i = 0; i < numberOfAssignments; i++) {
        if (gradePercentageElements[i].value == "" || assignmentWeightElements[i].value == "") {
            continue;
        }

        let gradePercentage = Number(gradePercentageElements[i].value);
        let assignmentWeight = Number(assignmentWeightElements[i].value);

        finalGradeValue += (gradePercentage / 100.0) * assignmentWeight;
        totalAssignmentWeight += assignmentWeight;
    }

    finalGradeElement.textContent = "Final Grade: " + finalGradeValue.toFixed(2) + "%";

    if (totalAssignmentWeight > 100.0) {
        assignmentWeightNote.style.display = "inherit";
    }

    else {
        assignmentWeightNote.style.display = "none";
    }
}

function addAssignment() {
    numberOfAssignments++;

    let assignmentElementToAdd = document.createElement("tr");
    assignmentElementToAdd.id = "Assignment" + numberOfAssignments.toString();

    let gradePercentageTableDataElement = document.createElement("td");
    let gradePercentageInputElement = document.createElement("input");
    gradePercentageInputElement.className = "GradePercentage";
    gradePercentageInputElement.type = "text";
    gradePercentageInputElement.placeholder = "%";
    gradePercentageInputElement.oninput = function() {calculateGrade()};
    gradePercentageTableDataElement.appendChild(gradePercentageInputElement);

    let assignmentWeightTableDataElement = document.createElement("td");
    let assignmentWeightInputElement = document.createElement("input");
    assignmentWeightInputElement.className = "AssignmentWeight";
    assignmentWeightInputElement.type = "text";
    assignmentWeightInputElement.placeholder = "%";
    assignmentWeightInputElement.oninput = function() {calculateGrade()};
    assignmentWeightTableDataElement.appendChild(assignmentWeightInputElement);

    assignmentElementToAdd.appendChild(gradePercentageTableDataElement);
    assignmentElementToAdd.appendChild(assignmentWeightTableDataElement);

    gradeTableBodyElement.appendChild(assignmentElementToAdd);
}

function removeAssignment() {
    if (numberOfAssignments <= 1) {
        return;
    }

    let assignmentElementToRemove = document.getElementById("Assignment" + numberOfAssignments.toString());
    gradeTableBodyElement.removeChild(assignmentElementToRemove);

    numberOfAssignments--;
}
