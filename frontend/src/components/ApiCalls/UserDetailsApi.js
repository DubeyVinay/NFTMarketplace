import axios from "axios";

export const UserDetailsApi = async (formData) =>{

    axios({
        url: "http://localhost:5000/userdetails",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });
}