import axios from "axios"

export const imageUrl=async (image)=>{
    const imagefromData = new FormData()
    imagefromData.append('image',image)

    const {data}=await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_APIKEY}`,imagefromData)

    return data.data.display_url
}