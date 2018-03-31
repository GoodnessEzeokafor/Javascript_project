// Listen for Api
document.querySelector('#zipForm').addEventListener('submit',getLocationInfo,false);
// Listen for delete
document.querySelector('body').addEventListener('click', deleteFunction, false);

// Main Program
function getLocationInfo(e) {

    // Get zip value from input
    const zip = document.querySelector('.zip').value;
    // Make request 
    fetch(`http://api.zippopotam.us/us/${zip}`)
       .then(response => {
        if (response.status != 200) {
            showIcon('remove')
            document.querySelector('#output').innerHTML = `
                <article class = 'message  is-danger'>
                <div class = 'message-body'>   
                    Invalid Zipcode, please try again
                </div>
                </article>
            `;
            throw Error(response.statusText);

        } else {
            showIcon('check');
            return response.json();
        }
    })
       .then(data => {
           // show response
           let output = '';
           data.places.forEach(place => {
               output +=  `
                <article class = 'message is-link'>
                    <div class = 'message-header'>
                        <p>Location Inofo</p>
                        <button class = 'delete'></button>
                    </div>
                    <div class = 'message-body'>
                        <ul>
                          <li>><strong>City: </strong> ${place['place name']}</li>
                          <li>><strong>SA: </strong> ${place['state abbreiation']}</li>
                          <li>><strong>Longitude: </strong> ${place['longitude']}</li>
                          <li>><strong>Latitude: </strong> ${place['latitude']}</li>
                        
                        </ul>
                    </div>
                    
                </article>
               `;
           });
           // insert into output div
           document.querySelector('#output').innerHTML = output;
       })
       .catch(err => console.log(err));
    e.preventDefault();
    
}  
    function showIcon(icon) {
        // Clear icon
        document.querySelector('.icon-remove').style.display = 'none';
        document.querySelector('.icon-check').style.display = 'none';
        document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
    
}
function deleteFunction(e){
    if(e.target.className === 'delete') {
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = '';
        document.querySelector('.icon-check').remove(); 
        e.preventDefault();
    }
}