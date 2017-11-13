import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router'
import fetchSongQuery from '../queries/fetchSong'

class LyricList extends Component {

	onLyricLike(id, likes) {
    const { song } = this.props

		this.props.mutate({
			variables: { id: id },
      optimisticResponse: {
        __type: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
		})
	}

	render() {
    const { song } = this.props

		if (!song) {
			return <div />
		}
		return (
			<div>
				<ul className="collection">
					{song.lyrics.map(lyric => {
						return (
							<li key={lyric.id} className="collection-item">
								<div className="lyric-content">{lyric.content}</div>
								<div className="lyric-likes">{lyric.likes}</div>
								<i
									className="material-icons lyric-like-button"
									onClick={() => this.onLyricLike(lyric.id, lyric.likes)}>
									star
								</i>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

const LikeLyricMutation = gql`
	mutation LikeLyric($id: ID!) {
		likeLyric(id: $id) {
			content
			id
			likes
		}
	}
`

export default graphql(LikeLyricMutation)(LyricList)
