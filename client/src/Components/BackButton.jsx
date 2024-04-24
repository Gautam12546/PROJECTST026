import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function BackButton({ destination = '/admin' ,setShowModel}) {
  return (
    <div className='flex'>
        <Link 
            to={destination}
            className='text-black px-2 py-2 rounded-full w-fit border-2 border-black' onClick={()=>{
              setShowModel(false)
            }}>
                <BsArrowLeft className='text-xl' />
            </Link>


    </div>
  )
}

export default BackButton