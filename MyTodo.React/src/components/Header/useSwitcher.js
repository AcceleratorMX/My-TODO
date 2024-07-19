import { useDispatch, useSelector } from 'react-redux';
import { switchStorageType } from "../../redux/actions/storage.js";

const useSwitcher = () => {
    const dispatch = useDispatch();
    const currentStorage = useSelector(state => state.storage.currentStorage); // Додано currentStorage

    const handleSwitchStorage = (event) => {
        const switchStorage = event.target.value;
        dispatch(switchStorageType(switchStorage));
    };

    return {
        currentStorage,
        handleSwitchStorage
    };
};

export default useSwitcher;
