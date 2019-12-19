class TrainData{

    getTrainTime(){
       
        fetch("trainDB.json")
        .then((data) =>{
            return data.json()
        })
        .then((data) => {
           console.log(data);
        })
    }  
}

export default TrainData;