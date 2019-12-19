class TrainMoving {

    
    constructor() {
        console.log("hello")
        this.trainPosition = document.querySelector('#trainPosition');
        this.trainPositionTwo = document.querySelector('#trainPositiontwo');
        this.startBtn = document.querySelector('.start-train');
        this.resetBtn = document.querySelector('.reset-train');
        this.startBtnTwo = document.querySelector('.start-train-two');
        this.resetBtnTwo = document.querySelector('.reset-train-two');
        this.hideBTN = document.querySelector('.Departures');
        this.hideDIV = document.querySelector('.hidden');
        this.hideDIVTWO = document.querySelector('.bigdiv');
        this.stations = []
        this.direction = "down";
        this.station = document.querySelector(".station");
        this.stationtwo = document.querySelector(".stationtwo");
        this.fetchTrainData();
        this.startTrain();
        this.stopTrain();

        this.directiontwo = "down";
        this.startTrainTwo();
        this.stopTrainTwo();

        this.hideBTN.addEventListener("click", () => {
            this.hideDIV.classList.toggle("hidden");
            this.hideDIVTWO.classList.toggle("hidden");
        })
    }
    fetchTrainData(){
        fetch("trainDB.json")
        .then((res) => res.json())
        .then((data) => {
            this.stations = data;
        })
        console.log(this.stations);
    }
    startTrain() {
        this.startBtn.addEventListener("click", () => {
            this.trainMovement(true)
        })
    }
    stopTrain() {
       this.resetBtn.addEventListener("click", () => {
          this.trainMovement(false)
          document.getElementById("stationone").innerHTML = `Train number 1 has been stopped`;
       })
   }
    trainMovement(ride) {

        let y = this.trainPosition.offsetTop;
        let x = this.trainPosition.offsetLeft;
        if (ride) {
            this.myTime = setInterval(() => {
                this.speedAndDistance()
            }, 10);
        } else {
            clearInterval(this.myTime)
           
        }
    }
    startTrainTwo(){
        this.startBtnTwo.addEventListener("click", () => {
            this.trainMovementTrainTwo(true)
        })
    }
    stopTrainTwo(){
        this.resetBtnTwo.addEventListener("click", ()=>{
            this.trainMovementTrainTwo(false)
            document.getElementById("stationtwo").innerHTML = `Train number 2 has been stopped`;
        })
    }
    trainMovementTrainTwo(ridetwo){
    
        if (ridetwo){
            this.myTrainTwoTime = setInterval(() =>{
                this.speedAndDistanceTwo()
            }, 10);
        } else {
            clearInterval(this.myTrainTwoTime)
        }
    }
    sleep(ms){
        return new Promise (resolve => setTimeout (resolve, ms));
    }
    async speedAndDistance() {

        let distance = 1; // Change value to make the train ride a longer distance each time interval
        let y = this.trainPosition.offsetTop;
        let X = this.trainPosition.offsetLeft;
        
        console.log(`1 x: ${X} Y:${y}`);
        console.log(this.direction);

        if (y > this.stations[7].fY){
            this.direction = "up";
            console.log(`2 x: ${X} Y:${y}`);

        }
        
        if(y < this.stations[0].fY){
            this.direction = "down";
        }
        
        for (let i = 0; i < this.stations.length; i++){
            if (y == this.stations[i].fY){
                console.log(`3 x: ${X} Y:${y}`);
                this.trainMovement(false);
                document.getElementById("stationone").innerHTML = `Train number 1 stopped at: ${this.stations[i].name}`;
                document.getElementById("stationdata").innerHTML = `Ticket info: ${this.stations[i].Ticket}`;
                await this.sleep(2000);
                this.trainMovement(true);
                document.getElementById("stationone").innerHTML = `Train number 1 started moving again!`
                
            }
        }
        if(this.direction === "up"){
            console.log("hey jeg er direction up metoden");
            y = y - distance;
            this.trainPosition.style.top = y + "px";
        }
        if(this.direction === "down"){
            console.log("hey jeg er direction down metoden");
            y = y + distance;
            this.trainPosition.style.top = y + "px";
        }
    }
    async speedAndDistanceTwo(){
        let distancetwo = 1;
        let y = this.trainPositionTwo.offsetTop;
        let x = this.trainPositionTwo.offsetLeft;
        if (y > this.stations[7].fY){
            this.directiontwo = "up";
            console.log("skifter til up");
        }
        if(y < this.stations[0].fY){
            this.directiontwo = "down";
            console.log("hej nu skifter vi til ned");
        }
        for (let i = 0; i < this.stations.length; i++){
            if ( y == this.stations[i].fY){
                this.trainMovementTrainTwo(false);
                document.getElementById("stationtwo").innerHTML = `Train number 2 stopped at: ${this.stations[i].name}`;
                document.getElementById("stationdatatwo").innerHTML = `Ticket info: ${this.stations[i].Ticket}`;
                await this.sleep(2000);
                this.trainMovementTrainTwo(true);
                document.getElementById("stationtwo").innerHTML = `Train number 2 started moving again!`
                
            }
        }
        if(this.directiontwo === "up"){
            y = y - distancetwo;
            this.trainPositionTwo.style.top = y + "px";
        }
        if(this.directiontwo === "down"){
            y = y + distancetwo;
            this.trainPositionTwo.style.top = y + "px";
        }
    }
}

export default TrainMoving