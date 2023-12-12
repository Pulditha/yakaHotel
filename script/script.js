// Get the Dom elements 
//hotel booking DOM elements
const FirstName = document.getElementById("firstname");
const SecondName = document.getElementById("secondname");
const Email = document.getElementById("email");
const Location = document.getElementById("location");
const SingleRoomsInput = document.getElementById("numberofsinglerooms");
const DoubleRoomsInput = document.getElementById("numberofdoublerooms");
const TrippleRoomsInput = document.getElementById("numberoftripplerooms");
const ExtraBed = document.getElementById("extraBed");
const NoOfAdultsInput = document.getElementById("numberofadults");
const NoOfChildrenInput = document.getElementById("numberofchildren");
const Arrival = document.getElementById("arrival");
const Departure = document.getElementById("depature");
const Wifi = document.getElementById("wifi");
const PoolView = document.getElementById("poolView");
const GardenView = document.getElementById("GardenViews");
const PromoCode = document.getElementById("promoCode");
const BookNow = document.getElementById("booknow");
const LoyaltyOutput = document.getElementById("LoyaltyOutput");
const CheckloyaltyPoints = document.getElementById("LoyaltyPoints");
const AddToFavourites = document.getElementById("addToFavourites");
const OK = document.getElementById("ok");
const OutputText = document.getElementById("outputtext");
const OutputText2 = document.getElementById("overallCost");
let popup = document.getElementById("popup");
let popupAdventure = document.getElementById("popupAdventure");

//adventure booking DOM elements
const AdventureType = document.getElementById("adventureType");
const DurationAdventure = document.getElementById("duration");
const LAdults = document.getElementById("lAdults");
const LChildren = document.getElementById("lChildren");
const FAdults = document.getElementById("fAdults");
const FChildren = document.getElementById("fChildren");
const NeedGuide = document.getElementById("needGuide");
const BooKNowAdventure = document.getElementById("booknowAdventure");
const OutputAdventure = document.getElementById("outputtextAdventure");

// adding event Listner
BookNow.addEventListener("click",DoHotelBooking )
CheckloyaltyPoints.addEventListener("click",LoyaltyPointsCalculation)
AddToFavourites.addEventListener("click",AddToFav)
BooKNowAdventure.addEventListener("click",DoAdventureBooking)

// creating the popup fuction
function openpopup(){
   popup.classList.add("open-popup") 
   overlay.classList.add("open-overlay");
}

function closepopup(){
    popup.classList.remove("open-popup") 
    overlay.classList.remove("open-overlay");
 }
 let overlay = document.querySelector(".overlay");

//  popup fuction for adventure
 function openpopupAdventure(){
   popupAdventure.classList.add("popupAdventure-open") 
   overlay.classList.add("open-overlay");
}

function closepopupAdventure(){
   popupAdventure.classList.remove("popupAdventure-open") 
    overlay.classList.remove("open-overlay");
 }


// defining variables for the bedrooms 
const SingleRoomPrice = 25000;
const DoubleRoomPrice = 35000;
const TrippleRoomPrice = 40000;
const ChildrenMealPrice = 5000;
let yesornobed = '' ;
let yesornoWifi = '' ;
let yesornoPool = '' ;
let yesornoGarden = '' ;
let Promotion = '';
let LoyaltyPoints = 0;
let SingleRooms, DoubleRooms, TrippleRooms;
let Finalprice = 0

let AdventureBookingPrice =0

// date function to get the deference of the chekin and checkout dates
function Datebooking(){
   //getting the arrival date and depature date
        const arrivalDate = new Date(Arrival.value);
        const departureDate = new Date(Departure.value);
        // finding the miliseconds in a day 
        const oneDay = 24 * 60 * 60 * 1000;
        //math.round - to round the result to a whole number , math abs- to give a positive integer no matter the outcome
        const stayDuration = Math.round(Math.abs((arrivalDate - departureDate) / oneDay));
        return stayDuration;
    
}

// creating the booking function
function DoHotelBooking() {

 SingleRooms = parseInt(SingleRoomsInput.value) ;
 DoubleRooms = parseInt(DoubleRoomsInput.value) ;
 TrippleRooms = parseInt(TrippleRoomsInput.value) ;
 ChildrenMeal = parseInt(NoOfChildrenInput.value) ;

    // Calculating the final price
 Finalprice = SingleRooms * SingleRoomPrice + DoubleRooms * DoubleRoomPrice + TrippleRooms * TrippleRoomPrice + ChildrenMeal*ChildrenMealPrice ;
    
    if (ExtraBed.checked){
        Finalprice+=8000
        yesornobed = "Yes";
    }else{
      yesornobed = "No";
    };

    if(Wifi.checked){
      yesornoWifi ="Yes";
    }else{
      yesornoWifi ="No";

    };

    if(PoolView.checked){
      yesornoPool ="Yes";
    }else{
      yesornoPool ="No";

    };
    
    if(GardenView.checked){
      yesornoGarden ="Yes";
    }else{
      yesornoGarden ="No";

    }

 const promoDiscount = PromoCode.value
 if(promoDiscount === "Promo123"){
    Finalprice *= 0.5
    Promotion = "20% Discount"
 }else{
   Promotion = "None"
 }
 const stayDuration = Datebooking();

 Finalprice*=stayDuration

//  The Final Output
    OutputText.innerHTML =  `${FirstName.value} ${SecondName.value} <br> Yaka Hotel ${Location.value} <br> Single Rooms X ${SingleRoomsInput.value} 
    <br> Double Rooms X ${DoubleRoomsInput.value} <br> Tripple Rooms X ${TrippleRoomsInput.value} <br> Extra bed : ${yesornobed}
     <br> Wifi : ${yesornoWifi} <br> Pool View: ${yesornoPool} <br> Garden View : ${yesornoGarden} <br> Checkin Date : ${Arrival.value}
      <br> Checkout Date:  ${Departure.value} <br>Promotion: ${Promotion} <br><br><br> Final Price : LKR ${Finalprice} /=`

      OutputText2.innerHTML =   `Overall Cost : LKR ${Finalprice}`

}

function LoyaltyPointsCalculation() {
   const AllRooms = SingleRooms+DoubleRooms+TrippleRooms

   if (AllRooms >= 3){
      LoyaltyPoints = 20*AllRooms;
   }

   LoyaltyOutput.innerHTML= `Loyalty Points : ${LoyaltyPoints}`
   localStorage.setItem("Loyalty Points",LoyaltyPoints)

}

function AddToFav() {

   const LocalStore = `${FirstName.value} ${SecondName.value}
      \t ${Location.value}
      \t Single Rooms X ${SingleRoomsInput.value} 
      \t Double Rooms X ${DoubleRoomsInput.value} 
      \t Tripple Rooms X ${TrippleRoomsInput.value} 
      \t Extra bed : ${yesornobed} 
      \t Wifi : ${yesornoWifi} 
      \t Pool View: ${yesornoPool} 
      \t Garden View : ${yesornoGarden}
      \t Checkin Date : ${Arrival.value} 
      \t Checkout Date:  ${Departure.value} 
      \t Promotion: ${Promotion} 
      \t Final Price : LKR ${Finalprice} /=`;

   localStorage.setItem("Hotel Booking Information", LocalStore);
  
}


function DoAdventureBooking(){
  let LocalAdults = parseInt(LAdults.value) ;
  let LocalKids = parseInt(LChildren.value) ;
  let ForeignAdults = parseInt(FAdults.value) ;
  let ForeignKids = parseInt(FChildren.value) ;
  let Duration = parseInt(DurationAdventure.value) ;


 if (LocalAdults>= 1){
   AdventureBookingPrice+=5000
   if(NeedGuide.checked){
      AdventureBookingPrice +=1000;
    }
 }
 if (LocalKids>= 1){
   AdventureBookingPrice+=2000
   if(NeedGuide.checked){
      AdventureBookingPrice +=500;
    }
 }
 if (ForeignAdults>= 1){
   AdventureBookingPrice+=10000
   if(NeedGuide.checked){
      AdventureBookingPrice +=1000;
    }
 }
 if (ForeignKids>= 1){
   AdventureBookingPrice+=5000
   if(NeedGuide.checked){
      AdventureBookingPrice +=500;
    }
 }

 AdventureBookingPrice*=Duration

 OutputAdventure.innerHTML = `Adventure: ${AdventureType.value}<br>Duration: ${Duration}<br><br>Price: LKR ${AdventureBookingPrice}`

 OutputText2.innerHTML =   `Overall Cost : LKR ${Finalprice + AdventureBookingPrice }/=`
}