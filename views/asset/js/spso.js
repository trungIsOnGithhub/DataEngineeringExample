const subInfo = document.querySelector(".user_info--hidden");
const userInfo = document.querySelector(".user_info");
const content = document.querySelector(".content");
const baseURI = "http://localhost:3000";

function showSubInfo() {
  subInfo.classList.add("show");
}

function hideSubInfo() {
  subInfo.classList.remove("show");
}

userInfo.addEventListener("click", showSubInfo);
content.addEventListener("click", hideSubInfo);
// ------------------------------------------------

function loadData() {
    fetch(`${baseURI}/printer`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(function(json) {
      // Get the table
      var table = document.getElementById("myTable");
      console.log(JSON.stringify(json));
        for (let data of json.printers  ) {
          // Insert a new row at the end of the table
          var data1 = data.stt;
          var data2 = data.mmi;
          var data3 = data.ddmi;
          var data4 = data.ttmi;
          var data5 = data.lmi;

          var newRow = table.insertRow(-1);

          // Insert cells into the new row
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          var cell4 = newRow.insertCell(3);
          var cell5 = newRow.insertCell(4);
          var cell6 = newRow.insertCell(5); // Checkbox cell

          // Populate the cells with the entered data
          cell1.innerHTML = data1;
          cell2.innerHTML = data2;
          cell3.innerHTML = data3;
          cell4.innerHTML = data4;
          cell5.innerHTML = data5;

          // Create a checkbox element
          var checkbox = document.createElement("input");
          checkbox.className = "checkboxBtn";
          checkbox.type = "checkbox";

          // Append the checkbox to the cell
          cell6.appendChild(checkbox);

          // Create edit and delete buttons
          var editButton = document.createElement("button");
          editButton.className = "editBtn";
          editButton.innerHTML = "Edit";
          editButton.onclick = function () {
            editRow(newRow);
          };

          var deleteButton = document.createElement("button");
          deleteButton.className = "deleteBtn";
          deleteButton.innerHTML = "Delete";
          deleteButton.onclick = function () {
            deleteRow(newRow);
          };

          // Insert buttons into the new row
          var cell7 = newRow.insertCell(6);
          var cell8 = newRow.insertCell(7);
          cell7.appendChild(editButton);
          cell8.appendChild(deleteButton);
        }
    })
    .catch(function(error) {
      console.log(error);
      alert("Có Lỗi Xảy Ra!");
    });
}

window.onload = loadData;

function openPopup() {
    // Show the overlay and popup
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
  }

  var selectedFile = null;
  var isFileSelected = false;

  function submitForm() {
    var data1 = document.getElementById("data1").value;
    var data2 = document.getElementById("data2").value;
    var data3 = document.getElementById("data3").value;
    var data4 = document.getElementById("data4").value;
    var data5 = document.getElementById("data5").value;

    if (data1 && data2 && data3 && data4 && data5) {
      // Example: Display the entered data in the console
      // console.log("Data 1:", data1);
      // console.log("Data 2:", data2);
      // console.log("Data 3:", data3);
      // console.log("Data 4:", data4);
      // console.log("Data 5:", data5);
      const printerdata = {
        stt: data1,
        mmi: data2,
        ddmi: data3,
        ttmi: data4,
        lmi: data5
      };

      fetch(`${baseURI}/printer`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(printerdata)
      }).then(function(resp) {
        // Get the table
        var table = document.getElementById("myTable");

        // Insert a new row at the end of the table
        var newRow = table.insertRow(-1);

        // Insert cells into the new row
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5); // Checkbox cell

        // Populate the cells with the entered data
        cell1.innerHTML = data1;
        cell2.innerHTML = data2;
        cell3.innerHTML = data3;
        cell4.innerHTML = data4;
        cell5.innerHTML = data5;

        // Create a checkbox element
        var checkbox = document.createElement("input");
        checkbox.className = "checkboxBtn";
        checkbox.type = "checkbox";

        // Append the checkbox to the cell
        cell6.appendChild(checkbox);

        // Create edit and delete buttons
        var editButton = document.createElement("button");
        editButton.className = "editBtn";
        editButton.innerHTML = "Edit";
        editButton.onclick = function () {
          editRow(newRow);
        };

        var deleteButton = document.createElement("button");
        deleteButton.className = "deleteBtn";
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () {
          deleteRow(newRow);
        };

        // Insert buttons into the new row
        var cell7 = newRow.insertCell(6);
        var cell8 = newRow.insertCell(7);
        cell7.appendChild(editButton);
        cell8.appendChild(deleteButton);

        // Close the popup
        closePopup();
      })
      .catch(function(error) {
        console.log(error);
        alert("Có Lỗi Xảy Ra!");
      });
    } else {
      alert("Hãy Điền Hết Tất Cả Các Trường!");
    }
  }

  function closePopup() {
    // Hide the overlay and popup
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";

    // Clear form fields for the next use
    document.getElementById("addForm").reset();
  }
  
  function editRow(row) {
    // Check if the checkbox is checked before allowing editing
    var checkbox = row.cells[5].querySelector("input[type=checkbox]");

    if (checkbox.checked) {
      var cells = row.cells;

      // Loop through each cell, except the first one (checkbox cell)
      for (var i = 0; i < cells.length - 2; i++) {
        var cell = cells[i];
        var currentData = cell.innerText;

        // Replace the content with an input field
        var input = document.createElement("input");
        input.type = "text";
        input.value = currentData;

        // Append the input field to the cell
        cell.innerHTML = "";
        cell.appendChild(input);
      }

      // Change the "Edit" button to "Save"
      var saveButton = document.createElement("button");
      saveButton.className = "saveBtn";
      saveButton.innerHTML = "Save";
      saveButton.onclick = function () {
        saveRow(row);
      };
      cells[cells.length - 2].innerHTML = "";
      cells[cells.length - 2].appendChild(saveButton);
    } else {
      // Checkbox not checked, do not allow editing
      alert("Please check the checkbox to enable editing.");
    }
  }

  function saveRow(row) {
    var cells = row.cells;
    
    // Get the current state of the checkbox
    var checkboxState = cells[5].querySelector("input[type=checkbox]") ? cells[5].querySelector("input[type=checkbox]").checked : false;
    
    // Loop through each cell, except the last two (Edit and Delete cells)
    for (var i = 0; i < cells.length - 2; i++) {
        var cell = cells[i];
        var input = cell.querySelector("input");
    
        if (input) {
            // If an input field exists, switch to view mode
            var newData = input.value;
            cell.innerHTML = newData;
        }
    }
    
    // Thêm ô checkbox vào cuối hàng (nếu chưa tồn tại)
    var checkboxCell = cells[5];
    var existingCheckbox = checkboxCell.querySelector("input[type=checkbox]");
    
    if (!existingCheckbox) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = checkboxState;
        checkboxCell.appendChild(checkbox);
    }

    var data1 = document.getElementById("data1").value;
    var data2 = document.getElementById("data2").value;
    var data3 = document.getElementById("data3").value;
    var data4 = document.getElementById("data4").value;
    var data5 = document.getElementById("data5").value;

    if (data1 && data2 && data3 && data4 && data5) {
      // Example: Display the entered data in the console
      const printerdata = {
        stt: data1,
        mmi: data2,
        ddmi: data3,
        ttmi: data4,
        lmi: data5
      };

      fetch(`${baseURI}/printer/${data1}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(printerdata)
      })
      .then(resp => window.alert("Thành Công"))
      .then(err => {
        console.log(err);
        window.alert("Đã Có Lỗi Xảy Ra")
      });
    }
    
    // Change the "Save" button back to "Edit"
    var editButton = document.createElement("button");
    editButton.className = "editBtn2";
    editButton.innerHTML = "Edit";
    editButton.onclick = function() {
        editRow(row);
    };
    cells[cells.length - 2].innerHTML = "";
    cells[cells.length - 2].appendChild(editButton);
}
    
function deleteRow(row) {
    var checkbox = row.cells[5].querySelector("input[type=checkbox]");
    
    if (checkbox && checkbox.checked) {
        // Delete the row

        var data1 = document.getElementById("data1").value;

        if (data1) {
          // Example: Display the entered data in the console

          fetch(`${baseURI}/printer/${data1}`, {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          })
          .then(resp => window.alert("Thành Công"))
          .then(err => {
            console.log(err);
            window.alert("Đã Có Lỗi Xảy Ra")
          });
        }

        row.parentNode.removeChild(row);
    } else {
        alert("Please click the checkbox to enable deletion.");
    }
}
    
    
    function searchTable() {
        // Get the search input, table, and table rows
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
    
        // Track if any matching rows are found
        var matchFound = false;
    
        // Loop through table rows starting from index 1 to exclude the header row
        for (i = 1; i < tr.length; i++) {
            var cells = tr[i].cells;
    
            // Loop through each cell
            var match = false;
            for (var j = 0; j < cells.length; j++) {
                td = cells[j];
                if (td) {
                    txtValue = td.textContent || td.innerText;
    
                    // Check if the text content contains the search filter
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        match = true;
                        matchFound = true;
                        break;
                    }
                }
            }
    
            // Toggle the visibility of the row based on the search result
            tr[i].style.display = match || i === tr.length - 1 ? "" : "none";
        }
    
        // Show the entire table (including the header) when searching
        table.style.display = "";
    
        // Provide feedback about the search
        var searchFeedback = document.getElementById("searchFeedback");
    
        if (filter.trim() === "") {
            // No search criteria, reset feedback
            searchFeedback.innerHTML = "";
            searchFeedback.classList.remove("success", "error");
        } else if (matchFound) {
            // Rows matching the search criteria found
            searchFeedback.innerHTML = "Search successful!";
            searchFeedback.classList.remove("error");
            searchFeedback.classList.add("success");
        } else {
            // No matching rows found (excluding the header)
            searchFeedback.innerHTML = "No matching rows found.";
            searchFeedback.classList.remove("success");
            searchFeedback.classList.add("error");
        }
    }