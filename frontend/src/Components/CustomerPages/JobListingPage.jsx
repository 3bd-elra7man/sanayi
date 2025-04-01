import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default function JobListingsPage() {
  const navigate = useNavigate()
  const { category } = useParams()

  const jobTypes = ['All', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Gardening', 'HVAC']

  const jobListings = [
    {
      id: '1',
      job_type: 'Plumbing',
      description: 'Need a plumber to fix a leaky faucet and install a new water heater.',
      start_date: '2024-03-15',
      end_date: '2024-03-16',
      price: 200,
      latitude: 30.0444,
      longitude: 31.2357,
    },
    {
      id: '2',
      job_type: 'Electrical',
      description: 'Rewiring needed for a 3-bedroom apartment. Must be licensed and experienced.',
      start_date: '2024-03-20',
      end_date: '2024-03-25',
      price: 1500,
      latitude: 31.2001,
      longitude: 29.9187,
    },
    {
      id: '3',
      job_type: 'Carpentry',
      description: 'Custom built-in bookshelves needed for home office. Approximately 10 linear feet.',
      start_date: '2024-04-01',
      end_date: '2024-04-05',
      price: 800,
      latitude: 30.0131,
      longitude: 31.2089,
    },
    {
      id: '4',
      job_type: 'Painting',
      description: 'Interior painting for a 2-story house. Walls and ceilings, approximately 2500 sq ft.',
      start_date: '2024-03-28',
      end_date: '2024-04-02',
      price: 1200,
      latitude: 30.0444,
      longitude: 31.2357,
    },
    {
      id: '5',
      job_type: 'Gardening',
      description: 'Landscaping and garden maintenance for a large backyard. Includes planting and irrigation setup.',
      start_date: '2024-04-10',
      end_date: '2024-04-15',
      price: 1000,
      latitude: 31.2001,
      longitude: 29.9187,
    },
    {
      id: '6',
      job_type: 'HVAC',
      description: 'Air conditioning system installation for a small office space. Approximately 1000 sq ft.',
      start_date: '2024-05-01',
      end_date: '2024-05-03',
      price: 2500,
      latitude: 30.0131,
      longitude: 31.2089,
    }
  ]

  const [filteredJobs, setFilteredJobs] = useState(jobListings)

  const formik = useFormik({
    initialValues: {
      job_type: category && jobTypes.includes(category) ? category : 'All',
      minPrice: '',
      maxPrice: '',
      startDate: '',
      endDate: '',
      latitude: '',
      longitude: '',
    },
    onSubmit: (values) => {
      applyFilters(values)
    }
  })

  const applyFilters = (values) => {
    const { job_type, minPrice, maxPrice, startDate, endDate, latitude, longitude } = values
    const filtered = jobListings.filter(job => {
      const matchesJobType = job_type === 'All' || job.job_type === job_type
      const matchesMinPrice = minPrice ? job.price >= parseInt(minPrice) : true
      const matchesMaxPrice = maxPrice ? job.price <= parseInt(maxPrice) : true
      const matchesStartDate = startDate ? new Date(job.start_date) >= new Date(startDate) : true
      const matchesEndDate = endDate ? new Date(job.end_date) <= new Date(endDate) : true
      const matchesLatitude = latitude ? Math.abs(job.latitude - parseFloat(latitude)) < 0.1 : true
      const matchesLongitude = longitude ? Math.abs(job.longitude - parseFloat(longitude)) < 0.1 : true

      return matchesJobType && matchesMinPrice && matchesMaxPrice && matchesStartDate && matchesEndDate && matchesLatitude && matchesLongitude
    })
    setFilteredJobs(filtered)
  }

  useEffect(() => {
    if (category && jobTypes.includes(category)) {
      formik.setFieldValue('job_type', category)
    }
    applyFilters(formik.values)
  }, [category])

  useEffect(() => {
    applyFilters(formik.values)
  }, [formik.values])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-emerald-300">
          {category ? category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All Job Listings'}
        </h2>

        <form onSubmit={formik.handleSubmit} className="mb-8 space-y-4">
          <div className="flex space-x-4">
            <select
              name="job_type"
              value={formik.values.job_type}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={formik.values.minPrice}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={formik.values.maxPrice}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              step="any"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              step="any"
              value={formik.values.longitude}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            Apply Filters
          </button>
        </form>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-black bg-opacity-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-emerald-800 hover:border-emerald-500">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-300">{job.job_type}</h3>
                  <p className="text-green-100 mb-4 line-clamp-3">{job.description}</p>
                  <div className="flex items-center justify-between text-sm text-green-200 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      ${job.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-green-200 mb-4">
                    <span>{job.start_date}</span>
                    <span>{job.end_date}</span>
                  </div>
                  <div className="h-48 rounded-md overflow-hidden mb-4">
                    <MapContainer center={[job.latitude, job.longitude]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[job.latitude, job.longitude]} />
                    </MapContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-green-100 mb-12">No job listings found matching your search criteria.</p>
        )}
      </main>
    </div>
  )
}