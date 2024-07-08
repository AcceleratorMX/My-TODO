

const StorageSwitcher = () => {
    return (
        <select
            className='form-select select-switcher'>
            <option value="sql">SQL</option>
            <option value="xml">XML</option>
        </select>
    );
}

export default StorageSwitcher;