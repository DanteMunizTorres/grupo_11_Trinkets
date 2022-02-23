Window.addEventListener('load',function(){
    //Capturar el formulario 
    let formulario = document.querySelector('.product__upload-form');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit',function(evento){
        if(!validaciones(evento)){
            evento.preventDefault();
        }else{
            formulario.submit();
        }    

        function validaciones(evento){
          //Destructuring  
          let {name, price, image, description  } = formulario.elements;
          let errores = [];
          //console.log(formulario.elements.confirm_password.value);
          //Validar Nombre
          if(name.value == ''){
              errores.push('El campo nombre no puede estar vacio');
              name.classList.add('is-invalid');   
              //errores['name'] = 'El campo nombre no puede estar vacio';
          }else{
              name.classList.add('is-valid');
              name.classList.remove('is-invalid');
          }

          //Validar Precio
          if(price.value == ''){
            errores.push('El producto no puede ser gratuito');
            price.classList.add('is-invalid');   
            //errores['Precio'] = 'El producto no puede ser gratuito';
            }else{
            price.classList.add('is-valid');
            price.classList.remove('is-invalid');
            }
        
            //Validar Imagen
            if(image.value == ''){
                errores.push('Debe seleccionar una imagen en formato JPG, PNG ó JPEG');
                image.classList.add('is-invalid');   
                //errores['image'] = 'Debe seleccionar una imagen en formato JPG, PNG ó JPEG';
            }else{
                image.classList.add('is-valid');
                image.classList.remove('is-invalid');
            }

            //Validar Description
            if(description.value == ''){
                errores.push('El producto debe tener una descripción');
                description.classList.add('is-invalid');   
                //errores['Precio'] = 'El producto no puede ser gratuito';
            }else{
                description.classList.add('is-valid');
                description.classList.remove('is-invalid');
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
              
          }else{
              return true;
          } 
        }
        
    })

})