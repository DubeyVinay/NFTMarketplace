import axios from "axios";

export const createMarketplaceNFT = async (formData) =>
{
    axios({
        url: "http://localhost:5000/Marketplace",
        method: "post",
        headers:{
            "Content-Type": "application/json",
        },
        data: formData,
    })
        .then((res) => res.json())
        .catch((err) =>{
            console.log(err);
        });
};

export const getMarketplaceNFT = async (saleType) =>{
    const res = await axios.get(`http://localhost:5000/Marketplace?sale_type=${saleType}`);
    
    return res;
};

export const getNFTDetail = async (_id) =>{
    const res = await axios.get(`http://localhost:5000/Marketplace/${_id}`);
    return res;
};

export const updateBidDetail = async (_id,bidDetails) =>{
    axios({
        url: `http://localhost:5000/Marketplace/${_id}`,
        method: "put",
        headers:{
            "Content-Type": "application/json",
        },
        data: bidDetails,
    })
        .then((res) => res.json())
        .catch((err) =>{
            console.log(err);
        });
};

export const updateBuyerDetails = async (_id,nftDetail) =>{
    axios({
        url: `http://localhost:5000/Marketplace/${_id}`,
        method: "put",
        headers:{
            "Content-Type": "application/json",
        },
        data: nftDetail,
    })
        .then((res) => res.json())
        .catch((err) =>{
            console.log(err);
        });
};