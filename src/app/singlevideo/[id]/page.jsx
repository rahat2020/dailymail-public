import SingleVideo from '@/components/SingleVideo/SingleVideo'
import React from 'react'
export const metadata = {
  title: 'Daily Mail | Single video',
  description: 'The best blog app!',
}
const page = ({params}) => {
  return (
    <div>
      <SingleVideo params={params.id}/>
    </div>
  )
}

export default page