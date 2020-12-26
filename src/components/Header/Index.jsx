import './HeaderStyles.scss'

import { useRef} from 'react'
import { useHistory} from 'react-router-dom'

import Logo from '../../images/logo.svg'
import { ReactComponent as IconSearch } from '../../images/search.svg'

const Header = () => {
  const ALLOWED_KEYS_MAX_LENGTH = [
    'Backspace',
    'Enter',
    'Delete',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'End',
    'Home',
    'Control',
    'Shift',
    'Alt',
    'Tab'
  ]

  let history = useHistory()

  const refInputSearch = useRef(null)
  const refSearchContainer = useRef(null)

  const handleKeyDown = (e) => {
    let $search = document.querySelector('#in_search')
    if($search.value.length >= 50 && !ALLOWED_KEYS_MAX_LENGTH.includes(e.key)) e.preventDefault();
  }

  const handleSearch = (e) => {    
    if(e.key === 'Enter' || e.type == 'click'){
        if(refInputSearch.current.value.trim().length !== 0)
            history.push(`/s/${refInputSearch.current.value.toLowerCase()}`)
        else if(!refSearchContainer.current.classList.contains('invalidSearchInput'))    
            refSearchContainer.current.classList.add('invalidSearchInput')
    }
    else if(refSearchContainer.current.classList.contains('invalidSearchInput'))
        refSearchContainer.current.classList.remove('invalidSearchInput')
    
    return false
  }

  return (
    <header>
      <div id="header_logo_container">
        <img src={Logo} id="header_logo" title="foodyou" alt="Logo foodyou"/>
      </div>
        <div ref={refSearchContainer} id="header_search_container">
            <input ref={refInputSearch}
                   type="text"
                   name="search"
                   id="in_search" 
                   placeholder="Search" 
                   autoComplete="off"
                   onKeyDown={handleKeyDown}
                   onKeyUp={handleSearch}/>
              <button type="button" 
                      id="btn_search_recipe" 
                      className="remove_user_select"
                      onClick={handleSearch}>
                  <IconSearch id="search_icon" className="icon"/>
              </button>
        </div>
    </header>
  )
}
export default Header