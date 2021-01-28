    (function(){
        var userdata = localStorage.getItem("userData");
        if(userdata == null){
            document.forms['login'].classList = 'hide';
            document.forms['register'].classList.remove('hide');
        }
    })()
    $('form.login').on('submit', function(event){
        event.preventDefault();
        var username = document.forms['login']['username'].value;
        var password = document.forms['login']['password'].value;
        var userdata = JSON.parse(localStorage.getItem("userData"));

        // localStorage.setItem("username", username);
        // localStorage.setItem("password", password);

        if(username == ""){
            document.getElementById('logname').innerHTML = "Please enter a Username or Email Id";
            return false;
        }else{
            if(userdata.username != username){
                document.getElementById('logname').innerHTML = "Please enter a correct Username or Email Id";
                return false;
            }
        }
        if(password == ""){
            document.getElementById('pass').innerHTML = "Please enter a password";
            return false;
        }else{
            if(userdata.password != password){
                document.getElementById('pass').innerHTML = "Please enter a correct password";
                return false;
            }  
        }

        if(userdata.username == username && userdata.password == password ){
            window.location.replace('dashboard.html');
        }

    });

    function login(){
        var username = document.forms['login']['username'].value;
        var password = document.forms['login']['password'].value;
        console.log(username);
        if(username == ""){
            document.getElementById('uname').innerHTML = "Please enter a Username or Email Id";
            return false;
        }else{
            // localStorage.setItem("username", username);
        }

        if(password == ""){
            document.getElementById('pass').innerHTML = "Please enter a Username or Email Id";
            return false;
        }else{
            // localStorage.setItem("password", password);    
        }
    }

    

    function registration(){
        var uname = document.forms['register']['username'].value;
        var fname = document.forms['register']['firstname'].value;
        var lname = document.forms['register']['lastname'].value;
        var pass = document.forms['register']['password'].value;
        var gen = document.forms['register']['gender'].value;
        var addr = document.forms['register']['address'].value;
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

        // userData.username = uname;
        // userData.firstname = fname;
        // userData.lastname = lname;
        // userData.gender = gen;
        // userData.address = addr;
        document.forms['register'].classList = 'hide';
        document.forms['login'].classList.remove('hide');
        // localStorage.setItem('userData', userData);
    }


    // Todo list functionality
    // const inputtodo = document.getElementById('inputTodo');
    // const createtodoBtn = document.getElementById('createTodo');
    // const todo = document.getElementById('todo');
    
    // createtodoBtn.addEventListener('click', addTodoList);

    // function addTodoList(){
    //     const createLi = document.createElement('li');
    //     const checkBtn = document.createElement('button');
    //     const delBtn = document.createElement('button');

        // checkBtn.innerHTML = '<i class="fa fa-check"></i>';
        // delBtn.innerHTML = '<i class="fa fa-trash"></i>';

        // if(inputtodo != ''){
        //     createLi.textContent = inputtodo.value;
        //     inputtodo.value = '';

        //     var li = todo.appendChild(createLi);
        //     li.appendChild(checkBtn);
        //     li.appendChild(delBtn);
        // }

        // checkBtn.addEventListener('click', function(){
        //     const parent = this.parentNode;
        //     parent.classList('completed')
        // })

    //     delBtn.addEventListener('click', function(){
    //         const parent = this.parentNode;
    //         parent.remove();
    //     })
    // }


