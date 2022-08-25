import axios from "axios";

export const Nonce = async () =>{

    const res=  await axios.get("http://localhost:5000/nonce");
    return res.data;
};

export const updateNonce = async (nonce) =>{

     await axios.put(`http://localhost:5000/nonce/${nonce}`);
   
}