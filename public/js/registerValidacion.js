Window.addEventListener('load', function () {
    //Capturar el formulario 
    let formulario = document.querySelector('.product__upload-form form-container');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit', function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
        } else {
            formulario.submit();
        }

        function validaciones(evento) {
            //Destructuring  
            let { firstName, lastName, DNI, city, email, password, avatarImg, terms } = formulario.elements;
            //A destructuring no le gustó el nombre avatar-img. Debería ser avatarImg pero no lo quise cambiar en la vista por la duda. 
            let errores = [];
            //console.log(formulario.elements.confirm_password.value);
            //Validar Nombre
            if (firsteName.value == '') {
                errores.push('El campo nombre no puede estar vacio');
                firstName.classList.add('is-invalid');

            } else {
                firstName.classList.add('is-valid');
                firstName.classList.remove('is-invalid');
            }

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
            ulErrores.classList.add('alert-danger')
            if (errores.length > 0) {
                evento.preventDefault();
                ulErrores.innerHTML = "";
                for (let i = 0; i < errores.length; i++) {
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                errores = [];
            } else {
                return true;
            }
        }

    })

})