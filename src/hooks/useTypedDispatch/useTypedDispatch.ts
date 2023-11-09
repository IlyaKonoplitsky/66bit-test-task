import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";

export const useTypedDispatch = () => useDispatch<AppDispatch>()

