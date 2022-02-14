import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

import './modal.css'
import Bike from '../../image/iconBike.png'

let Modal = (props) => {
  const { ID } = props
  const [loandingModal, setLoandingModal] = useState(false)
  const [bike, setbike] = useState({})

  useEffect(() => {
    setLoandingModal(true)

    fetch(`https://bikeindex.org/api/v3/bikes/${ID}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res);

        if (res.error) {
          setbike({
            message: "No data to show"
          })
        } else {
          setbike(res.bike)
        }

        setLoandingModal(false)
      })
      .catch(err => {
        Swal.fire({
          title: `<h2 style="color: #FFF; font-size: 40px; font-weight: 600;">Upps!! intenta nuevamente.<h2/>`,
          padding: '1vw 3vw',
          background: '#ff0136',
          showConfirmButton: false,
          showCloseButton: true,
        })
        setLoandingModal(false)
      })

    return () => { /* Unmount */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="modalContainer">
      {
        loandingModal
        ? <div className='preloader'></div>
        : <div className="cardDetail">
            <div className="title">
              <div className="largeImage" style={{ backgroundImage: `url('${!bike.large_img ? Bike : bike.large_img }')` }}></div>
              <div className="infoContModal">
                <h2>{ bike.title }</h2>
                <h3>{ bike.stolen_location }</h3>
                <h4>Date stolen:</h4>
                <p className='dateStolen'>{ new Date(bike.date_stolen).toUTCString() }</p>
              </div>
            </div>
            <div className="generalInfo">
              <h2>Date report:</h2>
              {
                bike.stolen_record &&
                <p>{ new Date(bike.stolen_record.created_at).toUTCString() }</p>
              }
              <h2>Last Update</h2>
              <p>{ new Date(bike.registration_updated_at).toUTCString() }</p>
              <h2>Description:</h2>
              <p>{ bike.description }</p>
            </div>
          </div>
      }
    </div>
  )
}

export default Modal
