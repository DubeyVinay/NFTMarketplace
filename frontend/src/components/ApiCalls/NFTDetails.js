import axios from "axios";

export const createNFT = async (formData) =>{

    axios({
        url:"http://localhost:5000/nftdtails",
        method:"post",
        headers:{
            "Content-Type": "application/json",
        },
        data: formData,
        
    })
    .then((res) =>res.json())
    .catch((err) =>{
        console.log(err);
    });

};

