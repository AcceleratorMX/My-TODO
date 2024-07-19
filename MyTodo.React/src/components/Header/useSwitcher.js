import { useDispatch, useSelector } from "react-redux";
import { switchStorageType } from "../../redux/actions/storage";
import {useEffect, useState} from "react";
import {fetchCategories} from "../../redux/actions/categories";
import {fetchTodos} from "../../redux/actions/todos";

const useSwitcher = () => {
    const dispatch = useDispatch();
    const currentStorage = useSelector(state => state.storage.currentStorage);
    const [selectedStorage, setSelectedStorage] = useState(currentStorage);

    useEffect(() => {
        dispatch(fetchTodos());
        dispatch(fetchCategories());
    }, [selectedStorage, dispatch]);

    const handleSwitchStorage = (event) => {
        const newStorage = event.target.value;
        setSelectedStorage(newStorage);
        dispatch(switchStorageType(newStorage));
    };

    return {
        currentStorage: selectedStorage,
        handleSwitchStorage
    };
};

export default useSwitcher;
