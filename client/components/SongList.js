import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router'
import fetchSongListQuery from '../queries/fetchSongList'

class SongList extends Component {
	onSongDelete(id) {
    this.props.mutate({
      variables: { id: id },
      //refetchQueries: [{ query: fetchSongListQuery, /*variables: */ }]
    }).then(() => this.props.data.refetch()) //works if the query is associated with the component
  }

	render() {
		const { data } = this.props

		if (data.loading) {
			return <div>{/*Loading...*/}</div>
		}

		return (
			<div>
				<ul className="collection">
					{data.songs.map((song) => {
						return (
							<li key={song.id} className="collection-item">
                <Link to={`/songs/${song.id}`}>
                  {song.title}
                </Link>
								<i className="material-icons" onClick={() => this.onSongDelete(song.id)}>delete</i>
							</li>
						)
					})}
				</ul>
				<Link to="/songs/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		)
	}
}

const deleteSongsMutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`

export default compose(
  graphql(fetchSongListQuery), graphql(deleteSongsMutation)
)(SongList)
