import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

/**
 * @author 박성준
 * @todo 로그아웃
 */

const Container = styled.div`
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
function MeatballMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <Button
        id="meatball"
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <MoreHorizIcon fontSize="medium" sx={{ color: 'common.black' }} />
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        MenuListProps={{
          'aria-labelledby': 'meatball',
        }}>
        <Link
          to="/bookmark"
          style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
          <MenuItem onClick={handleClose}>
            <Typography fontWeight={300}>읽고 싶은 책</Typography>
          </MenuItem>
        </Link>
        <Link
          to="/profilechange/:userId"
          style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
          <MenuItem onClick={handleClose}>
            <Typography fontWeight={300}>개인 설정</Typography>
          </MenuItem>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MenuItem onClick={handleClose} color="warning">
            <Typography
              fontWeight={300}
              sx={{ color: '#ed6c02', marginRight: '0.5rem' }}>
              로그아웃
            </Typography>
            <LogoutIcon fontSize="small" color="warning" />
          </MenuItem>
        </Link>
      </Menu>
    </Container>
  );
}

export default MeatballMenu;
