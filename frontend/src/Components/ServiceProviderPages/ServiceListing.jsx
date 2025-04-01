import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import InnovationHub from "../../images/InnovationHub.jpg"

export default function ServiceListingsPage() {
  const navigate = useNavigate()
  const { category } = useParams()

  const locations = ['All', 'Cairo', 'Alexandria', 'Giza']
  const jobTitles = ['All', 'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Gardener', 'HVAC Technician']

  const listings = [
    // Plumber Variations
    {
      id: '1',
      jobTitle: 'Plumber',
      description: 'Experienced plumber offering a wide range of plumbing services including repairs, installations, and maintenance.',
      price: 200,
      tags: ['plumbing', 'repairs', 'installation'],
      location: 'Cairo',
      image: `${InnovationHub}`
    },
    {
      id: '2',
      jobTitle: 'Plumber',
      description: 'Professional plumber available for emergency leak repairs, bathroom fitting, and pipe installation.',
      price: 250,
      tags: ['plumbing', 'emergency repairs', 'pipe installation'],
      location: 'Alexandria',
      image: `${InnovationHub}`
    },
  
    // Electrician Variations
    {
      id: '3',
      jobTitle: 'Electrician',
      description: 'Licensed electrician providing residential and commercial electrical services. Safety is our top priority.',
      price: 300,
      tags: ['electrical', 'wiring', 'installation'],
      location: 'Alexandria',
      image: `${InnovationHub}`
    },
    {
      id: '4',
      jobTitle: 'Electrician',
      description: 'Certified electrician specializing in electrical panel upgrades, rewiring, and lighting installation.',
      price: 400,
      tags: ['rewiring', 'panel upgrade', 'lighting'],
      location: 'Cairo',
      image: `${InnovationHub}`
    },
  
    // Carpenter Variations
    {
      id: '5',
      jobTitle: 'Carpenter',
      description: 'Transform your living space with our comprehensive home renovation services. From kitchens to bathrooms, we do it all.',
      price: 10000,
      tags: ['renovation', 'construction', 'interior design'],
      location: 'Giza',
      image: `${InnovationHub}`
    },
    {
      id: '6',
      jobTitle: 'Carpenter',
      description: 'Experienced carpenter offering custom furniture design, installation, and home improvement services.',
      price: 5000,
      tags: ['furniture design', 'home improvement', 'installation'],
      location: 'Alexandria',
      image: `${InnovationHub}`
    },
  
    // Painter Variations
    {
      id: '7',
      jobTitle: 'Painter',
      description: 'Experienced painters offering interior and exterior painting for residential and commercial properties.',
      price: 1000,
      tags: ['painting', 'interior', 'exterior'],
      location: 'Cairo',
      image: `${InnovationHub}`
    },
    {
      id: '8',
      jobTitle: 'Painter',
      description: 'Professional painting services for homes and offices. Specializing in decorative and accent wall designs.',
      price: 1200,
      tags: ['decorative painting', 'accent walls', 'office painting'],
      location: 'Giza',
      image: `${InnovationHub}`
    },
  
    // Gardener Variations
    {
      id: '9',
      jobTitle: 'Gardener',
      description: 'Create your dream outdoor space with our expert landscaping and garden design services.',
      price: 5000,
      tags: ['landscaping', 'gardening', 'outdoor'],
      location: 'Alexandria',
      image: `${InnovationHub}`
    },
    {
      id: '10',
      jobTitle: 'Gardener',
      description: 'Expert gardener providing seasonal planting, lawn care, and garden maintenance services.',
      price: 3000,
      tags: ['lawn care', 'seasonal planting', 'maintenance'],
      location: 'Cairo',
      image: `${InnovationHub}`
    },
  
    // HVAC Technician Variations
    {
      id: '11',
      jobTitle: 'HVAC Technician',
      description: 'Keep your home comfortable year-round with our HVAC installation, maintenance, and repair services.',
      price: 1500,
      tags: ['hvac', 'air conditioning', 'heating'],
      location: 'Giza',
      image: `${InnovationHub}`
    },
    {
      id: '12',
      jobTitle: 'HVAC Technician',
      description: 'Professional HVAC technician offering duct cleaning, filter replacement, and annual system inspections.',
      price: 1800,
      tags: ['duct cleaning', 'filter replacement', 'system inspection'],
      location: 'Alexandria',
      image: `${InnovationHub}`
    },
  
    // Web Developer Variations
    {
      id: '13',
      jobTitle: 'Web Developer',
      description: 'Experienced web developer offering professional services for building responsive websites and web applications.',
      price: 3500,
      tags: ['web development', 'frontend', 'backend', 'responsive'],
      location: 'Cairo',
      image: `${InnovationHub}`
    },
    {
      id: '14',
      jobTitle: 'Web Developer',
      description: 'Full-stack web developer with expertise in React, Node.js, and MongoDB for dynamic web applications.',
      price: 4000,
      tags: ['full-stack', 'react', 'node.js', 'mongoDB'],
      location: 'Giza',
      image: `${InnovationHub}`
    },
  
    // Cleaner Variations
    {
      id: '15',
      jobTitle: 'Cleaner',
      description: 'Professional cleaner providing thorough cleaning services for homes, offices, and commercial spaces.',
      price: 300,
      tags: ['cleaning', 'house cleaning', 'commercial cleaning'],
      location: 'Cairo',
      image: `${InnovationHub}`
    },
    {
      id: '16',
      jobTitle: 'Cleaner',
      description: 'Deep cleaning services for apartments, including carpet and upholstery cleaning. Flexible scheduling available.',
      price: 400,
      tags: ['deep cleaning', 'carpet cleaning', 'upholstery'],
      location: 'Alexandria',
      image: `${InnovationHub}`
    },
  
    // Photographer Variations
    {
      id: '17',
      jobTitle: 'Photographer',
      description: 'Skilled photographer specializing in portrait, event, and product photography for personal and business needs.',
      price: 800,
      tags: ['photography', 'portraits', 'events', 'product photography'],
      location: 'Alexandria',
      image: `${InnovationHub}`
    },
    {
      id: '18',
      jobTitle: 'Photographer',
      description: 'Wedding photographer offering full-day coverage, engagement sessions, and post-production editing.',
      price: 5000,
      tags: ['wedding photography', 'engagement', 'editing'],
      location: 'Cairo',
      image: `${InnovationHub}`
    }
  ];
  const [filteredListings, setFilteredListings] = useState(listings)

  const formik = useFormik({
    initialValues: {
      jobTitle: category && jobTitles.includes(category) ? category : 'All',
      location: 'All',
      minPrice: '',
      maxPrice: '',
      tags: []
    },
    onSubmit: (values) => {
      applyFilters(values)
      navigate('/Listing')
    }
  })

  const applyFilters = (values) => {
    const { jobTitle, location, minPrice, maxPrice, tags } = values
    const filtered = listings.filter(listing => {
      const matchesJobTitle = jobTitle === 'All' || listing.jobTitle === jobTitle
      const matchesLocation = location === 'All' || listing.location === location
      const matchesMinPrice = minPrice ? listing.price >= parseInt(minPrice) : true
      const matchesMaxPrice = maxPrice ? listing.price <= parseInt(maxPrice) : true
      const matchesTags = tags.length > 0 ? tags.every(tag => listing.tags.includes(tag)) : true

      return matchesJobTitle && matchesLocation && matchesMinPrice && matchesMaxPrice && matchesTags
    })
    setFilteredListings(filtered)
  }

  useEffect(() => {
    if (category && jobTitles.includes(category)) {
      formik.setFieldValue('jobTitle', category)
    }
    applyFilters(formik.values)
  }, [category])

  useEffect(() => {
    applyFilters(formik.values)
  }, [formik.values])

  const handleTagToggle = (tag) => {
    const newTags = formik.values.tags.includes(tag)
      ? formik.values.tags.filter(t => t !== tag)
      : [...formik.values.tags, tag]

    formik.setFieldValue('tags', newTags)
  }

  const allTags = [...new Set(listings.flatMap(listing => listing.tags))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-emerald-300">
          {category ? category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All Services'}
        </h2>

        <form onSubmit={formik.handleSubmit} className="mb-8 space-y-4">
          <div className="flex space-x-4">
            <select
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {jobTitles.map((title) => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
            <select
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="flex-1 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
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
          <div className="flex justify-center items-center flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm ${formik.values.tags.includes(tag)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            Apply Filters
          </button>
        </form>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-black bg-opacity-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-emerald-800 hover:border-emerald-500">
                <img src={listing.image} alt={listing.jobTitle} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-300">{listing.jobTitle}</h3>
                  <p className="text-green-100 mb-4 line-clamp-3">{listing.description}</p>
                  <div className="flex items-center justify-between text-sm text-green-200 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      ${listing.price}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {listing.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                      <span key={index} className="bg-emerald-800 text-emerald-200 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-green-100 mb-12">No listings found matching your search criteria.</p>
        )}
      </main>

      <footer className="bg-black bg-opacity-30 text-center py-8 mt-16 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <p className="text-green-100 mb-4">&copy; 2024 Sanayi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}