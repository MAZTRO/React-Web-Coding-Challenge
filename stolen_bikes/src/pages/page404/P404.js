import React from "react";
import { useNavigate } from 'react-router-dom'

let P404 = (props) => {
  const navigate = useNavigate()

  return (
    <div className="p404Container">
      <h1>Page 404</h1>
    </div>
  )
}

export default P404
