const BACKEND_URL = "http://localhost:8080";

const addCarBtn = $("#addCarBtn")


async function makeRequest(url, method, data){
    let settings = {
        url:url,
        method:method,
        data:data
    };

    let result = await $.ajax(settings);
    return result;
}

async function getCars (){
    let array = await makeRequest(`${BACKEND_URL}/cars`,"get", {});
    localStorage.setItem("allCars", JSON.stringify(array));
    return array
    
}


async function getUsers (){
    return await makeRequest(`${BACKEND_URL}/users`,"get", {});
    
    
}

function selectUser(userId){    
    localStorage.setItem("selectedUserId", userId)

    console.log(userId)
}




async function drawUsers(){

    let usersArray = await getUsers();

    let usersBlock = $("#users");
    usersBlock.empty();
    
    for(let item of usersArray){
        usersBlock.append(
            `
                <div class="user_item" onclick="selectUser('${item._id}')">
                    <p> Full name: ${item.fullName}</p>
                </div>
            `
        )
    }
};


async function selectCar(carId){
    let allCarsArray = JSON.parse(localStorage.getItem("allCars")) || [];

    let car = allCarsArray.filter(item => item._id === carId)[0];
    console.log(car)
    localStorage.setItem("selectedCar", JSON.stringify(car));
    console.log("selected car", car)


    
    

};

addCarBtn.click(async()=>{
    await makeRequest(
        `${BACKEND_URL}/users/addCar`, 
        "post",
        {
            userId:localStorage.getItem("selectedUserId"),
            carId:JSON.parse(localStorage.getItem("selectedCar"))._id
        });
})


async function drawCars(){

    let carsArray = await getCars();

    let carsBlock = $("#cars");
    carsBlock.empty();
    
    for(let item of carsArray){
        carsBlock.append(
            `
                <div class='car_item' onclick='selectCar("${item._id}")'>                                       
                    <p> Model: ${item.model}</p>
                    <p> Color: ${item.color}</p>
                    <p> Year: ${item.year}</p>


                </div>
            `
        )
    }
};

drawUsers().then(()=>{

    drawCars().then(()=>{
        let userItems = $(".user_item");
        let carItems = $(".car_item");
        
        
       
        for( let item of userItems){
            item.addEventListener ( "click",()=>{
                for(let user of userItems){
                    user.classList.remove("selected")
                }
                item.classList.add("selected")
            })
        }

        for( let item of carItems){
            item.addEventListener ( "click",()=>{
                for(let car of carItems){
                    car.classList.remove("selected")
                }
                item.classList.add("selected")
            })
        }

    })

    
});











