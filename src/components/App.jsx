import Contacts from "./Contacts";
import ContactForm from "./ContactForm";
import LanguageToggle from "./LanguageToggle";
import { useLanguagesContext } from "./LanguageProvider";
import AsyncIndicator from "./AsyncIndicator";


export default function App() {
  const { text } = useLanguagesContext();
  return (<>
    <h1>{text.phoneBook}</h1>
    <ContactForm/>
    <Contacts/>
    <LanguageToggle/>
    <AsyncIndicator/>
  </>);
}