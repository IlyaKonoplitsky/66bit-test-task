import { FC } from 'react';
import { useTypedDispatch } from "../../hooks/useTypedDispatch/useTypedDispatch.ts";
import {getTheme } from "../../store/slices/themeSlice/themeSlice.ts";
import classes from "./ThemePage.module.scss"
import { useTypedSelector } from '../../hooks/useTypedSelector/useTypedSelector.ts';
import {Loader} from "../../components";

export const ThemePage: FC = () => {
  const dispatch = useTypedDispatch();
  const { loading} = useTypedSelector((state) => state.theme)
  const theme = useTypedSelector((state) => state.theme.name)
  
  const changeTheme = (name: string) => {
    dispatch(getTheme(name));
  };
  
  return (
    <div className={classes.container} style={{backgroundColor: theme?.mainColor}}>
      <button
        style={{backgroundColor: theme?.secondColor, color: theme?.textColor}}
        className={classes.button_container}
        onClick={() => changeTheme('light')}
      >
        Светлая тема
      </button>
      <button
        style={{backgroundColor: theme?.secondColor, color: theme?.textColor}}
        className={classes.button_container}
        onClick={() => changeTheme('dark')}
      >
        Темная Тема
      </button>
      <button
        style={{backgroundColor: theme?.secondColor, color: theme?.textColor}}
        className={classes.button_container}
        onClick={() => changeTheme('blue')}
      >
        Синяя тема
      </button>
      {loading && <Loader/>}
    </div>
  );
};

