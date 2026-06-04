// const userNameControl=document.getElementById('userName'); 
const profileContainer=document.getElementById('profileContainer'); 
const spinner= document.getElementById('spinner');




function snackbar(msg,icon){ 
       swal.fire({ 
           title:msg,
           icon:icon,
           timer:3000
       })
}




async function getProfile(){
    const userName = document.getElementById('userName').value
     if(!userName){ 
           snackbar('Enter user Name', 'error');
     }


   spinner.classList.remove('d-none');

   try{ 
     //we fetched data by using github user profile api 
    
     //fetch():= it is method of window interface....it starts the processs of fetching a resourece from  the network 
      //fetch() method returns the promise  that is fullfilled once  response is available

       const result = await fetch(`https://api.github.com/users/${userName}`); 
              console.log(userName);
              

       //ok is read only proprty of response interface it is boolean stating whether reponse was successfull or not 
     if(!result.ok){ 
         snackbar('User not found', 'error');
     }  

     //now we have to parse row HTTP data into javascript object
          const  data = await result.json();
 
       console.log(data);
       
     
     // profileTemplate();
      profileContainer.innerHTML = `<div class="col-md-6">
                                        <div class="card">
                                            <div class="card-header d-flex justify-content-between align-items-center">
                                                <h4>${data.name || '...'}</h4>
                                                <p>${data.login}</p>
                                            </div>
                                            <div class="card-body"> 
                                                <div class="profileCard">
                                                    <figure>
                                                        <img src="${data.avatar_url}" alt="">
                                                    </figure>
                                                    <figcaption>
                                                        <p>Followers: ${data.followers || '...'}</p>
                                                        <p>Following: ${data.following || '...'}</p>
                                                        <p>Bio: ${data.bio || '...'}</p>
                                                        <p>public_Repos: ${data.public_repos || '...'} </p>
                                                        <p>Profile: <a href="${data.html_url || '...'}">GitHub profile</a></p>
                                                        <p>location: ${data.location || '...'} </p>
                                                    </figcaption>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>`

   }catch(err){ 
        snackbar(err.msg, 'error')
   }
   finally{ 
      spinner.classList.add('d-none')
   }




} 





// function profileTemplate(){
        
    
// }