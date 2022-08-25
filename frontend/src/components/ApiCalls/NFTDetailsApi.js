import axios from "axios";

export const createNFT = async (formData) =>{

    axios({
        url:"http://localhost:5000/nftdetails",
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

export const getNFTDetails = async () =>{
    const res = await axios.get("http://localhost:5000/nftdetails");
    return res;
};



