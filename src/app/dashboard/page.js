import OverlayContainer from '@/components/OverlayContainer/OverlayContainer'
import LinkButton from '@/components/Buttons/LinkButton';
import React from 'react'
import Link from 'next/link';

export default function page() {
  return (
       <section className='w-full h-auto py-10 border border-b-2 border-gray100'>
          <div className='app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
       
              <div className='w-full sm:col-span-2 lg:col-span-2'>
          <Link href='/dashboard/orders'>
                  <OverlayContainer
                      imgSrc='/bg-img/banner_minipage1.jpg'
                      imgSrc2='/bg-img/banner_minipage1-tablet.jpg'
                      imgAlt='New Arrivals'>
                      <LinkButton
                          href='/dashboard/orders'
                          extraClass='absolute bottom-10-per sm:right-10-per z-20'>
                          Orders
                      </LinkButton>
                  </OverlayContainer>
          </Link>
              </div>
       
        
            <div className='w-full'>
          <Link href='/dashboard/profile'>
              <OverlayContainer
                imgSrc='/bg-img/banner_minipage2.jpg'
                imgAlt='Women Collection'>
                <LinkButton
                  href='/dashboard/profile'
                  extraClass='absolute bottom-10-per z-20'>
                  Profile
                </LinkButton>
              </OverlayContainer>
          </Link>
            </div>
       
       
            <div className='w-full'>
          <Link href='/dashboard/completed'>
              <OverlayContainer
                imgSrc='/bg-img/banner_minipage3.jpg'
                imgAlt='Men Collection'>
                <LinkButton
                  href='/dashboard/completed'
                  extraClass='absolute bottom-10-per z-20'>
                  Completed
                </LinkButton>
              </OverlayContainer>
          </Link>
            </div>
       
          </div>
        </section>
  )
}
