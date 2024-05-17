import CategoryByPosts from '@/components/CategoryByPosts/CategoryByPosts'
import React from 'react'

export const metadata = {
  title: 'Daily Mail | Category Posts',
  description: 'The best blog app!',
}

const page = ({params}) => {
  return (
    <div>
        <CategoryByPosts params={params} />
    </div>
  )
}

export default page