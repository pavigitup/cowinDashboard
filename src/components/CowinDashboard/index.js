import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

const apiUrlStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinateByCoverageList: [],
    vaccinationByAge: [],
    vaccinationByGenderList: [],
    apiStatus: apiUrlStatus.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiUrlStatus.inProgress})

    const response = await fetch(vaccinationDataApiUrl)
    console.log('Response:', response)

    if (response.ok) {
      const data = await response.json()
      console.log('Data:', data)

      const updatedData = {
        vaccinationCoverage: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      this.setState({
        vaccinateByCoverageList: updatedData.vaccinationCoverage,
        vaccinationByAge: updatedData.vaccinationByAge,
        vaccinationByGenderList: updatedData.vaccinationByGender,
        apiStatus: apiUrlStatus.success,
      })
    } else {
      this.setState({apiStatus: apiUrlStatus.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
        className="failure-img"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderInProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {
      vaccinateByCoverageList,
      vaccinationByAge,
      vaccinationByGenderList,
    } = this.state
    return (
      <>
        <VaccinationCoverage dataCoverage={vaccinateByCoverageList} />
        <VaccinationByGender vaccinationByGenders={vaccinationByGenderList} />
        <VaccinationByAge vaccinationByAges={vaccinationByAge} />
      </>
    )
  }

  renderResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'INPROGRESS':
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-con">
        <div className="head-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="web-logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        {this.renderResultView()}
      </div>
    )
  }
}

export default CowinDashboard
