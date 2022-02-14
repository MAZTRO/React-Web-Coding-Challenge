import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Modal from '../modal/Modal'

import './cards.css'
import Bike from '../../image/iconBike.png'

const formatCurrency = (locales, currency, fractionDigits, number) => {
  var formatted = new Intl.NumberFormat(locales, {
    currency: currency,
    minimumFractionDigits: fractionDigits
  }).format(number);
  return formatted;
}

let Cards = (props) => {
  const { bikes: [bikes] } = { bikes: useState([]), ...(props.state || {}) }
  const { loanding: [loanding] } = { loanding: useState(false), ...(props.state || {}) }
  const [localLoanding, setLocalLoanding] = useState(false)
  const [totalStolen, setTotalStolen] = useState(0)
  /* const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('') */
  const [modal, setModal] = useState(false)
  const [selectedID, setSelectedID] = useState('')

  useEffect(() => {

    setLocalLoanding(true)

    fetch(`https://bikeindex.org/api/v3/search/count`)
      .then(res => res.json())
      .then(res => {
        // console.log(res);

        if (res.error) {
          Swal.fire({
            title: `<h2 style="color: #FFF; font-size: 40px; font-weight: 600;">Upps!! intenta nuevamente.<h2/>`,
            padding: '1vw 3vw',
            background: '#ff0136',
            showConfirmButton: false,
            showCloseButton: true,
          })
        } else {
          if (res.stolen) {
            setTotalStolen(res.stolen)
          }
        }
        setLocalLoanding(false)
      })
      .catch(err => {
        console.log(err);

        Swal.fire({
          title: `<h2 style="color: #FFF; font-size: 40px; font-weight: 600;">Upps!! intenta nuevamente.<h2/>`,
          padding: '1vw 3vw',
          background: '#ff0136',
          showConfirmButton: false,
          showCloseButton: true,
        })
        setLocalLoanding(false)
      })


    return () => { /* Unmount */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let handlePopUp = (id) => {
    setSelectedID(id)
    setTimeout(() => {
      setModal(true)
    }, 100);
  }

  return (
    <div className="cardsContainer">
      <div className="infoContainer">
        <div className="floatCard">
          <h2>Total number of bike theft cases</h2>
          {
            localLoanding
            ? <div className='preloader small'></div>
            : <h3>{ formatCurrency("es-CO", "COP", 0, totalStolen) }</h3>
          }
          <h2>Total search number of bike theft cases</h2>
          {
            localLoanding
            ? <div className='preloader small'></div>
            : <h3>{ formatCurrency("es-CO", "COP", 0, bikes.length) }</h3>
          }
        </div>

        {/* <div className="filters">
          <p>From:</p>
          <input
            value={fromDate}
            onChange={e => {setFromDate(e.target.value)}}
            type="date"
            className='fromDate'
            max={`${fullyear}-12-31`}
          />
          <p>To:</p>
          <input
            value={toDate}
            onChange={e => {setToDate(e.target.value)}}
            type="date"
            className='toDate'
            max={`${fullyear}-12-31`}
          />
        </div> */}
        <p>App by Jonatan Mazo</p>
      </div>

      {
        loanding
        ? <div className="cardsCont">
            <div className='preloader'></div>
          </div>
        : <div className="cardsCont">
            {
              bikes.length > 0
              ?  bikes.map((ele, idx) => {
                  let date = new Date(ele.date_stolen).toUTCString()
                  return (
                    <div className="cardItem" key={idx}>
                      <div className="thumb" style={{ backgroundImage: `url('${!ele.thumb ? Bike : ele.thumb }')` }}></div>
                      <div className="infoCont">
                        <h2>{ele.title}</h2>
                        <h3>{ele.stolen_location}</h3>
                        <p className='dateStolen'>{date}</p>
                        <button
                          className='more'
                          onClick={e => {handlePopUp(ele.id)}}
                        >More</button>
                      </div>
                    </div>
                  )
                })
              : <h2>No results</h2>
            }
          </div>
      }

      {
        modal &&
        <div className="modal">
          <div className="close" onClick={e => {setModal(false)}}>X</div>
          <Modal ID={selectedID}/>
        </div>
      }
    </div>
  )
}

export default Cards
