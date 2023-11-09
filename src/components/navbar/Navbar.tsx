import {FC} from 'react';
import classes from './Navbar.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector/useTypedSelector.ts";

type NavbarProps = {
  currentPage: string
}

export const Navbar: FC<NavbarProps> = ({currentPage}) => {
  const theme = useTypedSelector((state) => state.theme.name)
  
  return (
    <div className={classes.container} style={{backgroundColor: theme?.secondColor, color: theme?.textColor}}>
      {currentPage}
    </div>
  );
};
