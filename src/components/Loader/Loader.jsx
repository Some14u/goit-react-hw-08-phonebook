import s from "./Loader.module.css";
import { ReactComponent as Dots } from "resources/dots.svg";


export default function Loader() {
  return <div className={s.container}><Dots className={s.svg} /></div>;
}