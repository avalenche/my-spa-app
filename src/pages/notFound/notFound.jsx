import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      This page doesn`t exists. Go <Link to='/'>Home</Link>`
    </div>
  )
}
export default NotFoundPage;