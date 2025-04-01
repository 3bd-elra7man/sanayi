import React from 'react'

function Footer() {
  return (
    <footer className="py-8 mt-16 text-center bg-opacity-30 backdrop-blur-md navbar">
        <div className="container px-4 mx-auto">
          <p className="mb-4 text-green-100">
            &copy; 2023 Sanayi. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="transition duration-300 text-emerald-300 hover:text-emerald-100"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="transition duration-300 text-emerald-300 hover:text-emerald-100"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition duration-300 text-emerald-300 hover:text-emerald-100"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
  )
}

export default Footer