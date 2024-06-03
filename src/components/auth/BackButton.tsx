import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface BackButtonprops {
  label: string
  link: string
  href: string
}

const BackButton = ({ label, href, link }: BackButtonprops) => {
  return (
    <div className='flex w-full justify-center'>
      <Button variant="link" className='font-normal hover:no-underline cursor-default m-0 p-0' size="sm">
        <span >{label}</span>
      </Button>
      <Button variant="link" className='font-normal m-0 p-1 hover:text-blue-600' size="sm" asChild>
        <Link href={href}>
          <span >{" " + link}</span>
        </Link>

      </Button>
    </div>
  )
}

export default BackButton