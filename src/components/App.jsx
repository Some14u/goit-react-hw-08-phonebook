import Spacer from "components/Spacer/Spacer";
import Header from "components/Header/Header";
import Profile from "components/Profile/Profile";
import Statistics from "components/Statistics/Statistics";
import FriendList from "./FriendList/FriendList";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import user from "data/user.json";
import data from "data/data.json";
import friends from "data/friends.json";
import transactions from "data/transactions.json";



export const App = () => {
  return (
    <div className="wrapper">
    <Header text="Первое задание" bgColor="#eff" skipSpaceBefore />
      <Profile
        username={user.username}
        tag={user.tag}
        location={user.location}
        avatar={user.avatar}
        stats={user.stats}
      />
    <Header text="Второе задание" bgColor="#ffe" />
      <Statistics title="Upload stats" stats={data} />
      <Spacer />
      <Statistics stats={data} />
    <Header text="Третье задание" bgColor="#fef" />
      <FriendList friends={friends} />
    <Header text="Четвёртое задание" bgColor="#efe" width="350px"/>
      <TransactionHistory items={transactions} />
    </div>
  );
};
