import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUrl } from '../../../api/Utilis'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const AddPlant = () => {
const {user}= useAuth()
const [uploadBtnText, setUploadBtnText] = useState('Upload Image')
const [loading,setloading]= useState(false)
const axiosSecure = useAxiosSecure()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setloading(true)
    const form = e.target
    const name = form.name.value
    const category = form.category.value
    const description = form.description.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageURL =await imageUrl(image)
    const seller ={
      name:user.displayName,
      imageUser :user.photoURL,
      email:user.email
    }
    const plant = {seller, name, category, description, price, quantity, imageURL}
    try{
       await axiosSecure.post('/plants', plant)
       Swal.fire({
        title: "Sucessfully added this item!",
        icon: "success",
        draggable: true
      });
    }catch(err){
      console.error(err)
    }finally{
      setloading(false)
    }
   
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm 
      handleSubmit={handleSubmit} 
      setUploadBtnText={setUploadBtnText}
      uploadBtnText={uploadBtnText}
      loading={loading}
      />
    </div>
  )
}

export default AddPlant
