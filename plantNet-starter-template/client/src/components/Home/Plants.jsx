import Card from './Card'
import Container from '../Shared/Container'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'

const Plants = () => {

  const {data: plants, isLoading, isError} = useQuery({
    queryKey:['plants'],
    queryFn: async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/plants`)
      return data
    }
  })
  if(isLoading) return <p>Loading...</p>
  console.log(plants)
  return (
    <Container>
     {
      plants && plants.length >0 ?  <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
     {
      plants.map(plant => <Card key={plant._id} plant={plant}/> )
     }
    </div> : <p>No plants available</p>
     }
    </Container>
  )
}

export default Plants
