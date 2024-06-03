import React from 'react'
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card'
import AuthHeader from './AuthHeader'
import BackButton from './BackButton'

interface SiginProps {
    label: string
    title: string
    backButtonHref: string
    backButtonLabel: string
    backButtonLink: string
    children: React.ReactNode
}

const cardWrapper = (props : SiginProps) => {
  return (
    <Card className='w-full shadow-md'>
        <CardHeader>
            <AuthHeader label={props.label} title={props.title} />
        </CardHeader>
        <CardContent>
            {props.children}
        </CardContent>
        <CardFooter>
            <BackButton label={props.backButtonLabel} href={props.backButtonHref} link={props.backButtonLink} />
        </CardFooter>
    </Card>
  )
}

export default cardWrapper