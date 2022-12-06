import React, { useState, useEffect } from 'react'
import Formatter from '../util/formatter'
import '../css/components/SongPreview.scss'

interface NumberOfSongViewsProps {
    numberOfViews: number
}

const SongViews = (props: NumberOfSongViewsProps) => {
    const [numberOfSongViews, setNumberOfSongViews] = useState("0")

    useEffect(() => {
        displayNumberOfSongViews();
    }, [])

    const displayNumberOfSongViews = () => {
        const songViewFormatted: string = Formatter.numberFormatter(props.numberOfViews, 1)
        setNumberOfSongViews(songViewFormatted)
    }

    return (
        <span className='song-views'>{numberOfSongViews}</span>
    )
}

export default SongViews;