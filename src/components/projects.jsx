import React, { useEffect, useState } from 'react'
import { OurModal,DisplayProject } from './containers'
import ReactPaginate from 'react-paginate'
import { Border, TypographyIcon } from './containers/units'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid';

export const Projects = () => {
  const [state, setstate] = useState({pageNumber:0,displayPagination:false})
  const data=useSelector((state)=>state.projects)
  const [dataSelector, setDataSelector] = useState(data)
  useEffect(() => {
    setDataSelector(data)
    data?.map(project=>
      project?.team?.map(teamList=>
        teamList === id &&setstate({displayPagination:true,pageNumber:state.pageNumber})
      ))
  }, [data,dataSelector])
  const dataPerPage=12
  const pagesVisited=dataPerPage*state.pageNumber
  const pageCount = Math.ceil(dataSelector.length/dataPerPage)
  const changePage=({selected})=>setstate({displayPagination:true,pageNumber:selected})
  const user = JSON.parse(localStorage.getItem('profile'))?.result
  const id = user?.googleId ? user?.googleId  :user?._id
  return (
    <>
      <Border>
        <Grid item xs={12} className='flex justify-end my-3 mr-2'>
          <OurModal/>
        </Grid>
          <Grid item xs={12}>
            <Grid container  justifyContent="space-between">
              {data?.slice(pagesVisited,pagesVisited+dataPerPage).map((project)=>
                project?.team?.map(teamList=>
                  teamList === id &&<DisplayProject key={project._id} project={project}  />
                ))}
            </Grid>
            {!state.displayPagination && <TypographyIcon variant='body1' styles='text-red-600 text-center mb-3' icon={faTriangleExclamation} text='you dont have any projects yet'/>}
          </Grid>
        {state.displayPagination&&<ReactPaginate previousLabel={'<'} nextLabel={'>'} pageCount={pageCount} onPageChange={changePage}
          containerClassName={'bg-gray-100 flex mx-auto rounded-full px-4 py-1  justify-center items-center'}
          previousLinkClassName={'text-sec px-1'} nextLinkClassName={'text-sec px-1'}
          activeClassName={'bg-base rounded-full py-1'}
          activeLinkClassName={'bg-opacity-0 mx-0'}
          pageLinkClassName={'bg-sec text-third rounded-full px-2 pb-1 mx-1'}
          breakLabel="..."/>}
      </Border>
    </>
  )
}
