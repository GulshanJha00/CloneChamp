"use client"
import React from 'react'
import { useParams } from 'next/navigation'
const page = () => {

    const params = useParams()
    const id = params.id
  return (
    <div>
      <h1>Yellow {id}</h1>
    </div>
  )
}

export default page
