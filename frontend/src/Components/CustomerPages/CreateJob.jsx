import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function LocationMarker({ setFieldValue }) {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      setFieldValue('latitude', e.latlng.lat)
      setFieldValue('longitude', e.latlng.lng)
    },
  })

  useEffect(() => {
    map.locate()
  }, [map])

  map.on('locationfound', function(e) {
    setPosition(e.latlng)
    setFieldValue('latitude', e.latlng.lat)
    setFieldValue('longitude', e.latlng.lng)
    map.flyTo(e.latlng, map.getZoom())
  })

  return position === null ? null : (
    <Marker position={position} />
  )
}

export default function CreateJobPage() {
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)

  const jobTypes = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Gardening', 'HVAC']

  const validationSchema = Yup.object({
    job_type: Yup.string().required('Job type is required'),
    description: Yup.string().required('Description is required'),
    start_date: Yup.date().required('Start date is required'),
    end_date: Yup.date().min(Yup.ref('start_date'), "End date can't be before start date"),
    price: Yup.number().positive('Price must be positive'),
    latitude: Yup.number().min(-90).max(90).required('Latitude is required'),
    longitude: Yup.number().min(-180).max(180).required('Longitude is required'),
    image: Yup.mixed()
  })

  const formik = useFormik({
    initialValues: {
      job_type: '',
      description: '',
      start_date: '',
      end_date: '',
      price: '',
      latitude: '',
      longitude: '',
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
      navigate('/jobs')
    },
  })

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0]
    formik.setFieldValue('image', file)
    setPreviewImage(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-emerald-300">Create New Job</h2>

        <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="job_type" className="block text-sm font-medium text-emerald-300 mb-1">Job Type</label>
            <select
              id="job_type"
              name="job_type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job_type}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select a job type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {formik.touched.job_type && formik.errors.job_type ? (
              <div className="text-red-500 mt-1">{formik.errors.job_type}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-emerald-300 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 mt-1">{formik.errors.description}</div>
            ) : null}
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="start_date" className="block text-sm font-medium text-emerald-300 mb-1">Start Date</label>
              <input
                id="start_date"
                name="start_date"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.start_date}
                className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {formik.touched.start_date && formik.errors.start_date ? (
                <div className="text-red-500 mt-1">{formik.errors.start_date}</div>
              ) : null}
            </div>
            <div className="flex-1">
              <label htmlFor="end_date" className="block text-sm font-medium text-emerald-300 mb-1">End Date</label>
              <input
                id="end_date"
                name="end_date"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.end_date}
                className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {formik.touched.end_date && formik.errors.end_date ? (
                <div className="text-red-500 mt-1">{formik.errors.end_date}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-emerald-300 mb-1">Price (Optional)</label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 mt-1">{formik.errors.price}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-1">Location</label>
            <div className="h-64 rounded-md overflow-hidden">
              <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setFieldValue={formik.setFieldValue} />
              </MapContainer>
            </div>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <label htmlFor="latitude" className="block text-sm font-medium text-emerald-300 mb-1">Latitude</label>
                <input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.latitude}
                  className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formik.touched.latitude && formik.errors.latitude ? (
                  <div className="text-red-500 mt-1">{formik.errors.latitude}</div>
                ) : null}
              </div>
              <div className="flex-1">
                <label htmlFor="longitude" className="block text-sm font-medium text-emerald-300 mb-1">Longitude</label>
                <input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.longitude}
                  className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formik.touched.longitude && formik.errors.longitude ? (
                  <div className="text-red-500 mt-1">{formik.errors.longitude}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-emerald-300 mb-1">Job Image (Optional)</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 mt-1">{formik.errors.image}</div>
            ) : null}
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 rounded-md max-h-40 object-cover" />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            Create Job
          </button>
        </form>
      </main>

      <footer className="bg-black bg-opacity-30 text-center py-8 mt-16 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <p className="text-green-100 mb-4">&copy; 2024 Sanayi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}