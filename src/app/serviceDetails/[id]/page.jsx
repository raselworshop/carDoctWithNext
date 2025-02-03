import dbConnect, { collectionName } from '@/lib/dbConnect'
import { ObjectId } from 'mongodb'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default async function ServiceDetails({ params }) {

    const { id } = await params;
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/service/${id}`)
    const data = await res.json();
    console.log(data)

    return (
        <div className='container mx-auto'>
            <section className='flex justify-center '>
                <figure className='relative'>
                    <Image src={'/assets/images/checkout/checkout.png'} alt='Checkout Banner' width={1280} height={300} />

                    <div className='transparent-layer layer-bg absolute top-0 left-0 w-full h-full border border-red-400'>
                        <div className='w-full h-full flex items-center ps-16 font-semibold text-3xl'>
                            <div>
                                <h2 className='text-white'>Service Details</h2>
                            </div>
                        </div>
                    </div>
                </figure>
            </section>

            <section className="container mx-auto grid grid-cols-12 gap-4 mt-4">
                {/* Left Side */}
                <div className="col-span-9 space-y-4">
                    <Image
                        className="w-full"
                        src={data?.img}
                        width={400}
                        height={280}
                        alt={data.title}
                    />
                    <h1 className="font-bold text-3xl">{data.title}</h1>
                    <p className="text-justify">{data?.description}</p>
                </div>
                {/* Right Side */}
                <div className="col-span-3 space-y-4">
                    <Link href={`/checkout/${data._id}`}>
                        <button className="w-full text-white h-9 bg-orange-500">
                            Checkout
                        </button>
                    </Link>
                    <p className="text-center text-xl font-bold">
                        Price: $ {data?.price}
                    </p>
                </div>
            </section>
        </div>
    )
}
