import {useNavigate} from "react-router-dom";
import classes from './Footer.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector/useTypedSelector.ts";

export const Footer = () => {
  const theme = useTypedSelector((state) => state.theme.name)
  
  const navigate = useNavigate()
  return (
    <div className={classes.footer_container} style={{backgroundColor: theme?.secondColor}}>
      <div className={classes.button_container}>
        <button
          className={classes.button}
          onClick={() => navigate('/')}
          style={{color: theme?.textColor}}
        >
          Новости
        </button>
        <button
          className={classes.button}
          onClick={() => navigate('/themes')}
          style={{color: theme?.textColor}}
        >
          Темы
        </button>
      </div>
    </div>
  );
};

