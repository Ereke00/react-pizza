import React from 'react'
import { AppContext } from '../../App'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
const Search = () => {
    const [value, setValue] = React.useState('')
    const { setSearchValue } = React.useContext(AppContext)
    const inputRef = React.useRef()
    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 1000),
        []
    )
    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }
    return (<div className={styles.inputes}>

        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M16.3198574,14.9056439 L21.7071068,20.2928932 L20.2928932,21.7071068 L14.9056439,16.3198574 C13.5509601,17.3729184 11.8487115,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,11.8487115 17.3729184,13.5509601 16.3198574,14.9056439 Z M10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 Z" fillRule="evenodd" /></svg>
        <input
            ref={inputRef}
            value={value} onChange={onChangeInput} className={styles.root} placeholder="Поиск пиццы..." />
        {value && (
            <svg onClick={onClickClear} className={styles.clear} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" id="Layer_1" viewBox="0 0 64 64"><title /><path d="M8.25,0,32,23.75,55.75,0,64,8.25,40.25,32,64,55.75,55.75,64,32,40.25,8.25,64,0,55.75,23.75,32,0,8.25Z" data-name="&lt;Compound Path&gt;" id="_Compound_Path_" /></svg>
        )}
    </div>
    )
}

export default Search
