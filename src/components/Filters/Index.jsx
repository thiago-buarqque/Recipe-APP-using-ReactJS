import React from 'react'

import { useRef, useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import './FiltersStyles.scss'
import FilterIcon from '../../images/filter.svg'

import {applyFilters, 
        openCloseFiltersBody,
        alternateCheckBoxState} from './Filters'

function Filters (props) {
    let history = useHistory()

    const refBtnFilters = useRef(null)
    const refMsgBtnFilters = useRef(null)
    const modifiedFilters = useRef(false)
    
    let currentCategories = props.currentCategories
    let currentNationalities = props.currentNationalities

    const handleClickBtnFilters = () =>{
        if(modifiedFilters.current){
            refMsgBtnFilters.current.innerHTML = 'Filters'
            modifiedFilters.current = false
            props.updateCurrentCategories(currentCategories)
            props.updateCurrentNationalities(currentNationalities)
        }
        else if(!modifiedFilters.current){
            openCloseFiltersBody()
        }
    }
    
    const handleCheckBoxClick = (e,updateFilter) => {
        let checkBoxValue = alternateCheckBoxState(e)
        updateFilter(e.target,checkBoxValue)

        modifiedFilters.current = true
        refMsgBtnFilters.current.innerHTML = 'Apply filters'
    }

    const updateCategories = (checkbox, value) => {
        if(!currentCategories) return
        if(checkbox.checked && !currentCategories.includes(value))
            currentCategories.push(value)
        else if(!checkbox.checked){
            let valueIndex = currentCategories.indexOf(value)
            if(valueIndex > -1)
                currentCategories.splice(valueIndex, 1)
        } 
    }

    const updateNationalities = (checkbox, value) => {
        if(checkbox.checked && !currentNationalities.includes(value))
            currentNationalities.push(value)         
        else if(!checkbox.checked){
            let valueIndex = currentNationalities.indexOf(value)
            if(valueIndex > -1)
                currentNationalities.splice(valueIndex, 1)
        }
    }

    const CheckBox = (_props) => {
        return(
            <div className="filters__checkBox_container">
                <div className="filters__checkBox_parent">
                    <div className={`div_checkBox${_props.active ? ' div_checkBox__checked' : ''}`} id={`div_checkBox__${_props.data}`}></div>
                    <input type="checkbox" 
                            className="filters__checkBox" 
                            id={`checkBox__${_props.data}`}
                            name={_props.data}
                            value={_props.data}
                            defaultChecked={_props.active}
                            onClick={(e) => handleCheckBoxClick(e,_props.updateFilter)}/>
                </div>
                <span className="filters__checkBox__span">{_props.data}</span>
            </div>        
        )
    }

    const CategoriesSection = (_props) => {       

        return(
            <div id="filters__categories_section" style={{display: _props.currentCategories ? 'inherit' : 'none'}}>
                <h6 className="filters__section_title">Categories</h6>
                <div id="filters__categories_body">
                    {
                        _props.currentCategories ?

                        _props.currentCategories.map( (data, i) => (
                            <CheckBox key={i} data={data} active={true} updateFilter={updateCategories}/>
                        ))

                        : ``                       
                    }
                    {
                         _props.availableCategories ?

                         _props.availableCategories.map( (data, i) => {
                            if(!_props.currentCategories.includes(data))
                                return <CheckBox key={i} data={data} active={false} updateFilter={updateCategories}/>
                            return ``
                         }                             
                         )
 
                         : ``
                    }
                </div>
            </div>
        
        )
    }

    const NationalitiesSection = (_props) => {       

        return(
            <div id="filters__nationalities_section">
                <h6 className="filters__section_title">Nationalities</h6>
                <div id="filters__nationalities_body">
                    {
                        _props.currentNationalities ?

                        _props.currentNationalities.map( (data, i) => (
                            <CheckBox key={i} data={data} active={true} updateFilter={updateNationalities}/>
                        ))

                        : ``
                    }
                    {
                         _props.availableNationalities ?

                         _props.availableNationalities.map( (data, i) => {
                            if(!_props.currentNationalities.includes(data))
                                return <CheckBox key={i} data={data} active={false} updateFilter={updateNationalities}/>
                            
                                return ``
                        }
                         )
 
                         : ``
                    }
                </div>
            </div>
        
        )
    }

    return (
        <div id="filters_container">
        <button ref={refBtnFilters}
                type="button"
                id="btn_apply_filters" 
                onClick={handleClickBtnFilters}
                >
          <img src={FilterIcon} alt="Filter icon"/>
          <span ref={refMsgBtnFilters} id="btn_apply_filters_msg">Filters</span>
        </button>
        <div id="filters_body">
            
            {
                // Current categories filters
                props.currentCategories ?
                <CategoriesSection 
                currentCategories={props.currentCategories}
                availableCategories={props.availableCategories ? props.availableCategories : undefined}/> : ``
            }
            {
                // Current nationalities filters
                props.currentNationalities ?
                <NationalitiesSection 
                currentNationalities={props.currentNationalities}
                availableNationalities={props.availableNationalities ? props.availableNationalities : undefined}/> : ``
            }

        </div>
      </div>
    )
}


export default Filters