import * as React from 'react';

import { useLocalStorageState } from './hooks/useLocalStorage'
import { copyToClipboard } from './util'

import Header from './components/Header'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import StatisticsCard from './components/StatisticsCard'
import ShortLinkContainer from './components/ShortLinkContainer'
import Spinner from './components/Spinner'

const MAX_LIST_ITEMS = 5

export interface ShortLinkListItem {
  originalLink: string,
  shortLink: string,
  isCopiedToClipboard: boolean
}

type Error = {
  errorMessage: string,
  errorCode: number
}

type Reducer<S, A> = (prevState: S, action: A) => S;

type State = {
  error: { errorMessage: string, errorCode: number } | null,
  inputValue: string
  isLoading: boolean,
  activeClipboard: string,
  showMobileNav: boolean
}

type Action =
  | { type: 'REQUEST_STARTED' }
  | { type: 'REQUEST_SUCCESS' }
  | { type: 'REQUEST_FAILURE', error: Error }
  | { type: 'USER_INPUT_CHANGE', value: string }
  | { type: 'SET_ACTIVE_CLIPBOARD', value: string }
  | { type: 'TOGGLE_MOBILE_NAV' }
  | { type: 'CLOSE_MOBILE_NAV' }

const appReducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'REQUEST_STARTED':
      return { ...state, isLoading: true }
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        error: null,
        inputValue: '',
        isLoading: false
      }
    case 'REQUEST_FAILURE':
      return { ...state, isLoading: false, error: action.error }
    case 'USER_INPUT_CHANGE':
      return { ...state, inputValue: action.value }
    case 'SET_ACTIVE_CLIPBOARD':
      return { ...state, activeClipboard: action.value }
    case 'TOGGLE_MOBILE_NAV':
      return { ...state, showMobileNav: !state.showMobileNav }
    case 'CLOSE_MOBILE_NAV':
      return { ...state, showMobileNav: false }
    default:
      throw new Error("Invalid type")
  }
}

function App() {
  const [state, dispatch] = React.useReducer(appReducer,
    {
      error: null,
      inputValue: '',
      isLoading: false,
      activeClipboard: '',
      showMobileNav: false
    })
  const [shortlinkList, setShortlinkList] = useLocalStorageState<ShortLinkListItem[]>('linkList', [])
  const mobileNavRef = React.useRef<HTMLElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      dispatch({ type: 'REQUEST_STARTED' })
      const url = `https://api.shrtco.de/v2/shorten?url=${state.inputValue}`
      const data = await (await fetch(url)).json()
      if (data.ok) {
        dispatch({ type: 'REQUEST_SUCCESS' })
        if (shortlinkList.length >= MAX_LIST_ITEMS)
          shortlinkList.pop()
        setShortlinkList(
          [{
            originalLink: data.result.original_link,
            shortLink: data.result.full_short_link,
            isCopiedToClipboard: false
          }, ...shortlinkList])
      } else {
        dispatch({ type: 'REQUEST_FAILURE', error: { errorMessage: data.error, errorCode: data.error_code } })
      }
    } catch (err) {
      dispatch({ type: 'REQUEST_FAILURE', error: { errorMessage: 'Error! Failed to fetch.', errorCode: 1 } })
    }
  }

  const handleChange = (value: string) => {
    dispatch({ type: 'USER_INPUT_CHANGE', value })
  }

  const handleShortlinkClick = (shortLink: string) => {
    if (state.activeClipboard !== shortLink) {
      copyToClipboard(shortLink)
        .then(() => {
          dispatch({ type: 'SET_ACTIVE_CLIPBOARD', value: shortLink })
        })
        .catch(error => console.log(error))
    }
  }

  const toggleNav = () => {
    dispatch({ type: 'TOGGLE_MOBILE_NAV' })
  }

  const handleClickOutsideMobileNav = (e: any) => {
    if (mobileNavRef.current && !mobileNavRef.current.contains(e.target) && state.showMobileNav) {
      dispatch({ type: 'CLOSE_MOBILE_NAV' })
    }
  }

  return (
    <div className='relative' onClick={handleClickOutsideMobileNav}>
      <Header toggleMobileNav={toggleNav} />
      <MobileNav isVisible={state.showMobileNav} ref={mobileNavRef} />
      <section className='flex justify-center items-center flex-col md:justify-between md:flex-row padding-horizontal pt-4 pb-24 leading-8 text-center md:text-left'>
        <div className='md:order-2 md:-mr-8 my-4 md:my-0 select-none'>
          <img src='./images/illustration-working.svg' alt='working' className='object-cover w-full max-w-md md:w-96 lg:w-112 xl:w-120' />
        </div>
        <div className='md:pr-4'>
          <p className='text-4xl lg:text-6xl font-bold'>More than just shorter links</p>
          <p className='text-gray-400 my-4'>Build your brand's recognition and get detailed insights on how your links are performing</p>
          <button className='btn rounded-3xl'>Get started</button>
        </div>
      </section>

      <section className='padding-horizontal py-12 bg-gray-200'>
        <div className='bg-cover -mt-30 md:-mt-24 mb-4'>
          <div className='form-section-mobile md:form-section-desktop p-6 md:p-6 lg:p-8 rounded-md bg-indigo-dark'>
            <form onSubmit={handleSubmit}>
              <div className='md:flex md:justify-between'>
                <div className='w-full md:mr-6 flex-1'>
                  <input
                    type='text'
                    value={state.inputValue}
                    onChange={(e) => handleChange(e.target.value)}
                    className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring ${state.error ? `focus:ring-red-600 focus:ring-offset-red-600 border-2 border-red-600` : `focus:ring-blue-300 focus:ring-offset-blue-300`}`}
                    placeholder='Paste URL here...' />
                  {state.error && <small role='alert' className='text-red-600 w-max'>{state.error.errorMessage}</small>}
                </div>
                <button
                  type="submit"
                  title='Shorten a link'
                  className='btn md:h-min rounded-md w-full h-min mt-4 md:m-0 md:w-auto disabled:opacity-80 disabled:cursor-not-allowed'
                  disabled={!state.inputValue || state.isLoading}
                >
                  {state.isLoading && <Spinner />}
                  {state.isLoading ? `Loading...` : `Shorten It!`}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul>
          {shortlinkList.length > 0 &&
            shortlinkList.map(item =>
              <ShortLinkContainer
                key={item.shortLink}
                linkData={item}
                handleClick={() => handleShortlinkClick(item.shortLink)}
                isActive={item.shortLink === state.activeClipboard}
              />
            )
          }
        </ul>
        <div className='mt-24 text-center'>
          <h1 className='text-4xl font-bold'>Advanced statistics</h1>
          <p className='text-lg text-gray-400'>Track how your links are performing across the web with our advanced statistics dashboard</p>
        </div>
        <div className='relative'>
          <span className='w-1 h-4/5 lg:w-3/4 bg-teal-primary lg:h-1 absolute left-1/2 lg:left-24 lg:top-28'></span>
          <div className='flex justify-center items-center flex-col lg:flex-row lg:justify-evenly lg:items-start mt-24'>
            <StatisticsCard
              imgSrc='./images/icon-brand-recognition.svg'
              title='Brand Recognition'
              description={`Boost your brand recognition with each click. Generic links don't mean a thing. Brand links help instil confidence in your content.`}
            />
            <StatisticsCard
              className='lg:mt-10'
              imgSrc='./images/icon-detailed-records.svg'
              title='Detailed Records'
              description={`Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.`}
            />
            <StatisticsCard
              className='lg:mt-20'
              imgSrc='./images/icon-fully-customizable.svg'
              title='Fully Customizable'
              description={`Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.`}
            />
          </div>
        </div>
      </section>
      <section className='boost-banner-mobile md:boost-banner-desktop padding-horizontal py-16 bg-indigo-dark bg-cover text-center'>
        <h2 className='text-white text-2xl md:text-4xl font-bold mb-4'>Boost your links today!</h2>
        <button className='btn rounded-3xl'>Get Started</button>
      </section>
      <Footer />
    </div>
  );
}

export default App;
