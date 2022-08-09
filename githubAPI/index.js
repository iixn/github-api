function getName() {
    let username = document.getElementById("name-user").value;
    return username
}

const embed = document.getElementById("embed")
const button = document.getElementById("button-id");
const searchError = document.getElementById("error");

button.addEventListener("click", async () => {

    username = getName()
    searchError.innerHTML = ""
    embed.innerHTML = ""

    var getJSON = function(url, callback) {

        var xmlhttprequest = new XMLHttpRequest();
        xmlhttprequest.open('GET', url, true);
        xmlhttprequest.responseType = 'json';
    
        xmlhttprequest.onload = function() {
    
            var status = xmlhttprequest.status;
    
            if (status == 200) {
                callback(null, xmlhttprequest.response);
            } else {
                callback(status, xmlhttprequest.response);
            }
        };
    
        xmlhttprequest.send();
    };
    
    const searched = getJSON(`https://api.github.com/users/${username}`, function(err, data) {
        if (err) {
            searchError.innerHTML = "¡No se ha podido encontrar el usuario!"
            return
        } else {
            console.log(data)
            let bio = data.bio;

            if (bio == null) {
                bio = ""
            }

            let arr = data.created_at.split("");
            let date = "";
            
            while (arr.length > 10) {
                arr.pop();
            }

            for (let i in arr) {
                data += i;
            }

            console.log(arr)

            embed.innerHTML += `         
            <div class="container card bg-dark mb-3" style="max-width: 1300px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.avatar_url}" class="img-fluid rounded-start">    
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <p class="card-head text-light p-2">Username: ${data.login}</p>
                            <p class="card-text text-light p-2">Id: ${data.id}</p>
                            <p class="card-text text-light p-2">GitHub: <a href="${data.html_url}">${data.html_url}</a></p>
                            <p class="card-text text-light p-2">Biography: ${bio}</p>
                            <p class="card-text text-light p-2">Followers: ${data.followers}</p>
                            <p class="card-text text-light p-2">Following: ${data.following}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    })
})