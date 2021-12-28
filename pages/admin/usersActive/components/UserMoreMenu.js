import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import { useRouter } from 'next/router'
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material'

// ----------------------------------------------------------------------

export default function UserMoreMenu({ UserDetail, allUsers, handleDelUser }) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { id } = UserDetail
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/admin/usersActive/${id}`)
  }
  const handleClickDelUser = (id) => {
    let deleteUser = allUsers.filter((user) => user.id !== id)
    let userDel = allUsers.filter((user) => user.id === id)
    handleDelUser(deleteUser, userDel)
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => handleClickDelUser(id)}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleClick} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  )
}
