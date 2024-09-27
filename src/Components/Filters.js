import React, { useState } from 'react'
import CategoriesData from '../Data/CategoriesDta'
import { Listbox } from '@headlessui/react'
const YearData = [
  {title: "Sort By Year"},
  {title: "1700 - 1800"},
  {title: "1800 - 1900"},
  {title: "1900 - 2000"},
  {title: "2000 - 2010"},
  {title: "2010 - 2030"},
]

const TimesData = [
  {title: "Sort By Hours"},
  {title: "1 - 5 Hours"},
  {title: "5 - 10 Hours"},
  {title: "10 - 15 Hours"},
  {title: "15 - 20 Hours"},
]

const RatesData = [
  {titles:"Sort By Rates"},
  {title: "1 Star"},
  {title: "2 Star"},
  {title: "3 Star"},
  {title: "4 Star"},
  {title: "5 Star"},
]

function Filters() {
  const [category, setCategory] = useState({title:"Category"});
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState (TimesData[0]);
  const [rates, setRates] = useState (RatesData[0]);

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items: CategoriesData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: times,
      onChange: setTimes,
      items: TimesData,
    },
    {
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
    
  ]
  return (
    <div className='my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6'>
      {
        Filter.map((item,index) =>(
          <Listbox key = {index} value={item.value} onChange={item.onChange}>
              <div className='relative'>
                <Listbox.Button className="relative border border-gray-800  text-white text-left bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-xs">
                  <span className='block truncate'>{item.value.title}</span>
                    <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2'>
                      
                    </span>
                </Listbox.Button>
              </div>
          </Listbox>
        ))
      }
    </div>
  )
}

export default Filters

