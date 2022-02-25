window.addEventListener('load',function(){
    //Capturar el formulario 
    let formulario = document.querySelector('.form'); 
    //en login la clase "form" esta en un dic. Lo pruebo así y si no funciona
    //tenfremos que poner una clase en el form 
    //console.log(formulario.elements.email.value);


          //Destructuring  
          let {email, password} = formulario.elements;
          let errores = [];
          //console.log(formulario.elements.confirm_password.value);

            let emailError = document.querySelector('#errors.email.msg');
            let passwordError = document.querySelector('#errors.password.msg');
          //Validar Email
          if(email.value == ''){
              errores.push('El campo email no puede estar vacio');
              email.classList.add('is-invalid');   
              //errores['name'] = 'El campo nombre no puede estar vacio';
          }else{
              email.classList.add('is-valid');
              email.classList.remove('is-invalid');
          }

          //Validar Contraseña
          if(password.value == ''){
            errores.push('El producto no puede ser gratuito');
            password.classList.add('is-invalid');   
            //errores['Precio'] = 'El producto no puede ser gratuito';
        }else{
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        }
        
        
          //Aquí enviamos los errores al usuario
          let ulErrores = document.getElementById('errores');
          ulErrores.classList.add('alert-danger')
          if(errores.length > 0){
              evento.preventDefault();
              ulErrores.innerHTML = "";
              for (let i = 0 ; i < errores.length; i++){
                ulErrores.innerHTML += `<li> ${errores[i]} </li> `
              }
              errores = [];
          }else{
              return true;
          } 
        
    
        formulario.addEventListener('submit',function(evento){
            if(!validaciones(evento)){
                evento.preventDefault();
            }else{
                formulario.submit();
            }     
    })
})