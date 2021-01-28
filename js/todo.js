    showTodoList();
    // Todo functionality new
    let inputtodo = document.getElementById('inputTodo');
    let tododate = document.getElementById('todoDate');
    let createtodoBtn = document.getElementById('createTodo');
    let updateTodobtn = document.getElementById('updateTodo');


    createtodoBtn.addEventListener('click', function(){
        inputtodoVal = inputtodo.value;
        tododateVal = tododate.value;
        const list = {
            name: inputtodoVal,
            date: tododateVal,
            done: false
        }
        if(inputtodoVal.trim().length != 0 && tododateVal.length != 0){
            let storeData = localStorage.getItem('storeTodoList');
            if(storeData == null){
                todolistArr = [];
            }else{
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
    function showTodoList(){
        let storeData = localStorage.getItem('storeTodoList');
        if(storeData == null){
            todolistArr = [];
        }else{
            todolistArr = JSON.parse(storeData);
        }


        let tr = '';


        let todoTable = document.getElementById('todo');
        todolistArr.forEach((item, index) => {
            tr += `<tr id="row_${index}">
                    <td><input type="checkbox" class="status" id="check_${index}" onclick="changeStatus(${index})"/></td>
                    <td>${item.name}</td>
                    <td><label class="control-label">${item.date}</label></td>
                    <td><button class="btn btn-primary" onclick="editTodo(${index})"><i class="fa fa-edit"></i></button></td>
                    <td><button class="btn btn-danger" onclick="deleteTodo(${index})"><i class="fa fa-trash"></i></button></td>
                    </tr>`
        });
        todoTable.innerHTML = tr;
    }


    // Update Todo's
    function editTodo(index){
        let saveIndex = document.getElementById('saveIndex');
        let storeData = localStorage.getItem('storeTodoList');
        todolistArr = JSON.parse(storeData);
        inputtodo.value = todolistArr[index].name;
        tododate.value = todolistArr[index].date;
        saveIndex.value = index;
        createtodoBtn.style.display = 'none';
        updateTodobtn.style.display = 'block';
    }


    updateTodobtn.addEventListener('click', function(){
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
    function deleteTodo(index){
        let storeData = localStorage.getItem('storeTodoList');
        todolistArr = JSON.parse(storeData);
        todolistArr.splice(index, 1);
        localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
        showTodoList();
    }


    // Search todo's list
    let searchtodoList = document.getElementById('searchTodo');


    searchtodoList.addEventListener('input', function(){
        let todotrList = document.querySelectorAll('tr');
        Array.from(todotrList).forEach(function(item){
            let searchText = item.getElementsByTagName('td')[0].innerText;
            let searchTextboxval = searchtodoList.value;
            // let regSearch = new RegExp(searchTextboxval, 'gi');
            if(searchText.match(searchTextboxval)){
                item.style.display = 'table-row';
            }else{
                item.style.display = 'none';
            }
        })
    });


    function changeStatus(index){
        let storeData = localStorage.getItem('storeTodoList');
        todolistArr = JSON.parse(storeData);
        let todostatus = document.getElementById('check_'+index);
        if(todostatus.checked == true){
            todolistArr[index].done = true;
            todostatus.classList = 'completed';
        }else{
            todolistArr[index].done = false;
            todostatus.classList = 'pending';
        }
        localStorage.setItem('storeTodoList', JSON.stringify(todolistArr));
    }

    // Logout functionality redirect to the login page
    function logout(){
        window.location.replace('index.html');
    }

    $('#myprofileModal').on('shown.bs.modal', function (e) {
        var userdata = JSON.parse(localStorage.getItem("userData"));
        document.forms['myprofile']['username'].value = userdata.username;
        document.forms['myprofile']['firstname'].value = userdata.firstname;
        document.forms['myprofile']['lastname'].value = userdata.lastname;
        document.forms['myprofile']['password'].value = userdata.password;
        document.forms['myprofile']['gender'].value = userdata.gender;
        document.forms['myprofile']['address'].value = userdata.address;
    })
    function myprofile(){
        // let myprofileElement = document.getElementById('profiledetails');
        // myprofileElement.classList.remove('hide')
    }


    // Update profile
        function updateprofile(){
        var uname = document.forms['myprofile']['username'].value;
        var fname = document.forms['myprofile']['firstname'].value;
        var lname = document.forms['myprofile']['lastname'].value;
        var pass = document.forms['myprofile']['password'].value;
        var gen = document.forms['myprofile']['gender'].value;
        var addr = document.forms['myprofile']['address'].value;
        const userData = {}
        if(uname == ""){
            document.getElementById('uname').innerHTML = "Please enter a Username or Email Id";
            return false;
        }else{
            userData.username = uname;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if(fname == ""){
            document.getElementById('fname').innerHTML = "Please enter a first name";
            return false;
        }else{
            userData.firstname = fname;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if(lname == ""){
            document.getElementById('lname').innerHTML = "Please enter a last name";
            return false;
        }else{
            userData.lastname = lname;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if(pass == ""){
            document.getElementById('password').innerHTML = "Please enter a password";
            return false;
        }else{
            userData.password = pass;
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        if(gen == ""){
            document.getElementById('gender').innerHTML = "Please select your gender";
            return false;
        }else{
            userData.gender = gen;
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        // else if(/[^a-zA-Z]/.test(firstname)){
            // alert("Please enter valid name");
        // }
        if(addr == ""){
            document.getElementById('addr').innerHTML = "Please enter a address";
            return false;
        }else{
            userData.address = addr;
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }


