import React from 'react'
import './job.css'
export default function JobDetails() {
  return (
    <div className='job vh-100'>
      <div className="container py-5">
      <h1 className='text-white m-5'>Job Details</h1>
      <div className="row jobForm p-5 d-flex justify-content-between wrapper rounded-4">
      <div className="jobDetails col-lg-7">
      <ul className="list-unstyled text-white">
        <li className='pb-4'><i class="fa-solid fa-diagram-project me-2"></i><span className="fw-bold me-2">Status:</span>Available</li>
        <li className='pb-4'><i class="fa-solid fa-briefcase me-2"></i><span className="fw-bold me-2">Job Type:</span>Plumbing</li>
        <li className='pb-4'><i class="fa-solid fa-location-dot me-2"></i><span className="fw-bold me-2">Location:</span>Los angeles, California</li>
        <li className='pb-4'><i class="fa-solid fa-user me-2"></i><span className="fw-bold me-2">Client:</span>Mohamed Ahmed</li>
        <li className='pb-4'><i class="fa-solid fa-calendar-days me-2"></i><span className="fw-bold me-2">Date Added:</span>25/6/2024</li>
      </ul>
     </div>
     <div className="col-lg-5">
        <h5 className='text-white'><i class="fa-solid fa-audio-description me-2"></i>Job Description:</h5><p className='text-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima atque quisquam aliquam quam inventore assumenda similique eaque non! Facere officiis maxime quia eum nostrum laudantium libero consequuntur, repellat harum delectus culpa autem, similique voluptate fugiat enim magni quas nihil ea. Modi commodi cum deserunt vel debitis culpa ea. Reprehenderit, eum!</p>
    </div>
    <div className="d-flex justify-content-between">
       <div className="w-25 mt-4">
       <h5 className='mb-2 text-white'><i class="fa-solid fa-comments-dollar me-2"></i>Add your Price</h5>
       <input type="number" className="form-control p-2"/>
       </div>
       <div className="w-25">
       <button className="sub-Btn w-100 fw-bold btn bg-white rounded-3 p-3 mt-5">Apply for Job</button>
       </div>
    </div>
      </div>
      </div>
      </div>
  )
}