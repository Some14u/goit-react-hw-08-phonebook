import PropTypes from "prop-types";
import s from "./Statistics.module.css";


export default function Statistics({ title, stats }) {
  return (
    <section className={s.statistics}>
      {title
        ? <h2 className={s.title}>{title}</h2>
        : ""}
      <ul className={s.statList}>
        {stats.map(buildItem)}
      </ul>
    </section>
  );
}

Statistics.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  }).isRequired),
}

function buildItem({ id, label, percentage }) {
  return (
    <li key={ id } className={s.item} style={{backgroundColor: getRandomHexColor()}}>
      <span className={s.label}>{ label }</span>
      <span className={s.percentage}>{ percentage }%</span>
    </li>
  );
}


// Случайный цвет с возможностью ограничивать выходные значения
// Используется чтобы не получать слишком тёмные или слишком светлые цвета
function getRandomHexColor(lowerBound = 30, upperBound = 200) {
  var r = lowerBound + Math.floor(rnd.nextFloat() * (upperBound - lowerBound));
  var g = lowerBound + Math.floor(rnd.nextFloat() * (upperBound - lowerBound));
  var b = lowerBound + Math.floor(rnd.nextFloat() * (upperBound - lowerBound));
  return "#" + r.toString(16).padStart(2, 0) + g.toString(16).padStart(2, 0) + b.toString(16).padStart(2, 0);
}


// Сидируемый псевдогенератор чисел
class Random {
  constructor(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0)
      this._seed += 2147483646;
  }
  next() {
    return this._seed = this._seed * 16807 % 2147483647;
  }
  nextFloat() {
    return (this.next() - 1) / 2147483646;
  }
}

const rnd = new Random(123456); // Экземпляр, используется в getRandomHexColor