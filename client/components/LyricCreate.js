import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import fetchSongQuery from '../queries/fetchSong'


class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ' '
    }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.song.id,
      }
    }).then(() => this.setState({ content: ' ' }))
  }

  render() {
    return(
      <form
        className="lyric-form"
        onSubmit={(event) => this.onSubmit(event)}
      >
        <label>Add a Lyric</label>
        <input
            value={this.state.content}
            onChange={(event) => this.setState({ content: event.target.value })}
         />
      </form>
    )
  }
}

const AddLyricMutation = gql`
  mutation AddLyric($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
  		}
    }
  }
`

export default graphql(AddLyricMutation)(LyricCreate)
