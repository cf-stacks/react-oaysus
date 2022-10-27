import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import Classes from './scss/all.module.scss'

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default function Stepper ({ accountInfoPageData, step }) {
  console.log(step)
  return (
    <div className={Classes.stepContainer}>
      <div className={Classes.steper}>
        {accountInfoPageData.map(item => (
          <div className={Classes.stepItem} key={convertToSlug(item.title)}>
            <GoPrimitiveDot />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
