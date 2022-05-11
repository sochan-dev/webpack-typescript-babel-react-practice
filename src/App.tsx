import React,{FC} from 'react'
import {Sub} from './Sub'
import Styles from './styles/scss/app.module.scss'


export const App:FC = () => {
    return (
        <div className={Styles.root}>
        <h1 className={Styles.msg}>webpack × typescript × babel × react × scss-module</h1>
        <Sub msg={'gorgeous'}/>
        </div>
    )
}