import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      This page doesn`t exists. Go <Link to='/'>Home</Link>`
    </div>
  )
}
export default NotFoundPage;