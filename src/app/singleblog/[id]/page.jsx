import SinglePost from '@/components/SinglePost/SinglePost'
import React from 'react'
export const metadata = {
  title: 'Daily Mail | Single post',
  description: 'The best blog app!',
}
const SingleBlogpage = ({params}) => {
  return (
    <div>
      <SinglePost params={params.id}/>
    </div>
  )
}

export default SingleBlogpage
