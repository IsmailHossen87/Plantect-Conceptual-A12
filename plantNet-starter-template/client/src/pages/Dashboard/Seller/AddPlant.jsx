import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUrl } from '../../../api/Utilis'
import { AuthContext } from '../../../providers/AuthProvider'

const AddPlant = () => {
  const { user } = useContext(AuthContext)
  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const category = form.category.value
    const description = form.description.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageURL =await imageUrl(image)
    const plant = { name, category, description, price, quantity, imageURL}
    const seller ={
      name:user.displayName,
      image:user.photoURL,
      email:user.email
    }
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default AddPlant
