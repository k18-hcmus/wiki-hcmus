import Link from 'next/link'
import { Button } from '@mui/material'

const CustomLink = ({ href, page }) => {
  return (
    <Link href={href}>
      <Button sx={{ color: 'white' }}> {page}</Button>
    </Link>
  )
}

export default CustomLink
