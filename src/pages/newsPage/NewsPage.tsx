import { useEffect } from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector/useTypedSelector.ts";
import {useTypedDispatch} from "../../hooks/useTypedDispatch/useTypedDispatch.ts";
import { getNews} from "../../store/slices/newsSlice/newsSlice.ts";
import classes from './NewsPage.module.scss'
import {Loader} from "../../components";

export function NewsPage() {
  const { news , page, loading } = useTypedSelector((state) => state.news);
  const theme = useTypedSelector((state) => state.theme.name)
  const dispatch = useTypedDispatch();
  
  useEffect(() => {
    if (page === 1 && !loading) {
      dispatch(getNews(2));
    }
  }, [page, loading]);
  
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading) {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;
      
      if (scrollPosition >= documentHeight - 200) {
        dispatch(getNews(page));
      }
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, loading]);
  
  const borderBottomStyle = `3px solid ${theme?.mainColor}`
  
  return (
    <div className={classes.news} style={{backgroundColor: theme?.mainColor}}>
      <ul>
        {news.map((item) => (
          <li className={classes.news_el} style={{backgroundColor: theme?.secondColor}} key={item.id}>
            <div style={{borderBottom: borderBottomStyle}}>
              <div className={classes.title} style={{color: theme?.textColor}}>{item.title}</div>
            </div>
            <div className={classes.cardContent}>
              <p style={{color: theme?.textColor}}> {item.content}</p>
            </div>
          </li>
        ))}
      </ul>
      {loading && <Loader/>}
    </div>
  );
}
