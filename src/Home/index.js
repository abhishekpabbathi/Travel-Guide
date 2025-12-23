import {Component} from 'react'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    listOfData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const formatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))

      this.setState({
        listOfData: formatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <p>Loading...</p>
    </div>
  )

  renderSuccessView = () => {
    const {listOfData} = this.state

    return (
      <ul className="ul">
        {listOfData.map(each => (
          <li key={each.id} className="list">
            <img className="image" alt={each.name} src={each.imageUrl} />
            <div className="head-para-div">
              <h1 className="head">{each.name}</h1>
              <p className="para">{each.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div className="bg-home-div">
        <h1 className="title">Travel Guide</h1>

        {apiStatus === apiStatusConstants.inProgress && this.renderLoader()}
        {apiStatus === apiStatusConstants.success && this.renderSuccessView()}
      </div>
    )
  }
}

export default Home
