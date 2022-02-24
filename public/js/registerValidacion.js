window.addEventListener('load', function () {





    //Capturar el formulario 
    let formulario = document.querySelector('.register-form');
    //Destructuring  
    let { firstName, lastName, DNI, city, email, password, terms } = formulario.elements;
    let avatarImg = document.querySelector('#avatar-img')
    let errores = [];

    let firstNameErrors = document.querySelector('#printError-firstName');
    let lastNameErrors = document.querySelector('#printError-lastName');

    // validaciones firstName
    firstName.addEventListener('blur', function(){
        if (firstName.value == '') {
            firstNameErrors.innerText = 'El campo nombre no puede estar vacio'
            errores.push('El campo nombre no puede estar vacio');
            firstName.classList.add('is-invalid');

        } else if (firstName.value.length < 2 ){
            firstNameErrors.innerText = 'El nombre debe contener al menos 2 caracteres'
            errores.push('El nombre debe contener al menos 2 caracteres');
            firstName.classList.add('is-invalid');
        } else {
            firstNameErrors.innerText = ''
            firstName.classList.add('is-valid');
            firstName.classList.remove('is-invalid');
        }
    })

    
    // validaciones lastName

    lastName.addEventListener('blur', function(){
        if (lastName.value == '') {
            lastNameErrors.innerText = 'El campo apellido no puede estar vacio'
            errores.push('El campo nombre no puede estar vacio');
            lastName.classList.add('is-invalid');

        } else if (lastName.value.length < 2 ){
            lastNameErrors.innerText = 'El apellido debe contener al menos 2 caracteres'
            errores.push('El apellido debe contener al menos 2 caracteres');
            lastName.classList.add('is-invalid');
        } else {
            lastNameErrors.innerText = ''
            lastName.classList.add('is-valid');
            lastName.classList.remove('is-invalid');
        }
    })




    // console.log('ESTO TRAE FORMULARIO-------------------');
    // console.log(formulario.elements);

    //console.log(formulario.elements.email.value);





    formulario.addEventListener('submit', function (evento) {

        evento.preventDefault();


            // //Validar Nombre
            // if (firstName.value == '') {
            //     errores.push('El campo nombre no puede estar vacio');
            //     firstName.classList.add('is-invalid');

            // } else {
            //     firstName.classList.add('is-valid');
            //     firstName.classList.remove('is-invalid');
            // }

            //Validar Apellido
            if (lastName.value == '') {
                errores.push('El campo apellido no puede estar vacio');
                lastName.classList.add('is-invalid');

            } else {
                lastName.classList.add('is-valid');
                lastName.classList.remove('is-invalid');
            }

            //Validar DNI
            if (DNI.value == '') {
                errores.push('El campo DNI no puede estar vacio');
                DNI.classList.add('is-invalid');

            } else {
                DNI.classList.add('is-valid');
                DNI.classList.remove('is-invalid');
            }

            //Validar Ciudad
            if (city.value == '') {
                errores.push('El campo ciudad no puede estar vacio');
                city.classList.add('is-invalid');

            } else {
                city.classList.add('is-valid');
                city.classList.remove('is-invalid');
            }


            //Validar email
            if (email.value == '') {
                errores.push('El campo email no puede estar vacio');
                email.classList.add('is-invalid');

            } else {
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
            }

            //Validar Password
            if (password.value == '') {
                errores.push('Tienes que ingresar una contraseña');
                password.classList.add('is-invalid');

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }

            //Validar Avatar
            if (avatarImg.value == '') {
                errores.push('Dabarías cargar una imagen de perfil');
                avatarImg.classList.add('is-invalid');

            } else {
                avatarImg.classList.add('is-valid');
                avatarImg.classList.remove('is-invalid');
            }

            //Validar Terminos y condiciones
            if (terms.value == false) {
                errores.push('Tienes que aceptar los terminos y condiciones');
                terms.classList.add('is-invalid');

            } else {
                terms.classList.add('is-valid');
                terms.classList.remove('is-invalid');
            }


            //Aquí enviamos los errores al usuario
            let ulErrores = document.getElementById('errores');
            if (errores.length > 0) {
                
                ulErrores.classList.add('alert-danger')
                // ulErrores.innerHTML = "";
                for (let i = 0; i < errores.length; i++) {
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                // errores = [];
            } else {
                // return true;
                formulario.submit();
            }


        // if (!validaciones(evento)) {
        //     evento.preventDefault();
        // } else {
        //     formulario.submit();
        // }
    })

})