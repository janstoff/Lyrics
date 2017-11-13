import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router'
import fetchSongQuery from '../queries/fetchSong'
import LyricList from './LyricList'
import LyricCreate from './LyricCreate'

class SongDetail extends Component {
  render() {
    const { song } = this.props.data

    if (!song) {
			return <div></div>
		}

    return(
      <div>
        <Link to="/">back</Link>
          <h4>{song.title}</h4>
          <LyricList song={song}  />
          <LyricCreate song={song} />
      </div>
    )
  }
}

export default graphql(fetchSongQuery, {
  options: (props) => { return { variables: { id: props.params.id } } }
  })
(SongDetail)
