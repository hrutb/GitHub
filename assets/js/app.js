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
    

    
    try{ 
        
           const userUrl = `https://api.github.com/users/${userName}`;
           const User_Repo_url =`https://api.github.com/users/${userName}/repos?per_page=5`;
         
           const promiseArr =await Promise.all([makeApiCall(userUrl), makeApiCall(User_Repo_url)]);
         
          
           console.log(promiseArr);
           spinner.classList.remove('d-none');
             
           profileCard(promiseArr);

        
   }catch(err){ 
             snackbar(err.msg, 'error')
   }
   finally{ 
      spinner.classList.add('d-none'); 
   }




} 


getProfile();









function  profileCard(arr){ 
                   
            let userData = arr[0];
            let repoData = arr[1];
               console.log(repoData);

            profileContainer.innerHTML = `<div class="col-md-6">
                                        <div class="card">
                                            <div class="card-header d-flex justify-content-between align-items-center">
                                                <h4>${userData.name || '...'}</h4>
                                                <p>${userData.login}</p>
                                            </div>
                                            <div class="card-body"> 
                                                <div class="profileCard">
                                                    <figure>
                                                        <img src="${userData.avatar_url}" alt="">
                                                    </figure>
                                                    <figcaption>
                                                        <p>Followers: ${userData.followers || 0}</p>
                                                        <p>Following: ${userData.following | 0}</p>
                                                        <p>Bio: ${userData.bio || '...'}</p>
                                                        <p>public_Repos: ${userData.public_repos || '...'} </p>
                                                        <p>Profile: <a href="${userData.html_url || '...'}">Visit github</a></p>
                                                        <p>location: ${userData.location || '...'} </p>
                                                    </figcaption>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>`

        searchForm.reset();
}








searchForm.addEventListener('submit', getProfile);

// function profileTemplate(){
        
    
// }