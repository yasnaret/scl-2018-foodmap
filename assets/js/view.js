//botones de scroll para mostrar imagenes

$('#right-button').click(function () {
    event.preventDefault();
    $('#imgContainer').animate({
        scrollLeft: "+=300px"
    }, "slow");
});

$('#left-button').click(function () {
    event.preventDefault();
    $('#imgContainer').animate({
        scrollLeft: "-=300px"
    }, "slow");
});

//muestra las fotos dentro del div scroll
function getPhotos(placeId){
    //placeid:Objeto que retorna cada una de las consultas
     let photos = placeId.photos;
     if (!photos) {return}
     
     let div1=document.createElement('div');
     div1.className='card';
     div1.id=placeId.place_id
     let img=document.createElement('img');
     img.className='card-img-top';
     img.src=photos[0].getUrl({'maxWidth':200 ,'maxHeight':200});
     let div2=document.createElement('div');
     div2.className='card-body';
     let p=document.createElement('p')
     p.className='card-text'
     p.innerHTML=placeId.name
     
     imgContainer.appendChild(div1);
     div1.appendChild(img);
     div1.appendChild(div2);
     div2.appendChild(p);
 
 
     $(".card").click(function() {
     idCardSelected = $(this).attr("id");
     createModal(idCardSelected)
     });
 
 }

 