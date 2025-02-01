import dbConnect, { collectionName } from '@/lib/dbConnect';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ServicesSection() {
    const serviceCollection = dbConnect(collectionName.serviceCollection);
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services.json`);
    const data = await serviceCollection.find({}).toArray()
    console.log(data)
    return (
        <div className='grid grid-cols-12 gap-4 container mx-auto'>
            {data.map((item) => {
                return <div key={item._id} className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-4 h-full border'>
                    <figure className='w-full h-3/4 flex items-center justify-center'>
                        <Image src={item.img} width={316} height={208} className='object-cover w-full h-full' alt={item.title} />
                    </figure>
                    <div className='flex items-center justify-between mt-3'>
                        <div>
                            <h2 className='text-xl font-semibold'>{item.title}</h2>
                            <p className='text-xl font-semibold text-orange-500'>${item.price}</p>
                        </div>
                        <div>
                            <Link href={`/serviceDetails/${item._id}`} className="text-orange-500">
                                <ArrowUpRight/>
                            </Link>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
