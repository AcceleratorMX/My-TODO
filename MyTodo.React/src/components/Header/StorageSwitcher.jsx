import useSwitcher from "./useSwitcher.js";
import {SQL, XML} from "../../redux/constants.js";

const StorageSwitcher = () => {
    const {
        currentStorage,
        handleSwitchStorage
    } = useSwitcher();

    console.log("Current Storage in Component:", currentStorage); // Додано для перевірки


    return (
        <select
            className='form-select select-switcher'
            value={currentStorage}
            onChange={handleSwitchStorage}
        >
            <option value={SQL}>SQL</option>
            <option value={XML}>XML</option>
        </select>
    );
}
export default StorageSwitcher;