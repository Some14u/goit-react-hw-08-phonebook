import PropTypes from "prop-types";
import s from "./FriendList.module.css";

export const FriendList = ({ friends }) => {
  return (
    <ul className={s.friendList}>
      {friends.map(item => <FriendListItem key={item.id} {...item} />)}
    </ul>
  );
}

export const FriendListItem = ({ avatar, name, isOnline }) => {
  const statusClass = [s.status, isOnline && s.statusOnline].join(" ");
  return (
    <li className={s.item}>
      <span className={statusClass}></span>
      <img className={s.avatar} src={avatar} alt="User avatar" width="48" />
      <p className={s.name}>{name}</p>
    </li>
  );
}

FriendList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
}

export default FriendList;