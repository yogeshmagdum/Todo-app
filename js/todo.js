    showTodoList();
    // Todo functionality new
    let inputtodo = document.getElementById('inputTodo');
    let tododate = document.getElementById('todoDate');
    let createtodoBtn = document.getElementById('createTodo');
    let updateTodobtn = document.getElementById('updateTodo');

    createtodoBtn.addEventListener('click', function() {
        inputtodoVal = inputtodo.value;
        tododateVal = tododate.value;
        const list = {
            name: inputtodoVal,
            date: tododateVal,
            done: false
        }
        if (inputtodoVal.trim().length != 0 && tododateVal.length != 0) {
            let storeData = localStorage.getItem('storeTodoList');
            if (storeData == null) {
                todolistArr = [];
            } else {
                todolistArr = JSON.parse(storeData);
            }
            todolistArr.push(list);
            localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
            showTodoList();
            inputtodo.value = '';
            tododate.value = '';
        }
    });


    // ShowTodo list
    function showTodoList() {
        let storeData = localStorage.getItem('storeTodoList');
        let userData = JSON.parse(localStorage.getItem('userData'));
        document.getElementById('navbarDropdown').innerText = userData.username;
        if (storeData == null) {
            todolistArr = [];
        } else {
            todolistArr = JSON.parse(storeData);
        }


        let tr = '';


        let todoTable = document.getElementById('todo');
        todolistArr.forEach((item, index) => {
            tr += `<tr id="row_${index}" class="${item.done ? 'completed' : ''}">
                    <td><input type="checkbox" class="status" id="check_${index}" ${item.done ? 'checked' : ''} onclick="changeStatus(${index})"/></td>
                    <td>${item.name}</td>
                    <td><label class="control-label">${item.date.split('-').reverse().join('-')}</label></td>
                    <td class="text-right">
                    <button class="btn btn-default" onclick="editTodo(${index})"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-default" onclick="deleteTodo(${index})"><i class="fa fa-trash"></i></button>
                    </td>
                    </tr>`
        });
        todoTable.innerHTML = tr;
        if (todoTable.innerHTML.length > 0) {
            var deleteAllbtn = document.getElementById('deleteAll')
            deleteAllbtn.classList.remove('hide');
        }
    }


    // Update Todo's
    function editTodo(index) {
        let saveIndex = document.getElementById('saveIndex');
        let storeData = localStorage.getItem('storeTodoList');
        todolistArr = JSON.parse(storeData);
        inputtodo.value = todolistArr[index].name;
        tododate.value = todolistArr[index].date;
        saveIndex.value = index;
        createtodoBtn.style.display = 'none';
        updateTodobtn.style.display = 'block';
    }


    updateTodobtn.addEventListener('click', function() {
        let storeData = localStorage.getItem('storeTodoList');
        let saveIndex = document.getElementById('saveIndex').value;
        let todolistArr = JSON.parse(storeData);
        todolistArr[saveIndex].name = inputtodo.value;
        todolistArr[saveIndex].date = tododate.value;
        localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
        createtodoBtn.style.display = 'block';
        updateTodobtn.style.display = 'none';
        inputtodo.value = '';
        todoDate.value = '';
        showTodoList();


    });


    //Delete todo's 
    function deleteTodo(index) {
        let storeData = localStorage.getItem('storeTodoList');
        todolistArr = JSON.parse(storeData);
        todolistArr.splice(index, 1);
        localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
        document.getElementById('row_' + index).remove();
        if (todolistArr == 0) {
            var deleteAllbtn = document.getElementById('deleteAll');
            deleteAllbtn.classList += ' hide';
        }
        showTodoList();
    }


    // Search todo's list
    let searchtodoList = document.getElementById('searchTodo');
    searchtodoList.addEventListener('input', function() {
        let todotrList = document.querySelectorAll('tr');
        Array.from(todotrList).forEach(function(item) {
            let searchText = item.getElementsByTagName('td')[1].innerText;
            let searchTextboxval = searchtodoList.value;
            // let regSearch = new RegExp(searchTextboxval, 'gi');
            if (searchText.match(searchTextboxval)) {
                item.style.display = 'table-row';
            } else {
                item.style.display = 'none';
            }
        })
    });

    // change status with checkbox selection
    function changeStatus(index) {
        let storeData = localStorage.getItem('storeTodoList');
        todolistArr = JSON.parse(storeData);
        let todostatus = document.getElementById('check_' + index);
        if (todostatus.checked == true) {
            todolistArr[index].done = true;
            document.getElementById('row_' + index).classList = 'completed';
        } else {
            todolistArr[index].done = false;
            document.getElementById('row_' + index).classList.remove('completed');
        }
        localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
    }

    // Logout button click redirect to the login page
    function logout() {
        window.location.replace('index.html');
    }

    // myprofile user data shown in modal popup
    $('#myprofileModal').on('shown.bs.modal', function(e) {
        var userdata = JSON.parse(localStorage.getItem("userData"));
        document.forms['myprofile']['username'].value = userdata.username;
        document.forms['myprofile']['firstname'].value = userdata.firstname;
        document.forms['myprofile']['lastname'].value = userdata.lastname;
        document.forms['myprofile']['password'].value = userdata.password;
        document.forms['myprofile']['gender'].value = userdata.gender;
        document.forms['myprofile']['address'].value = userdata.address;
    })

    // Update profile
    function updateprofile() {
        var uname = document.forms['myprofile']['username'].value;
        var fname = document.forms['myprofile']['firstname'].value;
        var lname = document.forms['myprofile']['lastname'].value;
        var pass = document.forms['myprofile']['password'].value;
        var gen = document.forms['myprofile']['gender'].value;
        var addr = document.forms['myprofile']['address'].value;
        const userData = {}
        if (uname == "") {
            document.getElementById('uname').innerHTML = "Please enter a Username or Email Id";
            return false;
        } else {
            userData.username = uname;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if (fname == "") {
            document.getElementById('fname').innerHTML = "Please enter a first name";
            return false;
        } else {
            userData.firstname = fname;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if (lname == "") {
            document.getElementById('lname').innerHTML = "Please enter a last name";
            return false;
        } else {
            userData.lastname = lname;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if (pass == "") {
            document.getElementById('password').innerHTML = "Please enter a password";
            return false;
        } else {
            userData.password = pass;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if (gen == "") {
            document.getElementById('gender').innerHTML = "Please select your gender";
            return false;
        } else {
            userData.gender = gen;
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        // else if(/[^a-zA-Z]/.test(firstname)){
        // alert("Please enter valid name");
        // }
        if (addr == "") {
            document.getElementById('addr').innerHTML = "Please enter a address";
            return false;
        } else {
            userData.address = addr;
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }

    // Delete selected todo's
    function deleteTodos() {
        document.getElementById("todo").innerHTML = "";
        let storeData = localStorage.getItem('storeTodoList');
        // deleteallTodos.remove();
        localStorage.removeItem('storeTodoList');
        var deleteAllbtn = document.getElementById('deleteAll')
        deleteAllbtn.classList += ' hide';
    }

    // Filter todo list
    function filterTodos() {
        let filterVal = document.getElementById('todoFilter').value;
        let storeData = localStorage.getItem('storeTodoList');
        todolistArr = JSON.parse(storeData);

        switch (filterVal) {
            case 'Ascending':
                todolistArr.sort((a, b) => (a.name > b.name ? 1 : -1));
                localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
                showTodoList();
                break;

            case 'Descending':
                todolistArr.sort((a, b) => (a.name < b.name ? 1 : -1));
                localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
                showTodoList();
                break;

            case 'Done':
                var todotrList = document.querySelectorAll('tr');
                Array.from(todotrList).forEach(function(item, index) {
                    let completedTodo = item.classList.contains('completed');
                    if (completedTodo) {
                        item.style.display = 'table-row';
                    } else {
                        item.style.display = 'none';
                    }
                })
                break;

            case 'Date':
                todolistArr.sort((a, b) => new Date(b.date) - new Date(a.date));
                localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
                showTodoList();
                break;

            case 'Pending':
                var todotrList = document.querySelectorAll('tr');
                var currentdate = new Date();
                Array.from(todotrList).forEach(function(item, index) {
                    let todoDate = item.getElementsByTagName('td')[2].innerText;
                    let tdate = todoDate.split('-').reverse().join('-')
                    mydate = new Date(tdate);
                    if (currentdate > mydate) {
                        item.style.display = 'table-row';
                    } else {
                        item.style.display = 'none';
                    }
                })

                break;

        }
    }