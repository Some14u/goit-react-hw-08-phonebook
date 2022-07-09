import Contacts from "./Contacts";
import ContactForm from "./ContactForm";
import LanguageToggle from "./LanguageToggle";
import Filter from "./Filter";
import { useLanguagesContext } from "./LanguageProvider";


export default function App() {
  const { text } = useLanguagesContext();
  return (
    <div>
      <h1>{text.phoneBook}</h1>
      <ContactForm />
      <h2>{text.contacts}</h2>
      <Filter/>
      <Contacts/>
      <LanguageToggle/>
    </div>
  );
}