let ipAdd;
let ipdata;
let postaldata;
let mapData;
/* Add "https://api.ipify.org?format=json" to 
        get the IP Address of user*/
        $(document).ready(()=>{
            $.getJSON("https://api.ipify.org?format=json",
            function (data) {
 
                // Displayin IP address on screen
                $("#ipAddress").html(data.ip);
               ipAdd=data.ip 
            })
            
        });
        
// get  the information from the api request at https://ipapi.co/${IP}/json/ , where ${IP} will be the IP of the user
       function  getInfo(){
        async function fetchipAddressData() {
            const response = await fetch(`https://ipapi.co/${ipAdd}/json/`);
            const ipInfo = await response.json();
            return ipInfo;
          }
          
          fetchipAddressData().then(ipInfo => {
           // fetched ipInfo
           ipdata=ipInfo
            console.log(ipInfo)
            getdata(ipInfo)
            
          });
        
        }
       
// get  the information from the api request at https://api.postalpincode.in/pincode/${ipInfo.postal} ,also Time and Date ,
// and show all data except postal
  function getdata(ipInfo){
    // get time and Data
    let dateTime = new Date().toLocaleString("en-US", { timeZone: `${ipInfo.timezone}` });
    console.log(dateTime);

    // append all data except postal
      let contenar=document.getElementById("contenar")
      contenar.style.display="none"
      document.body.innerHTML=`<div id="newContainer">
      <h1 id="newPageip">IP Address : <span>${ipAdd}</span></h1>
      <div id="Show">
          <div>
              <span>Lat: ${ipInfo.latitude}</span>
              <span>Long: ${ipInfo.longitude}</span>
          </div>
          <div>
              <span>City: ${ipInfo.city}</span>
              <span>Region: ${ipInfo.region}</span>
          </div>
          <div>
              <span>Organisation: ${ipInfo.org}</span>
              <span>Hostname: ${ipInfo.asn}</span>
          </div>   
      </div>
      <div id="location">
          <h1>Your Current Location</h1>
        <iframe src="https://maps.google.com/maps?q=${ipInfo.latitude}, ${ipInfo.longitude}&z=15&output=embed" width="95%" height="550" frameborder="0" style="border:0"></iframe>
      </div>
      <section id="moreInfo"><h1>More Information About You</h1>
      <h4>Time Zone: ${ipInfo.timezone}</h4>
      <h4>Date And Time: ${dateTime}</h4>
      <h4>Pincode: ${ipInfo.postal}</h4>
      <h4 id="massg">Message: <span>Number of pincode(s) found:</span> </h4>
      </section>
      <section id="postOff">
      <h1>Post Offices Near You</h1>
      <input id="Search" type="search" placeholder="Search By Name">
      </section>
      </div>`

// fetch data for postal
      async function fetchPincodeInfo() {
        const response = await fetch(`https://api.postalpincode.in/pincode/${ipInfo.postal}`);
        const pincode = await response.json();
        return pincode;
      }
      
      fetchPincodeInfo().then(pincode => {
       // fetched pincodeInfo
       postaldata=pincode
        console.log(pincode)
        showdata(pincode)   
      });
  }   

  // append postal data
  
 function showdata(pincode) {
    let newdata=pincode[0].PostOffice
    mapData=newdata
    document.getElementById("massg").innerHTML=`Message: <span> ${pincode[0].Message}</span>`
    let postdata = document.createElement("div")
    postdata.setAttribute("id","postData")
    console.log(newdata)
    newdata.map(i=>{
        postdata.innerHTML += `
        <div>
        <h4>${i.Name}</h4>
        <h4>${i.BranchType}</h4>
        <h4>${i.DeliveryStatus}</h4>
        <h4>${i.District}</h4>
        <h4>${i.Division}</h4>
        </div>
        `;
    })
    let appendpost=document.getElementById("postOff")
    appendpost.appendChild(postdata);

     // Serch by Name or BranchType
   const searchInput = document.getElementById('Search');
   searchInput.addEventListener('input', function() {
    console.log(true)
    const searchValue = searchInput.value.toLowerCase();
    let newdata1=newdata.filter(item => item.Name.toLowerCase().includes(searchValue) || item.BranchType.toLowerCase().includes(searchValue));
    console.log(newdata1)
    let postdataremove=document.getElementById("postData")
    postdataremove.remove()
    let postdata1 = document.createElement("div")
    postdata1.setAttribute("id","postData")
    newdata1.map(i=>{
        postdata1.innerHTML += `
        <div>
        <h4>${i.Name}</h4>
        <h4>${i.BranchType}</h4>
        <h4>${i.DeliveryStatus}</h4>
        <h4>${i.District}</h4>
        <h4>${i.Division}</h4>
        </div>
        `;
    })
    let appendpost1=document.getElementById("postOff")
    appendpost1.appendChild(postdata1);
  });
 }

  