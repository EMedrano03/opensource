import React from 'react'
import classnames from 'classnames'
import { filter } from 'lodash'
import utils from '~/utils'
import Filter from '~/components/filter/Filter'
import InfiniteScroll from '~/components/infinite-scroll/InfiniteScroll'
import DeveloperCard from '~/components/developer-list/developer-card/DeveloperCard'

const style = {
  first: {
    paddingRight: 10,
  },
  second: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  third: {
    paddingLeft: 10,
  }
}

/**
 * The DeveloperList object class.
 */
class DeveloperList extends React.Component {

  // Initial state.
  state = {
    filteredUsers: this.props.users
  }

  static defaultProps = {
    users: [],
  }

  /**
   * Render this component.
   */
  render() {
    const { filteredUsers } = this.state
    return (
      <div>
        <Filter
          placeholder="Filter developer by name..."
          onChange={(value) => this.filterChanged(value)}
        />
        <div className="row">
          <InfiniteScroll
            size={15}
            items={filteredUsers}
            render={(user, index) => (
              <div
                key={user.id}
                className="col s12 m6 l4"
                style={style[['first', 'second', 'third'][index % 3]]}
              >
                <DeveloperCard user={user} />
              </div>
            )}
          />
        </div>
      </div>
    )
  }

  /**
   * Handle filter value changes.
   * @param {String} value The new filter value.
   */
  filterChanged(value) {
    const { users } = this.props

    // Filter users.
    const query = utils.unicodeNormalize(value)
    const matcher = new RegExp(utils.escapeRegExp(query), 'i')
    const filteredUsers = filter(users, (user) => {
      return matcher.test(user.normalizedName)
    })

    // Update the state.
    this.setState((state) => ({
      filteredUsers,
    }))
  }
}

export default DeveloperList
