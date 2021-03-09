import * as React from 'react';

import Header from './components/Header'
import Footer from './components/Footer'
import StatisticsCard from './components/StatisticsCard'
import ShortLinkContainer from './components/ShortLinkContainer'

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
  shortlinkList: ShortLinkListItem[],
  isLoading: boolean
}

type Action =
  | { type: 'REQUEST_STARTED' }
  | { type: 'REQUEST_SUCCESS', data: any }
  | { type: 'REQUEST_FAILURE', error: Error }
  | { type: 'USER_INPUT_CHANGE', value: string }
  | { type: 'UPDATE_SHORTLINK_LIST', list: ShortLinkListItem[] };

const appReducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'REQUEST_STARTED':
      return { ...state, isLoading: true }
    case 'REQUEST_SUCCESS':
      return {
        error: null,
        inputValue: '',
        shortlinkList: [{
          originalLink: action.data.result.original_link,
          shortLink: action.data.result.full_short_link,
          isCopiedToClipboard: false
        }, ...state.shortlinkList],
        isLoading: false
      }
    case 'REQUEST_FAILURE':
      return { ...state, error: action.error }
    case 'USER_INPUT_CHANGE':
      return { ...state, inputValue: action.value }
    case 'UPDATE_SHORTLINK_LIST':
      return { ...state, shortlinkList: action.list }
    default:
      throw new Error("Invalid type")
  }
}

function App() {
  const [state, dispatch] = React.useReducer(appReducer, { error: null, inputValue: '', shortlinkList: [], isLoading: false })
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      dispatch({ type: 'REQUEST_STARTED' })
      const url = `https://api.shrtco.de/v2/shorten?url=${state.inputValue}`
      const data = await (await fetch(url)).json()
      if (data.ok) {
        dispatch({ type: 'REQUEST_SUCCESS', data })
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

  const handleShortlinkClick = (index: number) => {
    if (!state.shortlinkList[index].isCopiedToClipboard) {
      navigator.clipboard.writeText(state.shortlinkList[index].shortLink)
      const newList = state.shortlinkList.map(
        item => {
          return { originalLink: item.originalLink, shortLink: item.shortLink, isCopiedToClipboard: false }
        })
      newList[index].isCopiedToClipboard = true;
      dispatch({ type: 'UPDATE_SHORTLINK_LIST', list: newList })
    }
  }

  return (
    <div >
      <Header />
      <section className='flex justify-center items-center flex-col md:justify-between md:flex-row px-8 pt-4 pb-24 md:px-24 leading-8 text-center md:text-left'>
        <div className='md:order-2 w-3/4 md:w-2/5 md:min-w-1/2 md:ml-4 md:relative md:left-20 my-4 md:my-0'>
          <img src='./images/illustration-working.svg' alt='working' className='' />
        </div>
        <div>
          <p className='text-5xl md:text-6xl font-bold leading-tight'>More than just shorter links</p>
          <p className='text-gray-400 my-4'>Build your brand's recognition and get detailed insights on how your links are performing</p>
          <button className='btn rounded-3xl'>Get started</button>
        </div>
      </section>

      <section className='px-8 py-4 md:px-24 bg-gray-200'>
        <div className='bg-cover -mt-20 mb-4'>
          <div className='p-6 md:p-6 lg:p-8 form-section rounded-md bg-purple-900'>
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
                  type='submit'
                  className='btn md:h-min rounded-md w-full h-min mt-4 md:m-0 md:w-auto disabled:opacity-80 disabled:cursor-not-allowed'
                  disabled={!state.inputValue || state.isLoading}
                >Shorten It!
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul>
          {state.shortlinkList.length > 0 &&
            state.shortlinkList.map((item, idx) =>
              <ShortLinkContainer
                key={item.shortLink}
                linkData={item}
                handleClick={() => handleShortlinkClick(idx)}
              />
            )
          }
        </ul>
        <div className='mt-24 text-center'>
          <h2 className='text-4xl font-bold'>Advanced statistics</h2>
          <p className='text-lg text-gray-400'>Track how your links are performing across the web with our advanced statistics dashboard</p>
        </div>
        <div className='relative'>
          <span className='w-1 h-4/5 lg:w-3/4 bg-green-400 lg:h-1 absolute left-1/2 lg:left-24 lg:top-28'></span>
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

      <section className='boost-banner-mobile md:boost-banner-desktop px-8 py-16 md:px-24 bg-purple-900 bg-cover text-center'>
        <h2 className='text-white text-2xl md:text-4xl font-bold mb-4'>Boost your links today!</h2>
        <button className='btn rounded-3xl'>Get Started</button>
      </section>
      <Footer />
    </div>
  );
}

export default App;
