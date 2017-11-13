import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchSongListQuery from '../queries/fetchSongList'


class SongCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ' '
    }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{ query: fetchSongListQuery, /*variables: */ }]
    }).then(() => hashHistory.push('/'))
  }

  render() {
    return(
      <div>
        <Link to="/">back</Link>
        <h4>Create a New Song</h4>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <label>Song Title:</label>
          <input
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </form>
      </div>
    )
  }
}

const AddSongMutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`

export default graphql(AddSongMutation)(SongCreate) //gives the class a props.mutate
