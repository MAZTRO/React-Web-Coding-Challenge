import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import './searchBar.css'

let SearchBar = (props) => {
  const { bikes: [bikes, setBikes] } = { bikes: useState([]), ...(props.state || {}) }
  const { loanding: [loanding, setLoanding] } = { loanding: useState(false), ...(props.state || {}) }
  const [textDescription, setTextDescription] = useState('')
  const [miles, setMiles] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    console.log(bikes, loanding);

    setLoanding(true)

    fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=100`)
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
          setBikes([])
        } else {
          if (res.bikes) {
            setBikes(res.bikes)
          }
        }
        setLoanding(false)
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
        setLoanding(false)
      })

    return () => { /* Unmount */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let handleSubmit = (evt) => {
    evt.preventDefault()

    setLoanding(true)

    fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=100${textDescription === "" ? "" : `&query=${textDescription}`}${miles === '' ? `&distance=${100}` : `&distance=${miles}`}&stolenness=proximity&location=${city === "" ? "IP" : city}`)
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
          setBikes([])
        } else {
          if (res.bikes) {
            setBikes(res.bikes)
          }
        }
        setLoanding(false)
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
        setLoanding(false)
      })
  }


  return (
    <form className="searchBarContainer" onSubmit={e => {handleSubmit(e)}}>
      <input
        className='descriptionInput'
        type="text"
        placeholder='Search bike descriptions'
        value={textDescription}
        onChange={e => {setTextDescription(e.target.value)}}
      />
      <p>within</p>
      <input
        type="number"
        placeholder='0 - 1000'
        className='milesInput'
        value={miles}
        onChange={e => {setMiles(e.target.value)}}
      />
      <p>miles of</p>
      <input
        className='cityInput'
        type="text"
        placeholder='City'
        value={city}
        onChange={e => {setCity(e.target.value)}}
      />
      <button type="submit">Find</button>
    </form>
  )
}

export default SearchBar
