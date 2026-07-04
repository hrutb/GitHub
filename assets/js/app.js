// const userNameControl=document.getElementById('userName'); 
const profileContainer=document.getElementById('profileContainer'); 
const spinner= document.getElementById('spinner');
const searchForm = document.getElementById('searchForm');



function snackbar(msg,icon){ 
       swal.fire({ 
           title:msg,
           icon:icon,
           timer:3000
       })
}

const makeApiCall = async(ApiUrl)=>{  
     const res = await fetch(ApiUrl);
     if(res.ok){ 
         return await res.json();
        }else{

            throw new Error(res);
        } 
}


async function getProfile(){
    const userName = document.getElementById('userName').value
     if(!userName){ 
           snackbar('Enter user Name', 'error');
           return;
     }


   spinner.classList.remove('d-none');

   try{ 
   
       const userUrl = `https://api.github.com/users/${userName}`;
         const User_Repo_url =`https://api.github.com/users/${userName}/repos?sorted=created`;
                      
               const [userData,repoData] =[makeApiCall(userUrl), makeApiCall(User_Repo_url)];
           
                         
              console.log(repoData);
              console.log(userData);

           
     if(!result.ok){ 
         snackbar('User not found', 'error');
     }  
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
                                                        <p>Followers: ${data.followers || 0}</p>
                                                        <p>Following: ${data.following | 0}</p>
                                                        <p>Bio: ${data.bio || '...'}</p>
                                                        <p>public_Repos: ${data.public_repos || '...'} </p>
                                                        <p>Profile: <a href="${data.html_url || '...'}">Visit github</a></p>
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
      spinner.classList.add('d-none'); 
      searchForm.reset();
   }




} 

getProfile();



// function profileTemplate(){
        
    
// }