import CheckoutForm from '@/app/components/forms/chechoutForm.jsx/CheckoutForm';
import React from 'react'

export default async function page({ params }) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/service/${id}`)
    const data = await res.json();
    console.log(data)
  return (
    <div>
      <CheckoutForm data={data}/>
    </div>
  )
}
