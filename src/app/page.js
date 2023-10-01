
import Image from 'next/image';
import Button from '@/components/Buttons/Button';
import Slideshow from '@/components/HeroSection/Slideshow';
import OverlayContainer from '@/components/OverlayContainer/OverlayContainer';
import Card from '@/components/Card/Card';
import TestiSlider from '@/components/TestiSlider/TestiSlider';
import LinkButton from '@/components/Buttons/LinkButton';
import ourShop from '/public/bg-img/ourshop.png';
import { pb } from '@/app/pocketbase';
import { imageurl } from '@/components/Util/getimage';
import { getPocketBaseFromAuthCookie } from './pocketbaseserver';
import { cookies } from 'next/headers';
import ConfirmEmail from '@/components/emails/confirmemail';



export const revalidate = 0



const page = async () => {
  const bestselling = await pb.collection('fashion_products').getFullList({
    sort: `-purchases`
  })
  const featured = await pb.collection('fashion_products').getFullList({
    sort: `-views`
  })

  
  //  await pb.admins.authWithPassword('justinequartz@gmail.com', 'Ch%L$ea#2100');
  // // console.log(authData.admin)
  // // const cookieStore = cookies();
  // // const authValue = cookieStore.get('pb_auth');
  // // const pbserver = getPocketBaseFromAuthCookie(authData)
  // const emails = await pb.settings.testEmail('justinequartz@gmail.com', );
  // console.log(emails)
  return (
    <>
      <Slideshow />
      <main
        id='main-content'
        className='-mt-20'>
        {/* ===== Category Section ===== */}
        <section className='w-full h-auto py-10 border border-b-2 border-gray100'>
          <div className='app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='w-full'>
              <OverlayContainer
                imgSrc='/bg-img/banner_minipage2.jpg'
                imgAlt='Women Collection'>
                <LinkButton
                  href='/product-category/women'
                  extraClass='absolute bottom-10-per z-20'>
                  Women collection
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className='w-full'>
              <OverlayContainer
                imgSrc='/bg-img/banner_minipage3.jpg'
                imgAlt='Men Collection'>
                <LinkButton
                  href='/product-category/men'
                  extraClass='absolute bottom-10-per z-20'>
                  Men colletion
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className='w-full sm:col-span-2 lg:col-span-2'>
              <OverlayContainer
                imgSrc='/bg-img/banner_minipage1.jpg'
                imgSrc2='/bg-img/banner_minipage1-tablet.jpg'
                imgAlt='New Arrivals'>
                <LinkButton
                  href='/product-category/kids'
                  extraClass='absolute bottom-10-per sm:right-10-per z-20'>
                  Kids
                </LinkButton>
              </OverlayContainer>
            </div>
          </div>
        </section>

        {/* ===== Best Selling Section ===== */}
        <section className='app-max-width w-full h-full flex flex-col justify-center mt-16 mb-20'>
          <div className='flex justify-center'>
            <div className='w-3/4 sm:w-1/2 md:w-1/3 text-center mb-8'>
              <h2 className='text-3xl mb-4'>Best selling</h2>
              <span>Best selling desc</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding'>
            {
              bestselling && bestselling.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  collectionId={product.collectionId}
                  name={product.name}
                  featuredimage={imageurl(product.collectionId, product.id, product.featuredimage)}
                  otherimages={imageurl(product.collectionId, product.id, product.otherimages[0])}
                  qty={product.qty}
                />
              ))
            }
          </div>
        </section>

        {/* ===== Testimonial Section ===== */}
        <section className='w-full hidden h-full py-16 md:flex flex-col items-center bg-lightgreen'>
          <h2 className='text-3xl'>Testimonial</h2>
          <TestiSlider />
        </section>

        {/* ===== Featured Products Section ===== */}
        <section className='app-max-width app-x-padding my-16 flex flex-col'>
          <div className='text-center mb-6'>
            <h2 className='text-3xl'>Featured products</h2>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10'>
            {
              featured && featured.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  collectionId={product.collectionId}
                  name={product.name}
                  featuredimage={imageurl(product.collectionId, product.id, product.featuredimage)}
                  otherimages={imageurl(product.collectionId, product.id, product.otherimages[0])}
                  qty={product.qty}
                />
              ))}
          </div>
          <div className='flex justify-center'>
            <Button
              value={'Loadmore'}
            />
          </div>
        </section>

        <div className='border-gray100 border-b-2'></div>

        {/* ===== Our Shop Section */}
        <section className='app-max-width mt-16 mb-20 flex flex-col justify-center items-center text-center'>
          <div className='textBox w-3/4 md:w-2/4 lg:w-2/5 mb-6'>
            <h2 className='text-3xl mb-6'>Our shop</h2>
            <span className='w-full'>Our shop desc</span>
          </div>
          <div className='w-full app-x-padding flex justify-center'>
            <Image
              src={ourShop}
              alt='Our Shop'
            />
          </div>
        </section>
      </main>

      {/* ===== Footer Section ===== */}
    </>
  );
};


export default page;
